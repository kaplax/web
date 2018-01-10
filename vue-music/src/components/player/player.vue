<template>
  <div class="player" v-show="playerList.length>0">
      <transition 
        name="normal"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave">
        <div class="normal-player" v-show="playerFullScreen">
            <div class="background-img">
                <div class="shadow"></div>
                <img :src="currentSong.image" alt="">
            </div>
            <div class="header">
                <div class="back" @click="back">
                    <i class="icon icon-back">keyboard_backspace</i>
                </div>
            </div>
            <div 
                class="middle"
                @touchstart.prevent="middleTouchStart"
                @touchmove="middleTouchMove"
                @touchend="middleTouchEnd">
                <div class="middle-left" ref="middleLeft">
                     <h2 class="title" v-html="currentSong.name"></h2>
                    <p class="sub-title" v-html="currentSong.singerName"></p>
                    <div class="cd"  ref="cdWrapper">
                        <img v-lazy="currentSong.image" alt="" :class="cdRotate" class="rotate">
                        <!-- <div class="circle"></div> -->
                    </div>
                    <div class="lyric-line-wrapper">
                        <div class="lyric-line">{{playingLyricLine}}</div>
                    </div>
                </div>
                <BScroll class="middle-right" ref="lyricList" :data="currentLyric && currentLyric.line">
                    <div class="lyric-wrapper" ref="lyricWrapper"> 
                        <div v-if="currentLyric" ref="lyricWrapperChild">
                            <p ref="lyricLine"
                                class="lyric-text"
                                :class="{'active': currentLineNum === index}"
                                v-for="(item, index) in currentLyric.lines" :key="index">
                                {{item.txt}}
                            </p>
                        </div>
                    </div>
                </BScroll>
               
            </div>
            <div class="footer">
                <progress-bar 
                    :percent="percent"
                    @percentChange="onProgressBarChange"
                    ></progress-bar>
                <div class="time">
                    <div class="current-time">{{formatTime(currentTime)}}</div>
                    <div class="total-time">{{formatTime(currentSong.duration)}}</div>
                </div>
                <div class="contral">
                    <div class="contral-left">
                        <div @click="changeMode">
                            <i class="icon" v-html="iconMode"></i>
                        </div>
                    </div>
                    <div class="contral-middle">
                        <div @click="previous">
                            <i class="icon">skip_previous</i>
                        </div>
                        <div @click="togglePlaying">
                            <i class="icon" v-html="playingIcon" style="width:50px;height:50px;font-size:50px;margin:0 10px;">play_circle_outline</i>
                        </div>
                        <div 
                            @touchstart.stop.prevent="nextTouchStart"
                            @touchend.stop.prevent="nextTouchEnd">
                            <i class="icon">skip_next</i>
                        </div>
                    </div>
                    <div class="contral-right">
                        <div>
                            <i class="icon" :class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)">favorite</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </transition>
      
      <transition name="mini">
          <div 
            class="mini-player-bar" 
            v-show="!playerFullScreen"
            @click="fullScreen">
                <div class="mini-con-left" ref="miniConLeft">
                    <progress-circle :radius="50" :percent="percent">
                        <div class="mini-img rotate" :class="cdRotate">
                            <img :src="currentSong.image" alt="" >
                        </div>
                    </progress-circle>
                    <div class="mini-message">
                        <h3 class="title" v-html="currentSong.name"></h3>
                        <div class="sub-title" v-html="currentSong.singerName"></div>
                    </div>
                </div>
                <div class="mini-con-right">
                    <div @click.stop.prevent="togglePlaying">
                        <i class="icon" v-html="playingIcon">play_circle_outline</i>
                    </div>
                    <div 
                        @click.stop.prevent="next">
                        <i class="icon">skip_next</i>
                    </div>
                    <div @click.stop.prevent="viewPlayList">
                        <i class="icon">queue_music</i>
                    </div>
                </div>
            </div>
      </transition>
      <playlist 
        v-show="showPlayList" 
        @cancelPlayList="cancelPlayList"
        @select="selectByPlayList"
        :currentIndex="currentIndex"
        :showPlayList = "showPlayList"
        @delete="deleteItem"
        @clearPlayList="clearPlayerList">
      </playlist>
      <m-dialog
        v-if="showDialog" 
        title="是否清空播放列表" 
        cancelText="取消" 
        confirmText="确认" 
        @cancel="cancelDiadol"
        @confirm="confirmDiadol"></m-dialog>
      <audio 
        :src="currentSong.url" 
        ref="audio"
        @play="ready" 
        @error="error" 
        @timeupdate="updatetime"
        @ended="end"
        >
      </audio>
  </div>
</template>
<script>
import {mapGetters,mapMutations, mapActions} from 'vuex'
import ProgressBar from '@/base/progress-bar/progress-bar'
import ProgressCircle from '@/base/progress-circle/progress-circle'
import MDialog from '@/base/dialog/dialog'
import BScroll from '@/base/scroll/bScroll'
import Playlist from '@/components/playlist/playlist'
import animations from 'create-keyframe-animation'
import {prefixStyle} from '@/common/js/dom'
import {playMode} from '@/common/js/config'
import {shuffle} from '@/common/js/util.js'
import LyricParser from 'lyric-parser'
import {getUrl} from '@/api/song'
import {playerlistMixin} from '@/common/js/mixin'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
    mixins:[playerlistMixin],
    data() {
        return {
            songReady: false,
            currentTime: 0,
            currentLyric: null, //当前歌词
            currentLineNum: 0, //当前歌词所在行,
            currentPage: 0, //0:唱片页 1: 歌词页
            playingLyricLine: null,
            showPlayList: false,
            showDialog: false
        }
    },
    methods: {
        back() { //最小化到mini-bar
            this.setFullScreen(false) 
        },
        fullScreen() { //全屏显示播放
            this.setFullScreen(true)
        },
        enter(el, done) {
            const {x, y, scale} = this.__getPosAndScale()

            let animation = {
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1.1)`                    
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1)` 
                }
            }
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            })
            animations.runAnimation(this.$refs.cdWrapper, 'move', done)

        },
        afterEnter() {
            animations.unregisterAnimation('move')
            this.$refs.cdWrapper.style.animation = ''
        },
        leave(el, done) {
            this.$refs.cdWrapper.style.transition = 'all .4s'
            const {x, y ,scale} = this.__getPosAndScale()
            this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
            this.$refs.cdWrapper.addEventListener('transitionend', done)
        },
        afterLeave() {
            this.$refs.cdWrapper.style.transition = ''
            this.$refs.cdWrapper.style.transform = ''
        },
        togglePlaying() {
            this.$refs.audio.play()
            this.setPlayingState(!this.playing)
            if (this.currentLyric) {
                this.currentLyric.togglePlay()
            }
        },
        onProgressBarChange(percent) {
            const currentTime = this.currentSong.duration * percent
            this.$refs.audio.currentTime = currentTime
            if(!this.playing){
                this.togglePlaying()
            }
            if(this.currentLyric) {
                this.currentLyric.seek(currentTime*1000)
            }
        },
        __getPosAndScale() {
            const targetWidth = 50
            const offsetLeft = 41
            const offsetBottom = 36
            const offsetTop = 44
            const width = window.innerWidth * 0.8
            const scale = targetWidth/width
            const x = -(window.innerWidth / 2-offsetLeft)
            const y = window.innerHeight - offsetTop - width / 2 - offsetTop
            return {
                x,
                y,
                scale
            }
        },
        previous() {
            if(!this.songReady){
                return false
            }
            if (this.playerList.length===1) {
                this.loop()
                return false
            }else{
                let index = this.currentIndex - 1
                if(index == -1){
                    index = this.playerList.length-1
                }
                this.setCurrentIndex(index)
                if(!this.playing){
                    this.togglePlaying()
                }
            }
            this.songReady = false
        },
        next() {
            if(!this.songReady){
                return false
            }
            if(this.playerList.length===1){
                this.loop()
                return false
            }else{
                let index = this.currentIndex + 1
                if(index==this.playerList.length){
                    index=0
                }
                this.setCurrentIndex(index)
                if(!this.playing){
                    this.togglePlaying()
                }
            }
            this.songReady = false
        },
        nextTouchStart(e) {
            this.touch.startTime = e.timeStamp || new Date()
            this.timeout = setTimeout(()=>{
                this.timeinter = setInterval(()=>{
                    this.$refs.audio.currentTime +=5
                    if(this.currentLyric) {
                        this.currentLyric.seek(this.$refs.audio.currentTime*1000)
                    }
                },500)
            },160)
        },
        nextTouchEnd(e) {
            this.touch.endTime = e.timeStamp || new Date()
            if (this.touch.endTime - this.touch.startTime < 150) { //click
                clearTimeout(this.timeout)
                clearTimeout(this.timeinter)
                this.next()
            }else{  //touch
                clearInterval(this.timeinter)
            }
        },
        ready() {
            this.songReady = true
            this.savePlayHistory(this.currentSong)
        },
        error() {
            this.songReady = true
        },
        updatetime(e) {
            this.currentTime = e.target.currentTime
        },
        end(e) {
            if(this.mode === playMode.loop){
                this.loop()
            }else{
                this.next()
            }
        },
        loop() {
            this.$refs.audio.currentTime = 0
            this.$nextTick(()=>{
                return this.$refs.audio.play()
            })
            if (this.currentLyric) {
                this.currentLyric.seek(0)
            }
        },
        formatTime(timer) {
            timer = timer | 0
            const m = timer/60 | 0
            const s = timer % 60 >= 10 ? timer % 60 : '0'+ timer % 60
            return `${m}:${s}`
        },
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setMode(mode)
            let list = null
            if(mode === playMode.random) {
                list = shuffle(this.sequenceList)
            }else{
                list = this.sequenceList
            }
            this.resetCurrentIndex(list) //重新设置当前音乐
            this.setPlayerList(list)    //重新设置音乐列表
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item)=>{
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        // 获取歌词
        getLyric() {
            this.currentSong.getLyric().then((lyric)=>{
                if(this.currentSong.lyric !== lyric){
                    return false
                }
                this.currentLyric = new LyricParser(lyric, this.handleLyric)
                if(this.playing&&!this.$refs.audio.paused) {
                    this.currentLyric.play()
                }               
            }).catch(()=>{
                this.currentLyric = null
                this,playingLyricLine = ''
                this.currentLineNum = 0
            })
        },
        // 歌词发生改变时的回调函数
        handleLyric({lineNum, txt}) {
            this.currentLineNum = lineNum
            if(lineNum > 5) {
                let lineEl = this.$refs.lyricLine[lineNum-5]
                this.$refs.lyricList.scrollToElement(lineEl, 1000)
            }else{
                this.$refs.lyricList.scrollToElement(0,0, 1000)
            }
            this.playingLyricLine = txt
        },
        middleTouchStart(e) {
            this.touch.init = true
            const touch = e.touches[0]
            this.touch.startX = touch.pageX
            this.touch.startY = touch.pageY
        },
        middleTouchMove(e) {
            if(!this.touch.init){
                return
            }
            const touch = e.touches[0]
            const deltaX = touch.pageX - this.touch.startX
            const deltaY = touch.pageY - this.touch.startY
            if(Math.abs(deltaY)>Math.abs(deltaX)) return
            const left = this.currentPage === 0 ? 0 : -window.innerWidth 
            const offsetWidth = Math.min(0,Math.max(-window.innerWidth, left+deltaX))
            this.touch.percent = Math.abs(offsetWidth/window.innerWidth)
            this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)` 
            this.$refs.lyricList.$el.style[transitionDuration] = 0+'ms'
            this.$refs.middleLeft.style.opacity = 1 - this.touch.percent
            this.$refs.middleLeft.style[transitionDuration] = 0+'ms'
        },
        middleTouchEnd() {
            let offsetWidth = 0
            let opacity = 0
            if(this.currentPage=== 0) {
                if(this.touch.percent > 0.1) {
                    offsetWidth = '-110%'
                    this.currentPage = 1
                    opacity = 0
                }else{
                    offsetWidth = 0
                    opacity = 1
                }
            }else{
                if(this.touch.percent<0.9) {
                    offsetWidth = 0 
                    this.currentPage = 0
                    opacity = 1
                }else{
                    offsetWidth = '-110%'
                    opacity = 0
                }
            }
            const timer = 300
           this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}, 0, 0)`
           this.$refs.lyricList.$el.style[transitionDuration] = timer+'ms'
           this.$refs.middleLeft.style.opacity = opacity
           this.$refs.middleLeft.style[transitionDuration] = timer+'ms'
        },
        // 关闭播放列表
        cancelPlayList() {
            this.showPlayList = false
        },
        // 展示播放列表
        viewPlayList() {
            this.showPlayList = true
        },
        // 从播放列表选择歌曲时
        selectByPlayList(item, index) {
           this.setCurrentIndex(index) 
           this.setPlayingState(true)
        },
        // 删除列表的歌曲
        deleteItem(index) {
            let currentSong = this.playerList[index]
            this.deleteOneByPlayList(currentSong)
        },
        // 清空列表歌曲
        clearPlayerList() {
            this.showDialog = true
        },
        cancelDiadol() {
            this.showDialog = false
        },
        confirmDiadol() {
            this.showDialog = false
            this.clearPlayList()

        },
        handlePlayerlist() {
            return false
        },
         ...mapMutations({
             'setFullScreen':'SET_PLAYER_FULL_SCREEN',
             'setPlayingState': 'SET_PLAYING_STATE',
             'setCurrentIndex': 'SET_CURRENT_INDEX',
             'setMode' : 'SET_MODE',
             'setPlayerList': 'SET_PLAYER_LIST'
         }),
         ...mapActions([
             'deleteOneByPlayList',
             'clearPlayList',
             'savePlayHistory'
         ])
    },
    created() {
        this.touch = {}
        this.timeout = null,
        this.timeinter = null
    },
    mounted() {        
    },
    computed: {
        playingIcon() {
            return this.playing ? 'pause_circle_outline' : 'play_circle_outline'
        },
        iconMode() {
            return  this.mode === playMode.sequence ? 'repeat' : this.mode === playMode.loop ? 'repeat_one' : 'shuffle'
        },
        cdRotate() {
            return this.playing ? 'runing ' : 'pause '
        },
        disableClass() {
            return this.songReady ? '' : displayClass
        },
        percent() {
            return this.currentTime / this.currentSong.duration
        },
        ...mapGetters([
            'playerFullScreen',
            'playerList',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList'
        ])
    },
    watch: {
        currentSong(newSong, oldSong) {
            if(!newSong.id){
                return
            }
            if(newSong.id === oldSong.id){
                return false
            }
            if(this.currentLyric) {
                this.currentLyric.stop()
            }
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
                this.getLyric()
                this.$refs.audio.play()
            },1000)
        },
        playing(state) {
            this.$nextTick(() => {
                const audio = this.$refs.audio
                if(state){
                    audio.play()
                }else{
                    audio.pause()
                }
            })
        },
    },
    components: {
        ProgressBar,
        ProgressCircle,
        BScroll,
        Playlist,
        MDialog
    }
}
</script>
<style lang='less' scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
.icon-back {
  color: #fff;
}
.player {
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #000;
    box-sizing: border-box;
    padding: @comm-padding;
    .background-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      object-fit: cover;
      -webkit-filter: blur(36px);
      transform: scale(1.1);
      .shadow {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.3);
      }
      img {
        height: 100%;
      }
    }
    .header {
      padding-top: 20px;
      position: relative;
      z-index: 10;
    }
    .middle {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      .middle-left {
        width: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          margin-bottom: 8px;
          color: @color-default;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cd {
          margin-top: 20px;
          width: 70%;
          border-radius: 50%;
          box-sizing: border-box;
          padding: 3px;
          border: 1px solid @background-color-black;
          position: relative;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            &.rotate {
              animation: cd-rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            &.runing {
              animation-play-state: running;
            }
          }
          .circle {
            position: absolute;
            background-color: @background-color-default;
            width: 68px;
            height: 68px;
            box-sizing: border-box;
            padding: 3px;
            border: 1px solid @background-color-black;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            margin-left: -34px;
            margin-top: -34px;
          }
        }
        .lyric-line-wrapper {
          margin-top: 30px;
        }
      }
      .middle-right {
        width: 100%;
        position: absolute;
        // display: flex;
        // justify-content: center;
        left: 110%;
        display: inline-block;
        height: 450px;
        overflow: hidden;
        .lyric-wrapper {
          line-height: 2;
          height: initial;
          .lyric-text {
            color: @color-text-l;
            text-align: center;
            &.active {
              color: @color-default;
            }
          }
        }
      }
    }
    .footer {
      position: fixed;
      z-index: 10;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 150px;
      box-sizing: border-box;
      padding: @comm-padding;
      .time {
        margin-top: 10px;
        display: flex;
        color: @color-default;
        justify-content: space-between;
      }
      .contral {
        box-sizing: border-box;
        margin-top: 18px;
        color: @color-default;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        .contral-middle {
          display: flex;
          align-items: center;
        }
        i {
          width: 32px;
          height: 32px;
          font-size: 32px;
        }
      }
    }
  }
  .normal-enter-active,
  .normal-leave-active {
    transition: all 0.4s;
    .header,
    .footer {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }

  .normal-enter,
  .normal-leave-to {
    opacity: 0;
    .header {
      transform: translate3d(0, -100px, 0);
    }

    .footer {
      transform: translate3d(0, 100px, 0);
    }
  }

  .mini-player-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    box-sizing: border-box;
    padding: @comm-padding;
    left: 0;
    bottom: 0;
    z-index: 1800;
    width: 100%;
    height: 72px;
    background-color: @background-color-default;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.3);
    .mini-con-left {
      display: flex;
      align-items: center;
      .mini-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        padding: 2px;
        // border: 1px solid #000;
        border-radius: 50%;
        &.rotate {
          animation: cd-rotate 20s linear infinite;
        }
        &.runing {
          animation-play-state: running;
        }
        &.pause {
          animation-play-state: paused;
        }
        img {
          border-radius: 50%;
        }
      }
      .mini-message {
        margin-left: 10px;
        line-height: 1.4;
        .title {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .mini-con-right {
      display: flex;
      flex-basis: 50%;
      justify-content: space-between;
      i {
        width: 40px;
        height: 40px;
        font-size: 40px;
      }
    }
  }
  .mini-enter-active,
  .mini-leave-active {
    transition: all 0.4s;
  }

  .mini-enter,
  .mini-leave-to {
    opacity: 0;
  }
}
@keyframes cd-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


