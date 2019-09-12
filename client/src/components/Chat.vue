<template>
  <div class="container">
    <div class="chat-dashboard">
      <div class="chat-dashboard__messages" v-if="chatStatus === 1" ref="chat-dashboard">
        <p v-if="typing" class="chat-dashboard__messages__typing">User is typing...</p>
        <div v-for="(message, index) in messages" :key="index">
            <div :class="{'float-left' : message.type === 1, 'float-right' : message.type !== 1}"
                  class="chat-dashboard__messages__message">{{message.message}}</div>
        </div>
      </div>
      <form class="chat-dashboard__message-form" @submit.prevent="sendMessage" v-if="chatStatus === 1">
        <b-input-group class="chat-dashboard__message-form__inputgroup" size="lg">
          <b-form-input v-model="message"
                        class="chat-dashboard__message-form__input"
                        type="text"
                        autocomplete="off"
                        placeholder="Type here ..."></b-form-input>
          <b-input-group-append>
            <b-btn type="submit" class="chat-dashboard__message-form__button">Send</b-btn>
          </b-input-group-append>
        </b-input-group>
      </form>

      <div class="chat-dashboard__waiting" v-if="chatStatus === 0">
        <div class="chat-dashboard__waiting__message">
          Waiting for the music junkie...
        </div>
        <div class="chat-dashboard__waiting__loader">
          <i class="fas fa-sync-alt fa-spin fa-5x"></i>
        </div>
      </div>

      <div class="chat-dashboard__chat-end" v-if="chatStatus === 2">
        <div class="chat-dashboard__chat-end__message">
          User is disconnected from chat
        </div>
        <b-btn class="chat-dashboard__chat-end__btn-find" @click="findAnother">Find another Floydian</b-btn>
      </div>

    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client';
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        socket: io(process.env.VUE_APP_SOCKET_URL),
        user: '',
        message: ''
      };
    },
    computed: {
      ...mapState('auth', {
        isAuthenticated: state => state.isAuthenticated,
        firstName: state => state.firstName,
      }),
      ...mapState('chat', {
        chatArray: state => state.chatArray,
        typing: state => state.typing,
        room: state => state.room,
        chatStatus: state => state.chatStatus,
        messages: state => state.messages,
      })
    },
    watch: {
      message(value) {
        value ? this.socket.emit('TYPING', {room: this.room}) : this.socket.emit('TYPING_STOPPED', {room: this.room});
      },
      messages() {
        this.$refs['chat-dashboard'].scrollTo({
          top: this.$refs['chat-dashboard'].scrollHeight + 100,
          behavior: 'smooth'
        })
      }
    },
    methods: {
      ...mapActions('chat', [ 'addChatItem', 'setTyping', 'setRoom', 'setChatStatus', 'addMessage', 'clearMessages' ]),

      sendMessage() {
        if (this.message !== '') {
          this.socket.emit('CHAT_MESSAGE', {message: this.message, room: this.room});
          this.addMessage({message: this.message, type: 0})
          this.message = null;
        }
      },
      findAnother() {
        this.clearMessages();
        this.socket.emit('LOGIN', 'Onur');
      },
      resetChat() {
        this.socket.emit('DISCONNECT', 'Onur');
        this.setChatStatus(1);
        this.setRoom(null)
        this.setTyping(false);
        this.clearMessages();
      }
    },
    created() {
      this.socket.emit('LOGIN', 'Onur');
      this.socket.on('CREATED', data => {
        console.log(data);
      });
      this.socket.on('LOGIN_RESPONSE', data => {
        this.setChatStatus(0);
      });
      this.socket.on('CHAT_START', data => {
        this.setRoom(data.room);
        this.setChatStatus(1);
      });
      this.socket.on('CHAT_MESSAGE', data => {
        this.addMessage({message: data, type: 1})
      });
      this.socket.on('TYPING', data => {
        this.setTyping(true);
      });
      this.socket.on('TYPING_STOPPED', data => {
        this.setTyping(false);
      });
      this.socket.on('CHAT_END', data => {
        this.setChatStatus(2);
        this.resetChat()
      });
    },
    beforeDestroy() {
      this.resetChat()
    }
  };

</script>

<style scoped lang="scss">
  @import "../styles/components/Chat";
</style>
