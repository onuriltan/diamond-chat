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
    addChatItemToChatArray (state, chatItem) {
      state.chatArray = [...state.chatArray, chatItem]
    },
    setTyping (state, typing) {
      state.typing = typing
    },
    setRoom (state, room) {
      state.room = room
    },
    setChatStatus (state, chatStatus) {
      state.chatStatus = chatStatus
    },
    addMessage(state, message) {
      state.messages = [...state.messages, message]
    },
    clearMessages(state) {
      state.messages = []
    }
  },
  actions: {
    addChatItem(context, chatItem) {
      context.commit('addChatItemToChatArray', chatItem)
    },
    setTyping(context, data) {
      context.commit('setTyping', data)
    },
    setRoom(context, data) {
      context.commit('setRoom', data)
    },
    setChatStatus(context, data) {
      context.commit('setChatStatus', data)
    },
    addMessage(context, data) {
      context.commit('addMessage', data)
    },
    clearMessages(context, data) {
      context.commit('clearMessages', data)
    },
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

