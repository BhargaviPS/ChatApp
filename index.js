const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (data) => {
    socket.username = data.username;
    io.emit("system", `${data.username} joined the chat`);
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", {
      username: socket.username,
      message: data.message
    });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("system", `${socket.username} left the chat`);
    }
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Chat backend is running!");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
