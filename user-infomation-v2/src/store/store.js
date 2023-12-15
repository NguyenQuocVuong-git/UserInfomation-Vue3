import { createStore } from 'vuex';
import { websocketPlugin } from '../socket/socket';
import socket from "@/socket/socket";

const store = createStore({
  plugins: [websocketPlugin],
  state: {
    user: null,
    friends: [],
    messageWithFriendV2 : []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setFriends(state, friends) {
      state.friends.push(...friends);
    },
    addFriend(state, friend) {
      state.friends.push(friend);
    },
    addNewMessage(state, message) {
      const friends = [...state.friends];
      let receiverIndex = friends.findIndex(
        (friend) => friend.socketId === message.to
      );
      const messages = friends[receiverIndex].messages || [];
      messages.push(message);
      friends[receiverIndex].messages = messages;
      state.friends = friends;
    },
    addNewMessageV2(state, message){
      state.messageWithFriendV2.push(message)
    },
    receiveMessage(state, message) {
      const friends = [...state.friends];
      const senderIndex = friends.findIndex(
        (friend) => friend.socketId === message.from
      );
      const messages = friends[senderIndex].messages || [];
      messages.push(message);
      friends[senderIndex].messages = messages;
      state.friends = friends;
    },
    loadMessage(state, messages ) {
      state.messageWithFriendV2 = messages ;
    }
  },
  actions: {
    LOGIN({ commit }, user) {
      commit("setUser", user);
    },
    SET_FRIENDS({ commit }, friends) {
      commit("setFriends", friends);
    },
    ADD_FRIEND({ commit }, friend) {
      commit("addFriend", friend);
    },
    SEND_MESSAGE({ commit }, message) {
      socket.emit("PRIVATE_MESSAGE", message);
      commit("addNewMessageV2", message);
    },
    RECEIVE_MESSAGE({ commit }, message) {
      commit("receiveMessage", message);
    },
    LOAD_MESSAGE_CURRENT({commit}, messages) {
      commit("loadMessage", messages);
    },
    SEND_MESSAGEV2({ commit }, message) {
      socket.emit("PRIVATE_MESSAGE", message);
      commit("addNewMessage", message);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    friends(state) {
      return state.friends;
    },
    messageWithFriendV2(state) {
      return state.messageWithFriendV2;
    },
    messagesWithFriend(state) {
      return (socketId) => {
        const friend = state.friends.find(
          (friend) => friend.socketId === socketId
        );
        if (!friend) {
          return [];
        }
        return friend.messages;
      };
    },
  },
  
});

export default store;
