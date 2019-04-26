<template>
  <div class="home">
    <span class="home__slogan" id="slogans"></span>
    <div class="home__explanation">
      Diamond chat is an real time chat application aims to connect people who shares the same music taste.
    </div>
    <div class="home__status">
      <strong>This is a demo of the application for now! More to come soon</strong>
    </div>

  </div>

</template>

<script>
import TypeIt from 'typeit'

export default {
    name: "HomeView",
    mounted() {
        new TypeIt('#slogans', {
            startDelay: 900,
            strings: ["Chat with people same with your music taste.", "Use music to connect with people."],
            speed: 70,
            loop: true,
            breakLines: false,
            waitUntilVisible: true
        }).go().pause(700);
    }
}
</script>

<style scoped lang="scss">
  @import "../styles/views/homeview";

</style>
