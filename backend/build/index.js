"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var http = __importStar(require("http"));
var localization_1 = require("./helper/localization/");
var config_1 = __importDefault(require("./setup/config"));
var socket_io_1 = require("socket.io");
var pg_1 = require("pg");
var postgres_adapter_1 = require("@socket.io/postgres-adapter");
var app = express();
var server = http.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.default.server.origin,
        methods: ['GET', 'POST'],
    },
});
var pool = new pg_1.Pool({
    user: 'noghte-bazi',
    host: 'localhost',
    database: 'noghte-bazi',
    password: 'password',
    port: 5432,
});
pool.query("\n  create table if not exists user (\n    id uuid unique primary key\n    first_name text\n    last_name text\n    credit integer,\n  )\n").then(console.log);
pool.query("\n  create table if not exists player (\n    id uuid unique primary key\n    user_id uuid references user (id)\n    role text\n    color text\n    score integer\n    has_permission boolean\n    is_connected boolean\n  )\n").then(console.log);
// pen is an many to many relation between player and game
pool.query("\n  create table if not exists pen (\n    player_id uuid references player (id)\n    game_id uuid references paper (id)\n    primary key (player_id, paper_id)\n  )\n").then(console.log);
pool.query("\n  create table if not exists paper (\n    id uuid unique primary key\n    is_finished boolean\n    size integer\n    winner uuid references player (id)\n    last_line uuid references line (id)\n  )\n").then(console.log);
pool.query("\n  create table if not exists line (\n    id uuid unique primary key\n    i integer\n    j integer\n    paper_id uuid references paper (id)\n    color text\n  )\n").then(console.log);
pool.query("\n    create table if not exists message (\n      id uuid unique primary key\n      paper_id uuid references paper (id)\n      sender uuid references player (id)\n    )\n").then(console.log);
var rooms = [];
var users = [];
var createRoom = function (socketId, paperSize, roomId) {
    var room = {
        id: roomId,
        userIds: [],
        subscriberIds: [],
        history: [],
        turn: 'red',
        isEnded: false,
        socketIds: [socketId],
        lastMove: null,
        messages: [],
        size: paperSize,
        winner: undefined,
    };
    rooms.push(room);
    console.log('-------->', room.userIds);
    return room;
};
var createUser = function (userId, socketId) {
    var user = {
        id: userId,
        score: 0,
        roomIds: [],
        color: '',
        hasPermission: false,
        role: '',
        isConnected: false,
        socketId: socketId,
        name: '',
    };
    users.push(user);
    return user;
};
var findRoomById = function (roomId) {
    return rooms.find(function (room) { return room.id === roomId; });
};
var findUserById = function (userId, roomId) {
    return users.find(function (user) {
        return !!(user.id === userId && user.roomIds.includes(roomId));
    });
};
var findUserBySocketId = function (socketId) {
    return users.find(function (user) { return user.socketId === socketId; });
};
var findRoomBySocketId = function (socketId) {
    return rooms.find(function (room) { return room.socketIds.includes(socketId); });
};
var configUser = function (_a) {
    var user = _a.user, room = _a.room, color = _a.color, hasPermission = _a.hasPermission, role = _a.role, isConnected = _a.isConnected, socketId = _a.socketId;
    user.roomIds.push(room.id);
    user.color = color;
    user.hasPermission = hasPermission;
    user.role = role;
    user.isConnected = isConnected;
    user.socketId = socketId;
};
var hostFirstUser = function (room, user, socket) {
    console.log("hosting first user with userId: " + user.id + " in room with roomId: " + room.id);
    configUser({
        user: user,
        room: room,
        color: 'red',
        hasPermission: true,
        role: 'player',
        isConnected: true,
        socketId: socket.id,
    });
    room.turn = 'red';
    room.userIds.push(user.id);
    room.socketIds.push(socket.id);
    socket.emit('hasPermission', user.hasPermission);
    socket.emit('watch', room.history, room.messages);
    socket.join(room.id);
    socket.emit('color', 'red');
    socket.emit('score', user.score);
    socket.emit('mustWait', true);
};
var hostSecondUser = function (room, user, socket) {
    console.log("hosting second user with userId: " + user.id + " in room with roomId: " + room.id);
    if (room.isEnded) {
        var opponentId = room.userIds[0] === user.id ? room.userIds[1] : room.userIds[0];
        var opponent = findUserById(opponentId, room.id);
        socket.emit('color', user.color);
        socket.emit('hasPermission', false);
        socket.emit('watch', room.history, room.messages);
        socket.emit('score', user.score);
        io.to(room.id).emit('mustWait', false);
        socket.emit('name', opponent.id, opponent.score, opponent.color);
    }
    else {
        configUser({
            user: user,
            room: room,
            color: undefined,
            hasPermission: false,
            role: 'player',
            isConnected: true,
            socketId: socket.id,
        });
        var secondUser = findUserById(room.userIds[0] === user.id ? room.userIds[1] : room.userIds[0], room.id);
        console.log('roomTurn: ', room.turn);
        if (secondUser && secondUser.color === 'red')
            user.color = 'blue';
        else
            user.color = 'red';
        user.hasPermission = room.turn === user.color;
        console.log('user has permission? ', user.hasPermission);
        if (!room.userIds.includes(user.id))
            room.userIds.push(user.id);
        if (!room.socketIds.includes(socket.id))
            room.socketIds.push(socket.id);
        socket.emit('color', user.color);
        socket.emit('hasPermission', user.hasPermission);
        socket.emit('watch', room.history, room.messages);
        socket.emit('score', user.score);
        socket.join(room.id);
        io.to(room.id).emit('mustWait', false);
        io.to(room.id).emit('introduce', 'hello');
    }
};
var hostSubscriber = function (room, user, socket) {
    console.log("hosting subscriber with userId: " + user.id + " in room with roomId: " + room.id);
    configUser({
        user: user,
        room: room,
        color: undefined,
        hasPermission: false,
        role: 'subscriber',
        isConnected: true,
        socketId: socket.id,
    });
    room.subscriberIds.push(user.id);
    socket.join(room.id);
    socket.emit('role', 'subscriber', room.turn);
    socket.emit('watch', room.history, room.messages);
};
var directUserToRoom = function (roomId, userId, socket, paperSize) {
    var room = findRoomById(roomId) || createRoom(socket.id, paperSize, roomId);
    var user = findUserById(userId, roomId) || createUser(userId, socket.id);
    if ((room.userIds.includes(user.id) && user.isConnected === true) ||
        !userId ||
        !roomId) {
        socket.emit('warning', 'multiple device');
        socket.disconnect(true);
    }
    else {
        switch (room.userIds.length) {
            case 0:
                hostFirstUser(room, user, socket);
                break;
            case 1:
                hostSecondUser(room, user, socket);
                break;
            default:
                if (!!findUserById(userId, roomId))
                    hostSecondUser(room, user, socket);
                else
                    hostSubscriber(room, user, socket);
                break;
        }
    }
};
var checkValidation = function (room, user, type) {
    var result = user && room && user.isConnected && !room.isEnded && user.role === 'player';
    if (type === 'change') {
        console.log("check validation user id: " + user.id + " hasPermission is: " + user.hasPermission);
        return user.hasPermission && room.turn === user.color && result;
    }
    else {
        console.log("check validation user id: " + user.id, !user.hasPermission, room.turn !== user.color, result);
        return !user.hasPermission && room.turn !== user.color && result;
    }
};
var changeTurn = function (room, userId) {
    if (room && room.turn === 'red')
        room.turn = 'blue';
    else if (room && room.turn === 'blue')
        room.turn = 'red';
    for (var i = 0; i < room.userIds.length; i++) {
        var user = findUserById(room.userIds[i], room.id);
        user.hasPermission = user.id !== userId;
    }
    return true;
};
var check = function (room, user, type) {
    if (checkValidation(room, user, type))
        return changeTurn(room, user.id);
    return false;
};
io.on('isConnected', function (socket) {
    socket.emit('handshake', 'welcome! give me your room id!');
    socket.on('handshake', function (_a) {
        var roomId = _a.roomId, userId = _a.userId, paperSize = _a.paperSize;
        return directUserToRoom(roomId, userId, socket, paperSize);
    });
    socket.on('introduce', function (userId, roomId) {
        var user = findUserById(userId, roomId);
        socket.broadcast.to(roomId).emit('name', userId, user.score, user.color);
        socket.emit('message', {
            sender: 'noghte-bazi',
            content: localization_1.message.default.welcome,
        });
    });
    socket.on('disconnect', function () {
        var user = findUserBySocketId(socket.id);
        var room = findRoomBySocketId(socket.id);
        console.log("user with " + (user ? 'user' : 'socket') + "id " + (user ? user.id : socket.id) + " disconnected");
        if (user)
            user.isConnected = false;
        if (user && user.role === 'player')
            socket.broadcast.to(room.id).emit('mustWait', true);
    });
    socket.on('change', function (userId, roomId, line) {
        var room = findRoomById(roomId);
        var user = findUserById(userId, roomId);
        console.log('new line arrived: ', line);
        if (check(room, user, 'change')) {
            var i = line.i, j = line.j, color = line.color;
            line.color = user.color;
            room.lastMove = line;
            room.history[i] = __assign({}, room.history[i]);
            room.history[i][j] = color;
            socket.broadcast.to(room.id).emit('change', line, color);
        }
        else
            socket.emit('warning', 'warning');
    });
    socket.on('bonus', function (roomId, userId, bonus) {
        var room = findRoomById(roomId);
        var user = findUserById(userId, roomId);
        if (user && user.color === bonus.color) {
            var i = bonus.i, j = bonus.j, color = bonus.color;
            if (room.history[i] && room.history[i][j]) {
            }
            else {
                console.log("new bonus arrived:", bonus, "from user:", user.id);
                room.history[i] = __assign({}, room.history[i]);
                room.history[i][j] = color;
                user.score += 1;
                // sending gift!
                if (room)
                    room.turn = user.color;
                var sumOfScores = 0;
                for (var i_1 = 0; i_1 < room.userIds.length; i_1++) {
                    var user_1 = findUserById(room.userIds[i_1], room.id);
                    sumOfScores += user_1.score;
                    user_1.hasPermission = user_1.id === userId;
                }
                io.to(roomId).emit('gift', userId);
                console.log(sumOfScores, room.size);
                if (sumOfScores === (room.size - 1) * (room.size - 1)) {
                    room.isEnded = true;
                    console.log(user.score);
                    for (var i_2 = 0; i_2 < room.userIds.length; i_2++) {
                        var user_2 = findUserById(room.userIds[i_2], room.id);
                        console.log(sumOfScores, user_2.score);
                        if (user_2.score > sumOfScores - user_2.score)
                            user_2.id === userId
                                ? socket.emit('message', {
                                    sender: 'noghte-bazi',
                                    content: localization_1.message.default.end.winner,
                                })
                                : socket.broadcast.to(roomId).emit('message', {
                                    sender: 'noghte-bazi',
                                    content: localization_1.message.default.end.winner,
                                });
                        else
                            user_2.id === userId
                                ? socket.emit('message', {
                                    sender: 'noghte-bazi',
                                    content: localization_1.message.default.end.loser,
                                })
                                : socket.broadcast.to(roomId).emit('message', {
                                    sender: 'noghte-bazi',
                                    content: localization_1.message.default.end.loser,
                                });
                    }
                }
            }
        }
    });
    socket.on('gift', function (userId, roomId) {
        var room = findRoomById(roomId);
        var user = findUserById(userId, roomId);
        console.log('new gift request arrived by user id:', userId);
        if (check(room, user, 'gift'))
            io.to(room.id).emit('gift');
        else
            socket.emit('warning', 'warning');
    });
    socket.on('resign', function (userId, roomId) {
        var room = findRoomById(roomId);
        var user = findUserById(userId, roomId);
        room.isEnded = true;
        user.isConnected = false;
        socket.broadcast.to(room.id).emit('resign', 'salam');
    });
    socket.on('getname', function (roomId) {
        var room = findRoomById(roomId);
        var redName, blueName;
        for (var i = 0; i < room.userIds.length; i++) {
            var user = findUserById(room.userIds[i], roomId);
            if (user.color === 'red')
                redName = user.name;
            else
                blueName = user.name;
        }
        socket.emit('getname', redName, blueName);
    });
    socket.on('message', function (roomId, userId, message) {
        var room = findRoomById(roomId);
        room.messages.push({ sender: userId, content: message });
        socket.broadcast
            .to(room.id)
            .emit('message', { sender: userId, content: message });
    });
});
io.adapter(postgres_adapter_1.createAdapter(pool));
server.listen(config_1.default.server.port, function () {
    return console.log("server is listening on port " + config_1.default.server.port);
});
