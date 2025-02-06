const express = require("express");
const dotenv = require("dotenv");
const app = express();
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/AuthRoutes"); 
const messageRoutes = require("./routes/MessageRoutes");

dotenv.config();
dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req,res) => {
    res.send("Hello World");
});

global.onlineUsers = new Map();

