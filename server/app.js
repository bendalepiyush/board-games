import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { updateUserState } from "./services/user.js";

const port = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let connectionQueue = [];

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;
  const isUserExistIndex = connectionQueue.findIndex(
    (item) => item["userId"] === userId
  );

  if (userId) {
    if (isUserExistIndex !== -1)
      connectionQueue[isUserExistIndex] = {
        userId,
        status: "ONLINE",
      };
    else
      connectionQueue.push({
        userId,
        status: "ONLINE",
      });
  }

  socket.on("disconnect", () => {
    if (userId) {
      if (isUserExistIndex !== -1)
        connectionQueue[isUserExistIndex] = {
          userId,
          status: "OFFLINE",
        };
      else
        connectionQueue.push({
          userId,
          status: "OFFLINE",
        });
    }
  });
});

let updatingUserConnection = false;
const updateUserConnections = async () => {
  updatingUserConnection = true;

  while (connectionQueue.length > 0) {
    const { userId, status } = connectionQueue[0];
    connectionQueue.shift();
    try {
      await updateUserState(userId, status);
    } catch (err) {
      console.log("error", err);
    }
  }

  updatingUserConnection = false;
};

setInterval(() => {
  if (!updatingUserConnection) {
    updateUserConnections();
  }
}, 1000);

app.get("/", (req, res) => {
  res.send("Server is up.");
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
