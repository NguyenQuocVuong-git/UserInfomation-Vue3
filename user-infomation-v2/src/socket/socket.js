import { io } from "socket.io-client";

import { BACKEND_SERVER } from "@/configs/constants";

const socket = io(BACKEND_SERVER, { autoConnect: false });

function createWebSocketPlugin(socket) {
  return (store) => {
    store.$socket = socket;
    socket.on("USER_INFO", (user) => store.dispatch("LOGIN", user));
    socket.on("FRIENDS_LIST", (friends) => {
      store.dispatch("SET_FRIENDS", friends);
    });
    socket.on("FRIEND_CONNECTED", (friend) => {
      store.dispatch("ADD_FRIEND", friend);
    });
    socket.on("PRIVATE_MESSAGE", (message) => {
      store.dispatch("RECEIVE_MESSAGE", message);
    });
  };
}

export const websocketPlugin = createWebSocketPlugin(socket);

export default socket;