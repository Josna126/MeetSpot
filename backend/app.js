import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";

import cors from "cors";
import userRoutes from "./routes/users.routes.js"
import meetingRoutes from "./routes/meetings.routes.js"
import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/meetings", meetingRoutes);

app.get("/home", (req, res) => {
    return res.json({"hello" : "World"})
});

const start = async() => {
    // Use environment variable for MongoDB connection
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://fernandesjosna126:E20CR1gveS3TgLgO@cluster0.vvcigzg.mongodb.net/";
    
    const connectionDb = await mongoose.connect(MONGODB_URI);
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
    
    server.listen(app.get("port"), () => {
        console.log(`LISTENING ON PORT ${app.get("port")}`);
    });
}


start()
