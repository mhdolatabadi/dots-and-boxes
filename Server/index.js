const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const config = require("./src/setup/config")
let rooms = [];
let users = [];
const createRoom = (roomId) => ({
  id: roomId,
  users: [],
  subscribers: [],
  history: [],
  turn: "red",
  end: false,
});

const createUser = (userId) => ({
  id: userId,
  name: "",
  score: "",
  room: "",
  color: "",
  isTurn: false,
  role: "",
  connection: false,
});

const find = (id, array) => {
  for (let i = 0; i < array.length; i++)
    if (array[i].id === id) return array[i];
  return false;
};

const getElement = (id, array, creator) => {
  const found = find(id, array);
  if (found) return found;
  else {
    const element = creator(id);
    array.push(element);
    return element;
  }
};

const get = (id, type) => {
  if (type === "room") return getElement(id, rooms, createRoom);
  else if (type === "user") return getElement(id, users, createUser);
};

const configUser = (user, room, color, isTurn, role, connection) => {
  user.room = room;
  user.color = color;
  user.isTurn = isTurn;
  user.role = role;
  user.connection = connection;
};

const changeTurn = (room, color) => {
  if (color === "red") room.turn = "blue";
  else if (color === "blue") room.turn = "red";
};

const hostFirstUser = (room, user, socket) => {
  configUser(user, room, "red", true, "player", "true");
  room.turn = "red";
  room.users.push(user);
  socket.emit("color", "red");
  socket.emit("wait", "wait");
  socket.join(room.id);
};

const hostSecondUser = (room, user, socket) => {
  configUser(user, room, undefined, undefined, "player", true);
  const secondUser = (room.users[0].id === user.id ? room.users[1] : room.users[0])
  if (secondUser.color === "red") user.color = "blue";
  else user.color = "red";
  if (room.turn !== user.color) user.isTurn = false;
  else user.isTurn = true;
  room.users.push(user)
  socket.emit("color", user.color);
  socket.emit('permission', user.isTurn)
  socket.emit("watch", room.history);
  socket.join(room.id);
  socket.broadcast.to(room.id).emit("wait", "play");
  io.to(room.id).emit("introduce", "hello");
};

const hostSubscriber = (room, user, socket) => {
  configUser(user, room, undefined, undefined, "subscriber", true);
  room.subscribers.push(user);
  socket.join(room.id);
  socket.emit("role", "subscriber");
  socket.emit("watch", room.history);
};

const directToRoom = (roomId, userId, socket) => {
  const room = get(roomId, "room");
  const user = get(userId, "user");
  switch (room.users.length) {
    case 0:
      hostFirstUser(room, user, socket);
      break;
    case 1:
      console.log("here")
      hostSecondUser(room, user, socket);
      break;
    default:
      if (find(userId, room.users) !== false)
        hostSecondUser(room, user, socket);
      else hostSubscriber(room, user, socket);
      break;
  }
};

io.on("connection", (socket) => {
  socket.emit("handshake", "welcome! give me your room id!");
  socket.on("handshake", (roomId, userId) => {
    console.log(userId);
    directToRoom(roomId, userId, socket);
  });
  console.log("a user connected");

  socket.on("introduce", (userId, roomId, name) => {
    const user = get(userId, "user");
    const room = get(roomId, "room");
    user.name = name;
    socket.broadcast.to(room.id).emit("name", name);
  });

  socket.on("disconnect", (userId, roomId) => {
    const user = get(userId, "user");
    const room = get(roomId, "room");
    if (user.role !== "subscriber" && !room.end)
      socket.broadcast.to(room.id).emit("wait", "wait");
  });

  const check = (room, user) => {
    if (user.isTurn && room.turn === user.color) {
      changeTurn(room, user.color);
      for (let i = 0; i < room.users.length; i++)
        room.users[i].isTurn = !room.users[i].isTurn;
    }
  };
  socket.on("change", (userId, roomId, change, color) => {
    const user = get(userId, "user");
    const room = get(roomId, "room");
    change.color = user.color;
    check(room, user);
    room.history.push(change);
    socket.broadcast.to(room.id).emit("change", change, user.color);
  });

  socket.on("gift", (userId, roomId) => {
    const user = get(userId, "user");
    const room = get(roomId, "room");
    check(room, user);
    io.to(room.id).emit("gift");
  });

  socket.on("resign", (userId, roomId) => {
    const room = get(roomId, "room");
    room.end = true;
    socket.broadcast.to(room.id).emit("resign", "salam");
  });

  socket.on("end", (userId, roomId) => {
    const room = get(roomId, "room");
    room.end = true;
  });

  socket.on("getname", (roomId) => {
    const room = get(roomId, "room");
    let redName;
    let blueName;
    for (let i = 0; i < room.users.length; i++) {
      const element = room.users[i];
      if (element.color === "red") redName = element.name;
      else blueName = element.name;
    }
    socket.emit("getname", redName, blueName);
  });
});

http.listen(config.port, () => {});
