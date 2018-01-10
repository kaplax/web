<template>
  <div class="container" ref="container">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Player from './components/player/player'
export default {
  name: 'app',
  components: {
    MHeader,
    Player
  },
  mounted() {
    // this.$refs.container.style.height = window.innerHeight+28 +'px'
  }
}
</script>
<style lang="less" scoped>
</style>
