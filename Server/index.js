const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("hello", "can you hear me?");
  socket.on("hello", (msg) => {
    console.log(msg);
  });
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("change", (change) => {
    socket.broadcast.emit("change", change)
    console.log(change)
  })
});


http.listen(3000, () => {
  console.log("listening on *:3000");
});
