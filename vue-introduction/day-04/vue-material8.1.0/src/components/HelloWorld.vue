<template>
  <div class="phone-viewport">
    <md-bottom-bar md-shift md-theme="indigo">
      <md-bottom-bar-item md-icon="ondemand_video">Movies</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="music_note">Music</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="books" md-active>Books</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="photo">Pictures</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
