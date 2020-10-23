const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let connectionCount = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  connectionCount++;
  if (connectionCount == 1) socket.emit("hello", "red");
  else if (connectionCount == 2) socket.emit("hello", "blue");
  socket.on("hello", (msg) => {
    console.log(msg);
  });
  console.log("a user connected");
  socket.on("disconnect", () => {
    connectionCount--;
    console.log("user disconnected");
  });
  socket.on("change", (change) => {
    socket.broadcast.emit("change", change);
    console.log(change);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
