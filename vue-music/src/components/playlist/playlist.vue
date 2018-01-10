<template>
    <transition name="list-fade" leave-to-class="leave-to">
        <div class="playlist" @click="cancelPlayList">
            <div class="list-wrapper" ref="listWrapper">
                <header class="header">
                    <div class="left">
                        <i class="icon">repeat</i>
                        <p class="text">列表循环</p>
                    </div>
                    <div class="right" @click.stop="clear">
                        <i class="icon">delete</i>
                    </div>
                </header>
                <ul 
                    class="list-content" 
                    ref="listContent"
                    @touchmove="touchmove"
                    @touchstart="touchstart"
                    @touchend="touchend">
                    <li 
                        class="list-item" 
                        v-for="(item, index) in sequenceList" 
                        :key="index"
                        @click="select(item,index)"
                        ref="listItem">
                        <div class="left">
                            <i class="icon" v-show="showCurrentSongIcon(item)">album</i>
                            <p class="text">{{item.name}}<span>-{{item.singerName}}</span></p>
                        </div>
                        <div class="right" @click.stop="deleteItem(index)">
                            <i class="icon">close</i>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bg" ref="bg"></div>
        </div>
    </transition>
</template>
<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {prefixStyle} from '@/common/js/dom'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
  props:{
      data: {
          type: Array,
          default: ()=>{return []}
      },
      showPlayList:{
          type: Boolean,
          default: false
      }
  },
  data() {
      return {
          isCancel : false
      }
  },
  methods: {
    showCurrentSongIcon(item) {
        return item.id===this.currentSong.id ? true : false 
    },
    cancelPlayList() {
        this.$emit('cancelPlayList')
    },
    select(item, index) {
        this.$emit('select',item,index)
    },
    touchstart(e){
        let touch = e.touches[0]
        this.touch.startY = touch.pageY;
        this.touch.startTime = touch.timeStamp || new Date()
    },
    touchmove(e) {
        let touch = e.touches[0]
        this.touch.moveY = touch.pageY
        this.$refs.listWrapper.style[transitionDuration] = '0s'
        if(e.target.parentElement.scrollTop==0&&this.touch.moveY>this.touch.startY){
            let offsetTop = this.touch.moveY - this.touch.startY
            this.$refs.listWrapper.style[transform] = `translate3d(0,${offsetTop}px,0)`
        }        
    },
    touchend(e){
        let that = this
        let touch = e.changedTouches[0]
        this.touch.endY = touch.pageY
        let clientHeight = this.$refs.listContent.clientHeight
        let distance = this.touch.endY - this.touch.startY
        let percent = distance / clientHeight
        this.touch.endTime = touch.timeStamp || new Date()
        this.$refs.listWrapper.addEventListener('transitionend',function(){
            if( that.isCancel ){ 
                that.$emit('cancelPlayList')
                setTimeout(()=>{
                    this.style[transform] = `translate3d(0,0,0)`
                    this.style[transitionDuration] = `0s`
                    that.$refs.bg.style.opacity = 1
                    this.isCancel = false
                },100)
            }
        })
        if(this.$refs.listContent.scrollTop==0 && this.touch.endY > this.touch.startY){
            if(percent < 0.4 || this.touch.endTime - this.touch.startTime < 180){
                this.$refs.listWrapper.style[transform] = `translate3d(0,100%,0)`
                this.$refs.listWrapper.style[transitionDuration] = `.2s` 
                this.$refs.bg.style.opacity = 0
                this.$refs.bg.style[transitionDuration] = `.2s`
                this.isCancel = true
            }else{
                this.$refs.listWrapper.style[transform] = `translate3d(0,0,0)`
                this.$refs.listWrapper.style[transitionDuration] = `.2s`
                this.isCancel = false
            }
        }
    },
    deleteItem(index) {
        this.$emit('delete',index)
    },
    clear(){
        this.$emit('clearPlayList')
    },
    scrollTo() {
        if(this.showPlayList){
            setTimeout(()=>{
                this.$refs.listContent.scrollTo(0, this.$refs.listItem[this.currentIndex].offsetTop)
            },100)
        }
    }
  },
  created() {
      this.touch = {}
  },
  watch: {
      showPlayList() {
        this.scrollTo()
      }
  },
  computed: {
      ...mapGetters([
          'sequenceList',
          'currentSong',
          'currentIndex'
      ])
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
.text {
  color: @color-primary;
}
.playlist {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 99999;
  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .list-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 400px;
    z-index: 2;
    background: @background-color-default;
    .header {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: @comm-padding;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .text {
          margin-left: 10px;
        }
      }
    }
    .list-content {
      padding: @comm-padding;
      box-sizing: border-box;
      position: absolute;
      top: 50px;
      width: 100%;
      bottom: 0;
      overflow: auto;
      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid @color-accent;
        .left {
          display: flex;
          align-items: center;
          .text {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
// .list-fade-enter,.list-fade-leave {
//   .list-wrapper {
//     transform: translate3d(0, 100%, 0);
//   }
// }
.list-fade-enter-active {
  transition: all 1s;
  .bg {
    animation: bg-fadein 0.4s;
  }
  .list-wrapper {
    animation: list-fade-y 0.4s;
  }
}
// .list-fade-leave-active {
//   transition: all 1s;
//   .bg {
//     opacity: 0;
//     transition: all 0.4s;
//   }
//   .list-wrapper {
//     transform: translate3d(0, 100%, 0);
//     transition: all 0.4s;
//   }
// }
// .list-fade-leave-to {
//   .list-wrapper {
//     transform: translate3d(0, 100%, 0);
//   }
// }
// .list-fade-enter-to {
//   .list-wrapper {
//     transform: translate3d(0, 0, 0);
//   }
// }

@keyframes bg-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes list-fade-y {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

</style>


