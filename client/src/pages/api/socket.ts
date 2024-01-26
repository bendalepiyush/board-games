// import { PORT } from "@/config/app"
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";
import { Server } from "socket.io";
import { verifyToken } from "@/js/jwt";
import { gql } from "@apollo/client";
import { apolloClient } from "@/apollo";
import { resolve } from "dns";

const PORT = parseInt(process.env.SOCKET_PORT || "4004");

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const updateUserStatus = gql`
  mutation updateUserStatus($id: uuid!, $status: String!) {
    update_player_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      status
    }
  }
`;

let connectionQueue: { userId: any; status: string }[] = [];

const updateUserState = async (id: string, status: string) => {
  try {
    await apolloClient.mutate({
      mutation: updateUserStatus,
      variables: {
        id,
        status,
      },
    });
  } catch (error: any) {
    console.error("error", error);
  }
};

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

export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    res.status(200).json({
      success: true,
      message: "Socket is already running",
      socket: `:${PORT}`,
    });
    return;
  }

  console.log("Starting Socket.IO server on port:", PORT);
  const io = new Server({
    path: "/api/socket",
    addTrailingSlash: false,
    cors: { origin: "*" },
  }).listen(PORT);

  io.on("connect", (socket) => {
    const _socket = socket;

    let token: string | string[] = "";
    let user: any = null;
    let isUserExistIndex: number = -1;

    if (socket.handshake.query && socket.handshake.query.token) {
      token = socket.handshake.query.token;

      user = verifyToken(Array.isArray(token) ? token[0] : token);

      let isUserExistIndex = connectionQueue.findIndex(
        (item) => item["userId"] === user.id
      );

      if (user.id) {
        if (isUserExistIndex !== -1)
          connectionQueue[isUserExistIndex] = {
            userId: user.id,
            status: "ONLINE",
          };
        else
          connectionQueue.push({
            userId: user.id,
            status: "ONLINE",
          });
      }
    }

    // _socket.broadcast.emit("welcome", `Welcome ${_socket.id}`);
    socket.on("disconnect", async () => {
      if (user.id) {
        if (isUserExistIndex !== -1)
          connectionQueue[isUserExistIndex] = {
            userId: user.id,
            status: "OFFLINE",
          };
        else
          connectionQueue.push({
            userId: user.id,
            status: "OFFLINE",
          });
      }
    });
  });

  res.socket.server.io = io;

  res.status(201).json({
    success: true,
    message: "Socket is started",
    socket: `:${PORT}`,
  });
}
