const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let rooms = [];
const roomCreator = (roomId) => ({
  id: roomId,
  users: [],
  subscribers: [],
  history: [],
  turn: "red",
});

const userCreator = (userId, userSocket) => ({
  id: userId,
  name: "",
  score: "",
  room: "",
  color: "",
  isTurn: false,
  role: "",
  socket: userSocket,
  connection: false,
});

const findRoom = (roomId) => {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id === roomId) return rooms[i];
  }
  return false;
};

const getRoom = (roomId) => {
  const foundRoom = findRoom(roomId);
  if (foundRoom !== false) {
    return foundRoom;
  } else {
    const room = roomCreator(roomId);
    rooms.push(room);
    return room;
  }
};

const findUser = (userId, room) => {
  for (let i = 0; i < rooms.length; i++)
    for (let j = 0; j < rooms[i].users.length; j++)
      if (
        rooms[i].users[j].id === userId &&
        rooms[i].users[j].room.id === room.id
      )
        return rooms[i].users[j];
  return false;
};

const hostFirstUser = (room, user, socket) => {
  room.users.push(user);
  socket.join(room.id);
  user.room = room;
  socket.emit("color", "red");
  user.color = "red";
  user.isTurn = true;
  room.turn = "red";
  socket.emit("wait", "wait");
  user.role = "player";
  user.connection = true;
};

const hostSecondUser = (room, user, socket) => {
  if (room.users[0].color === "red") {
    user.color = "blue";
    socket.emit("color", "blue");
  } else {
    user.color = "red";
    socket.emit("color", "red");
  }
  user.room = room;
  user.role = "player";
  room.users.push(user);
  socket.join(room.id);
  io.to(room.id).emit("introduce", "hello");
  socket.broadcast.to(room.id).emit("wait", "play");
  user.connection = true;
};

const hostSubscriber = (room, user, socket) => {
  user.role = "subscriber";
  socket.emit("role", "subscriber");
  user.room = room;
  room.subscribers.push(user);
  socket.join(room.id);
  socket.emit("watch", room.history);
};

const directToRoom = (roomId, userId, socket) => {
  const room = getRoom(roomId);
  const user = userCreator(userId, socket);
  switch (room.users.length) {
    case 0:
      hostFirstUser(room, user, socket);
      break;
    case 1:
      hostSecondUser(room, user, socket);
      break;
    default:
      if (!findUser(userId, room)) hostSecondUser(room, user, socket);
      else hostSubscriber(room, user, socket);
      break;
  }
};

const getUserBySocket = (socket) => {
  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].users.length; j++)
      if (rooms[i].users[j].socket == socket) return rooms[i].users[j];
    for (let j = 0; j < rooms[i].subscribers.length; j++)
      if (rooms[i].subscribers[j].socket == socket)
        return rooms[i].subscribers[j];
  }
};

const getRoomBySocket = (socket) => {
  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].users.length; j++)
      if (rooms[i].users[j].socket == socket) return rooms[i];
    for (let j = 0; j < rooms[i].subscribers.length; j++)
      if (rooms[i].subscribers[j].socket == socket) return rooms[i];
  }
};

io.on("connection", (socket) => {
  socket.emit("handshake", "welcome! give me your room id!");
  socket.on("handshake", (roomId, userId) => {
    directToRoom(roomId, userId, socket);
  });

  socket.on("introduce", (name) => {
    console.log(name);
    const user = getUserBySocket(socket);
    const room = getRoomBySocket(socket);
    user.name = name;
    socket.broadcast.to(room.id).emit("name", name);
  });

  socket.on("disconnect", () => {
    user = getUserBySocket(socket);
    room = getRoomBySocket(socket);
    user.connection = false;
    room.users.pop(user);
    for (let i = 0; i < room.users.length; i++) {
      let decision = 0;
      if (!room.users[i].connection) decision++;
      if (decision === room.users.length) room = "";
    }
    if (user.role !== "subscriber") {
      socket.broadcast.to(room.id).emit("wait", "wait");
    }
  });
  socket.on("change", (change, color) => {
    user = getUserBySocket(socket);
    room = getRoomBySocket(socket);
    console.log(change);
    if (user.isTurn) {
      if (user.color === "red") room.turn = "blue";
      else room.turn = "red";
      for (let i = 0; i < room.users.length; i++) {
        room.users[i].isTurn = !room.users[i].isTurn;
      }
      change.color = color;
      room.history.push(change);
      socket.broadcast.to(room.id).emit("change", change, color);
    }
  });

  socket.on("gift", (gift) => {
    console.log("gift request has recieved");
    room = getRoomBySocket(socket);
    user = getUserBySocket(socket);
    if (!user.isTurn) {
      if (user.color === "red") room.turn = "blue";
      else room.turn = "red";
      for (let i = 0; i < room.users.length; i++) {
        room.users[i].isTurn = !room.users[i].isTurn;
      }
      io.to(room.id).emit("gift", gift);
    }
  });

  socket.on("resign", () => {
    room = getRoomBySocket(socket);
    socket.broadcast.to(room.id).emit("resign", "salam");
  });
});

http.listen(3000, () => {});
