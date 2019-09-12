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
    setTypingToStore (state, typing) {
      state.typing = typing
    },
    setRoomToStore (state, room) {
      state.room = room
    },
    setChatStatusToStore (state, chatStatus) {
      state.chatStatus = chatStatus
    },
    addMessageToStore(state, message) {
      state.messages = [...state.messages, message]
    },
    clearMessagesFromStore(state) {
      state.messages = []
      state.chatArray = []
    }
  },
  actions: {
    addChatItem(context, chatItem) {
      context.commit('addChatItemToChatArray', chatItem)
    },
    setTyping(context, data) {
      context.commit('setTypingToStore', data)
    },
    setRoom(context, data) {
      context.commit('setRoomToStore', data)
    },
    setChatStatus(context, data) {
      context.commit('setChatStatusToStore', data)
    },
    addMessage(context, data) {
      context.commit('addMessageToStore', data)
    },
    clearMessages(context, data) {
      context.commit('clearMessagesFromStore', data)
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

