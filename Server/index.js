const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const config = require("./src/setup/config")
let temp = "";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  if (temp === "") {
    temp = socket.id;
    socket.room = temp;
    socket.join(temp);
    socket.emit("hello", "red");
  } else {
    socket.join(temp);
    socket.room = temp;
    socket.emit("hello", "blue");
    temp = "";
  }
  socket.on("hello", (msg) => {
    console.log(msg);
  });
  console.log("a user connected");
  socket.on("disconnect", () => {
    socket.broadcast.to(socket.room).emit("resign", "salam");
    console.log("disconnected");
  });
  socket.on("change", (change) => {
    socket.broadcast.to(socket.room).emit("change", change);
    console.log(change);
  });
  socket.on("gift", (gift) => {
    socket.broadcast.to(socket.room).emit("gift", gift);
  });
  socket.on("resign", () => {
    socket.broadcast.to(socket.room).emit("resign", "salam");
  });
});

http.listen(config.port, () => {
  console.log("listening on *:3000");
});
