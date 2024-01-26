// socketClient.ts

import { io, Socket } from "socket.io-client";

type SocketClient = {
  socket: Socket;
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
};

const connect = (socket: Socket) => {
  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
};

const disconnect = (socket: Socket) => {
  socket.disconnect();
  sharedSocketClient = null;
};

const reconnect = (socket: Socket) => {
  socket.connect();
};

let sharedSocketClient: SocketClient | null = null;

export const getSocketClient = (
  token: string | undefined = undefined
): SocketClient => {
  if (!sharedSocketClient) {
    const PORT = parseInt(process.env.SOCKET_PORT || "4004");

    const socket = io(`:${PORT}`, {
      path: "/api/socket",
      addTrailingSlash: false,
      query: {
        token,
      },
    });

    connect(socket);

    socket.on("connect_error", async (err) => {
      console.log(`connect_error due to ${err.message}`);
      await fetch("/api/socket");
    });

    sharedSocketClient = {
      socket,
      connect: () => connect(socket),
      disconnect: () => disconnect(socket),
      reconnect: () => reconnect(socket),
    };
  }

  return sharedSocketClient;
};
