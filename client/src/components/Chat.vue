<template>
  <div class="container">
    <div class="chat-dashboard">
      <div class="chat-dashboard__background">
        <div class="chat-dashboard__background__messages">
          <p v-if="typing" class="chat-dashboard__background__messages__typing">User is typing...</p>
          <div v-for="message in messages">
            <span :class="{'float-left' : message.type === 1, 'float-right' : message.type !== 1}"
                  class="chat-dashboard__background__messages__message">{{message.message}}</span>
          </div>
        </div>
      </div>

      <form class="chat-dashboard__message-form" @submit.prevent="sendMessage">
        <b-input-group class="chat-dashboard__message-form__inputgroup"  size="lg">
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

    </div>

  </div>
</template>

<script>
import io from 'socket.io-client';
import BFormInput from "bootstrap-vue/src/components/form-input/form-input";

export default {
  components: {BFormInput},
  data() {
    return {
      socket: io(process.env.VUE_APP_SOCKET_URL),
      user: '',
      message: '',
      messages: [],
      typing: null,
    };
  },
  watch: {
    message(value) {
      value ? this.socket.emit('TYPING') : this.socket.emit('TYPING_STOPPED');
    },
  },
  methods: {
    sendMessage() {
      this.messages.push({ message: this.message, type: 0 });
      this.socket.emit('CHAT_MESSAGE', this.message);
      this.message = null;
    },
  },
  created() {
    this.socket.emit('CREATED', 'Onur');
    this.socket.on('CREATED', (data) => {
      console.log(data);
    });
    this.socket.on('CHAT_MESSAGE', (data) => {
      this.messages.push({ message: data, type: 1 });
    });
    this.socket.on('TYPING', () => {
      this.typing = true;
    });
    this.socket.on('TYPING_STOPPED', () => {
      this.typing = false;
    });
  },
};
</script>

<style scoped lang="scss">
  @import "../styles/components/Chat";
</style>
