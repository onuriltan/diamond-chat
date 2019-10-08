import {
  CLEAR_MESSAGES,
  ADD_MESSAGE,
  ADD_CHAT_ITEM,
  SET_CHAT_STATUS,
  SET_ROOM,
  SET_TYPING
} from "./chat.types";

const chat = {
  namespaced: true,
  state: {
    chatArray: [],
    typing: false,
    room: null,
    chatStatus: null,
    messages: [],
  },
  mutations: {
    [ADD_CHAT_ITEM] (state, chatItem) {
      state.chatArray = [...state.chatArray, chatItem]
    },
    [SET_TYPING] (state, typing) {
      state.typing = typing
    },
    [SET_ROOM] (state, room) {
      state.room = room
    },
    [SET_CHAT_STATUS] (state, chatStatus) {
      state.chatStatus = chatStatus
    },
    [ADD_MESSAGE](state, message) {
      state.messages = [...state.messages, message]
    },
    [CLEAR_MESSAGES](state) {
      state.messages = [];
      state.chatArray = []
    }
  },
  actions: {
    addChatItem(context, chatItem) {
      context.commit(ADD_CHAT_ITEM, chatItem)
    },
    setTyping(context, data) {
      context.commit(SET_TYPING, data)
    },
    setRoom(context, data) {
      context.commit(SET_ROOM, data)
    },
    setChatStatus(context, data) {
      context.commit(SET_CHAT_STATUS, data)
    },
    addMessage(context, data) {
      context.commit(ADD_MESSAGE, data)
    },
    clearMessages(context, data) {
      context.commit(CLEAR_MESSAGES, data)
    }
  },
  getters: {
    getChatArray : state =>  {
      return state.chatArray
    },
    getTyping: state => {
      return state.typing
    },
    getRoom: state => {
      return state.room
    },
    getChatStatus: state => {
      return state.chatStatus
    },
    getMessages: state => {
      return state.messages
    },
  }
};

export default chat

