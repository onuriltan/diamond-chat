<template>
  <div class="container">
    <div class="chat-dashboard">
      <div class="chat-dashboard__background">
        <div class="chat-dashboard__background__messages" v-if="loginResponseType === 1">
          <p v-if="typing" class="chat-dashboard__background__messages__typing">User is typing...</p>
          <div v-for="message in messages">
            <span :class="{'float-left' : message.type === 1, 'float-right' : message.type !== 1}"
                  class="chat-dashboard__background__messages__message">{{message.message}}</span>
          </div>
        </div>
        <form class="chat-dashboard__message-form" @submit.prevent="sendMessage" v-if="loginResponseType === 1">
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
        <div class="chat-dashboard__background__waiting" v-if="loginResponseType !== 1">
          <div class="chat-dashboard__background__waiting__message">
            Waiting for the random stranger...
          </div>
          <div class="chat-dashboard__background__waiting__loader">
            <i class="fa fa-refresh fa-spin fa-5x"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import io from 'socket.io-client';
  import {createNamespacedHelpers} from 'vuex'
  import cookieResource from '../resources/cookie.resource'

  const {mapState} = createNamespacedHelpers('auth')

  export default {
    data() {
      return {
        socket: io(process.env.VUE_APP_SOCKET_URL, {
          extraHeaders: {
            Authorization: `Bearer ${cookieResource.getCookie(process.env.VUE_APP_JWT_COOKIE_NAME)}`
          }
        }),
        user: '',
        message: '',
        messages: [],
        typing: null,
        connected: false,
        room: null,
        loginResponseType: null
      };
    },
    computed: {
      ...mapState(['isAuthenticated', 'firstName']),
    },
    watch: {
      message(value) {
        value ? this.socket.emit('TYPING', {room: this.room}) : this.socket.emit('TYPING_STOPPED', {room: this.room});
      },
    },
    methods: {
      sendMessage() {
        if (this.message !== '') {
          this.messages.push({message: this.message, type: 0});
          this.socket.emit('CHAT_MESSAGE', {message: this.message, room: this.room});
          this.message = null;
        }
      }
    },
    created() {
      this.socket.emit('LOGIN', 'Onur');
      this.socket.on('CREATED', data => {
        console.log(data);
      });
      this.socket.on('LOGIN_RESPONSE', data => {
        console.log(data.message, ", code: " + data.type)
        this.loginResponseType = data.type
      });
      this.socket.on('CHAT_START', data => {
        console.log("Chat is started in room " + data.room)
        this.loginResponseType = 1
        this.room = data.room;
      });
      this.socket.on('CHAT_MESSAGE', data => {
        this.messages.push({message: data, type: 1});
      });
      this.socket.on('TYPING', data => {
        this.typing = true;
      });
      this.socket.on('TYPING_STOPPED', data => {
        this.typing = false;
      });
      this.socket.on('CHAT_END', data => {
        console.log("Chat ended");
      });
    },
  };
</script>

<style scoped lang="scss">
  @import "../styles/components/Chat";
</style>
