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
  end: false,
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
  for (let i = 0; i < rooms.length; i++)
    if (rooms[i].id === roomId) return rooms[i];
  return false;
};

const getRoom = (roomId) => {
  const foundRoom = findRoom(roomId);
  if (foundRoom !== false) return foundRoom;
  else {
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
  user.room = room;
  user.color = "red";
  user.isTurn = true;
  user.role = "player";
  user.connection = true;
  room.turn = "red";
  room.users.push(user);
  socket.emit("color", "red");
  socket.emit("wait", "wait");
  socket.join(room.id);
};

const hostSecondUser = (room, user, socket) => {
  if (findUser(user.id, room) === false || findUser(user.id, room).connection === false) {
    if (room.users[0].color === "red") {
      user.color = "blue";
      socket.emit("color", "blue");
    } else {
      user.color = "red";
      socket.emit("color", "red");
    }
    if (room.turn !== user.color) user.isTurn = false;
    else user.isTurn = true;
    user.room = room;
    user.role = "player";
    user.connection = true;
    user.socket = socket;
    room.users.push(user);
    socket.join(room.id);
    socket.broadcast.to(room.id).emit("wait", "play");
    io.to(room.id).emit("introduce", "hello");
  }
};

const hostSubscriber = (room, user, socket) => {
  user.role = "subscriber";
  user.room = room;
  user.socket = socket;
  room.subscribers.push(user);
  socket.emit("role", "subscriber");
  socket.join(room.id);
  socket.emit("watch", room.history);
  console.log(room.history)
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
      if (findUser(userId, room) !== false) hostSecondUser(room, user, socket);
      else hostSubscriber(room, user, socket);
      break;
  }
};

const getUserBySocket = (socket) => {
  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].users.length; j++)
      if (rooms[i].users[j].socket === socket) return rooms[i].users[j];
    for (let j = 0; j < rooms[i].subscribers.length; j++)
      if (rooms[i].subscribers[j].socket === socket)
        return rooms[i].subscribers[j];
  }
};

const getRoomBySocket = (socket) => {
  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].users.length; j++)
      if (rooms[i].users[j].socket === socket) return rooms[i];
    for (let j = 0; j < rooms[i].subscribers.length; j++)
      if (rooms[i].subscribers[j].socket === socket) return rooms[i];
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
    const user = getUserBySocket(socket);
    const room = getRoomBySocket(socket);
    if (findUser(user.id, room) !== false) user.connection = false;
    if (user.role !== "subscriber" && !room.end)
      socket.broadcast.to(room.id).emit("wait", "wait");
  });
  socket.on("change", (change, color) => {
    const user = getUserBySocket(socket);
    const room = getRoomBySocket(socket);
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
    const room = getRoomBySocket(socket);
    const user = getUserBySocket(socket);
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
    const room = getRoomBySocket(socket);
    room.end = true;
    socket.broadcast.to(room.id).emit("resign", "salam");
  });

  socket.on("end", () => {
    const room = getRoomBySocket(socket);
    room.end = true;
  });
});

http.listen(3000, () => {});
