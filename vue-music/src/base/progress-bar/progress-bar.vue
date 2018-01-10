<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper"
                 ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd">
                 <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {prefixStyle} from '@/common/js/dom'
const transform = prefixStyle('transform')
const progressBtnWidth = 12
export default {
  props: {
      percent: {
          type: Number,
          default: 0
      }
  },
  methods: {
      progressTouchStart(e) {
          this.touch.init = true
          this.touch.startX = e.touches[0].pageX
          this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
          if(!this.touch.init){
              return
          }
          const deltaX = e.touches[0].pageX-this.touch.startX
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left+deltaX)) 
          this.__offset(offsetWidth)
      },
      progressTouchEnd() {
          this.touch.init = false
          this.__triggerPercent()
      },
      progressClick(e) {
          const rect = this.$refs.progressBar.getBoundingClientRect()
          const offsetWidth = e.pageX - rect.left
          this.__offset(offsetWidth)
          this.__triggerPercent()
      },
      __offset(offsetWidth) {
          this.$refs.progress.style.width = `${offsetWidth}px`
          this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0 ,0)` 
      },
      __triggerPercent() {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const percent = this.$refs.progress.clientWidth / barWidth
          this.$emit('percentChange', percent)
      }
  },
  created() {
      this.touch = {}
  },
  watch: {
      percent(newPercent){
          if(newPercent>=0&& !this.touch.init){
              const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
              const offsetWidth = newPercent * barWidth
              this.__offset(offsetWidth)
          }
      }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
    .progress-bar{
        height: 30px;
        .bar-inner{
            position: relative;
            top: 13px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            .progress{
                position: absolute;
                height: 100%;
                background: @color-primary;
            }
            .progress-btn-wrapper{
                position: absolute;
                left: -8px;
                top:-13px;
                width: 30px;
                height:30px;
                .progress-btn{
                    position: relative;
                    top:9px;
                    left: 9px;
                    box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.26);
                    border-radius: 50%;
                    width: 12px;
                    height: 12px;
                    background: @background-color-default
                }
            }
        }
    }
</style>


