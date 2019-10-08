<template>
  <div class="custom-alert">
    <div class='custom-alert__icon-wrapper'>
      <img class='custom-alert__icon-wrapper__icon' :src='ExclamationIcon' alt='alert' />
    </div>
    <div class='custom-alert__message'>
      {{alertMessage}}
    </div>

  </div>
</template>

<script>
  import ExclamationIcon from "../../assets/icons/exclamation.svg"
  export default {
    name: "CustomAlert",
    props: ['alertMessage'],
    data: function () {
      return {
        ExclamationIcon: ExclamationIcon
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "CustomAlert";
</style>
