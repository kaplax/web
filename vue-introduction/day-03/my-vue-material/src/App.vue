<template>
  <div id="app">
  <md-tabs md-fixed>
  <md-tab id="movies" md-label="Movies">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
  </md-tab>

  <md-tab id="music" md-label="Music">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
  </md-tab>

  <md-tab id="books" md-label="Books">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
  </md-tab>

  <md-tab id="pictures" md-label="Pictures">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
  </md-tab>
</md-tabs>
  <md-button class="md-raised md-primary">Primary</md-button>
    <img src="./assets/logo.png">
    <router-view></router-view>
    <div class="phone-viewport">
<md-bottom-bar>
  <md-bottom-bar-item md-icon="ondemand_video">Movies</md-bottom-bar-item>
  <md-bottom-bar-item md-icon="music_note">Music</md-bottom-bar-item>
  <md-bottom-bar-item md-icon="books" md-active>Books</md-bottom-bar-item>
  <md-bottom-bar-item md-icon="photo">Pictures</md-bottom-bar-item>
</md-bottom-bar>

</div>
    
  </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  
  
</style>