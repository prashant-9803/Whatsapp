const express = require("express");
const dotenv = require("dotenv");
const app = express();
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/AuthRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const { Server } = require("socket.io");

dotenv.config();
dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", {
                from: data.from,
                message: data.message
            });
        }
    })
})


