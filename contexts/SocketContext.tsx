import { createContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<{
  socket: Socket | null;
}>({
  socket: null,
});

export default SocketContext;
