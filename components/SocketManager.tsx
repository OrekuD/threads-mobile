import React from "react";
import useUserStore from "../store/userStore";
import io, { Socket } from "socket.io-client";
import SocketEvents from "../enums/SocketEvents";
import SocketContext from "../contexts/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import useAccessTokenStore from "@/store/accessTokenStore";

interface Props {
  children: React.ReactNode;
}

const SocketManager: React.FC<Props> = (props: Props) => {
  const user = useUserStore((state) => state.user);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    if (!accessToken || !user?.id) {
      return;
    }
    const newSocket = io(process.env.EXPO_PUBLIC_API_URL!, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 10000,
      agent: "ReactNative",
      query: { authorization: accessToken },
    });

    newSocket.on("connect", () => {
      console.log(
        `SocketState: Connected to the server at ${process.env.EXPO_PUBLIC_API_URL}`
      );
    });
    newSocket.on("connect_error", (error: Error) => {
      console.log("SocketState: connect_error", error);
    });
    newSocket.on("disconnect", () => {
      console.log("SocketState: Disconnected from the server.");
    });

    setSocket(newSocket);

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
        socket.close();
        setSocket(null);
      }
    };
  }, [accessToken, user?.id]);

  React.useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(SocketEvents.USER_NEW_NOTIFICATION, (data) => {
      // console.log(SocketEvents.USER_NEW_NOTIFICATION, { data });
      queryClient.invalidateQueries(["user", "notifications"]);
    });

    return () => {
      socket.off(SocketEvents.USER_NEW_NOTIFICATION);
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketManager;
