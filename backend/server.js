import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import usersRoute from "./routes/user.routes.js"
import {app,server} from "./socket/socket.js"

import cookieParser from "cookie-parser";
import connectToMonogdb from "./db/connectToMonogdb.js";

dotenv.config();

// const app = express();
const PORT =  3000

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) =>{
    res.send("hello world!");
})

app.use("/api/auth", authRoutes)
app.use("/api/message",messageRoute)
app.use("/api/users",usersRoute)

server.listen(PORT, () => {
    connectToMonogdb();
    console.log(`server listening at port ${PORT}`)
});