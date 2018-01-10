<template>
  <pull-to :distance-index='3' @scroll="scrollEvent" :is-throttle-scroll='false'>
    <slot></slot>
  </pull-to>
</template>
<script>
import PullTo from 'vue-pull-to'
export default {
  components:{
      PullTo
  },
  methods: {
    scrollEvent(e) {
      this.$emit('scroll', e)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

