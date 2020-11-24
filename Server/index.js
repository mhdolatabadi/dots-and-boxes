const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// const config = require("./src/setup/config");
let rooms = [];
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

const getRoom = (roomId) => {
  const room = createRoom(roomId);
  rooms.push(room);
  return room;
};

const findRoom = (roomId) => {
  for (let i = 0; i < rooms.length; i++)
    if (rooms[i].id === roomId) return rooms[i];
  return false;
};

const findUser = (room, userId) => {
  for (let i = 0; i < room.users.length; i++)
    if (room.users[i].id === userId) return room.users[i];
  return false;
};

const configUser = (user, room, color, isTurn, role, connection) => {
  user.room = room;
  user.color = color;
  user.isTurn = isTurn;
  user.role = role;
  user.connection = connection;
};

const hostFirstUser = (room, user, socket) => {
  console.log("host first user");
  configUser(user, room, "red", true, "player", true);
  room.turn = "red";
  room.users.push(user);
  socket.emit("color", "red");
  socket.emit("wait", "wait");
  socket.join(room.id);
};

const hostSecondUser = (room, user, socket) => {
  console.log("host second user");
  configUser(user, room, undefined, undefined, "player", true);
  const secondUser =
    room.users[0].id === user.id ? room.users[1] : room.users[0];
  if (secondUser.color === "red") user.color = "blue";
  else user.color = "red";
  if (room.turn !== user.color) user.isTurn = false;
  else user.isTurn = true;
  room.users.push(user);
  socket.emit("color", user.color);
  socket.emit("permission", user.isTurn);
  socket.emit("watch", room.history);
  socket.join(room.id);
  socket.broadcast.to(room.id).emit("wait", "play");
  io.to(room.id).emit("introduce", "hello");
};

const hostSubscriber = (room, user, socket) => {
  console.log("host subscriber");
  configUser(user, room, undefined, undefined, "subscriber", true);
  room.subscribers.push(user);
  socket.join(room.id);
  socket.emit("role", "subscriber", room.turn);
  socket.emit("watch", room.history);
};

const directToRoom = (roomId, userId, socket) => {
  const room = findRoom(roomId) || getRoom(roomId);
  const user = findUser(room, userId) || createUser(userId);
  switch (room.users.length) {
    case 0:
      hostFirstUser(room, user, socket);
      break;
    case 1:
      hostSecondUser(room, user, socket);
      break;
    default:
      if (findUser(room, userId)) hostSecondUser(room, user, socket);
      else hostSubscriber(room, user, socket);
      break;
  }
};

const checkValidation = (room, user, type) => {
  if (type === "change") {
    console.log(
      user.isTurn,
      room.turn === user.color,
      user.connection,
      !room.end,
      user.role === "player"
    );
    return (
      user.isTurn &&
      room.turn === user.color &&
      user.connection &&
      !room.end &&
      user.role === "player"
    );
  } else
    return (
      !user.isTurn &&
      room.turn !== user.color &&
      user.connection &&
      !room.end &&
      user.role === "player"
    );
};

const changeTurn = (room, user) => {
  if (room.turn === "red") room.turn = "blue";
  else if (room.turn === "blue") room.turn = "red";
  console.log("changeTurn", room.turn);
};
const check = (room, user, type) => {
  if (checkValidation(room, user, type)) {
    changeTurn(room, user);
    for (let i = 0; i < room.users.length; i++)
      room.users[i].isTurn = !room.users[i].isTurn;
    return true;
  }
  return false;
};

io.on("connection", (socket) => {
  socket.emit("handshake", "welcome! give me your room id!");
  socket.on("handshake", (roomId, userId) => {
    directToRoom(roomId, userId, socket);
  });
  socket.on("introduce", (userId, roomId, name) => {
    const room = findRoom(roomId);
    const user = findUser(room, userId);
    user.name = name;
    socket.broadcast.to(room.id).emit("name", name);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect");
    socket.broadcast.to(room.id).emit("wait", "wait");
  });
  socket.on("change", (userId, roomId, change) => {
    const room = findRoom(roomId);
    const user = findUser(room, userId);
    console.log(checkValidation(room, user, "change"));
    if (check(room, user, "change")) {
      change.color = user.color;
      room.history.push(change);
      socket.broadcast.to(room.id).emit("change", change, user.color);
    } else socket.emit("warning", "warning");
  });
  socket.on("gift", (userId, roomId) => {
    const room = findRoom(roomId);
    const user = findUser(room, userId);
    console.log(checkValidation(room, user, "gift"));
    if (check(room, user, "gift")) io.to(room.id).emit("gift");
    else socket.emit("warning", "warning");
  });

  socket.on("resign", (userId, roomId) => {
    const room = findRoom(roomId);
    const user = findRoom(room, userId);
    room.end = true;
    user.connection = false;
    socket.broadcast.to(room.id).emit("resign", "salam");
  });

  socket.on("getname", (roomId) => {
    console.log("on get name");
    const room = findRoom(roomId);
    let redName, blueName;
    for (let i = 0; i < room.users.length; i++) {
      const element = room.users[i];
      if (element.color === "red") redName = element.name;
      else blueName = element.name;
    }
    socket.emit("getname", redName, blueName);
  });
});

http.listen(/*config.port*/ 3000, () => {});
