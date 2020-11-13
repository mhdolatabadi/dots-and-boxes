const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// const config = require("./src/setup/config")
let rooms = [];
let users = [];
let changeLog = [];

const checkUser = (userId, roomId) => {
  for (let i = 0; i < users[roomId].length; i++) {
    if (users[roomId][i] === userId) {
      return true;
    }
  }
  return false;
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("handshake", "welcome! give me your room id!");
  socket.on("handshake", (roomId, userId) => {
    users[roomId] = [];
    switch (rooms[roomId]) {
      case 1:
        rooms[roomId] = 2;
        users[roomId].push(userId);
        socket.emit("turn", "blue");
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("wait", "play");
        socket.room = roomId;
        break;
      case 2:
        console.log(checkUser(userId, roomId));
        if (checkUser(userId, roomId)) {
          socket.join(roomId);
          socket.broadcast.to(roomId).emit("wait", "play");
          socket.emit("watch", changeLog[roomId]);
          socket.on("wait", (turn) => {
            socket.emit("turn", turn);
          });
          socket.room = roomId;
        } else {
          socket.emit("role", "subscriber");
          socket.join(roomId);
          socket.emit("watch", changeLog[roomId]);
          socket.role = "subscriber";
        }
        break;
      default:
        changeLog[roomId] = [];
        rooms[roomId] = 1;
        users[roomId].push(userId);
        socket.emit("turn", "red");
        socket.emit("wait", "wait");
        socket.join(roomId);
        socket.color = "red";
        socket.room = roomId;
        break;
    }
    console.log(rooms[socket.room]);
    if (rooms[socket.room] === 2) {
      io.to(socket.room).emit("greeting", "salam");
    }
  });

  socket.on("greeting", (name) => {
    socket.to(socket.room).emit("name", name);
  });

  socket.on("disconnect", () => {
    if (socket.role !== "subscriber") {
      socket.broadcast.to(socket.room).emit("wait", "wait");
      rooms[socket.room]--;
      if (rooms[socket.room] === 0) {
        changeLog[socket.room] = [];
        users[socket.room] = [];
      }
    }
  });
  socket.on("change", (change, color) => {
    changeLog[socket.room].push(change);
    socket.broadcast.to(socket.room).emit("change", change, color);
  });
  socket.on("gift", (gift) => {
    socket.broadcast.to(socket.room).emit("gift", gift);
  });
  socket.on("resign", () => {
    socket.broadcast.to(socket.room).emit("resign", "salam");
  });
});

http.listen(/*config.port*/3000, () => {});
