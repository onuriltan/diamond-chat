<template>
  <div class="container">
    <div class="col-lg-6 offset-lg-3">
      <div class="card bg-info">
        <div class="card-header text-white">
          Current Chat
        </div>
        <ul class="list-group list-group-flush text-right">
          <small v-if="typing" class="text-white">User is typing...</small>
          <li class="list-group-item" v-for="message in messages">
            <span :class="{'float-left' : message.type === 1}">{{message.message}}</span>
          </li>
        </ul>
        <div class="card-body">
          <form @submit.prevent="sendMessage">
            <div class="form-group">
              <input type="text" class="form-control" v-model="message" placeholder="Type here...">
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
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

<style lang="scss">
  @import "styles/global.scss";
</style>
