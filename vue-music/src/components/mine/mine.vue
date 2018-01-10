<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="backTo">
        <i class="icon">keyboard_backspace</i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon">play_circle_outline</i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <b-scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <list-view :data="favoriteList" @select="selectSong"></list-view>
          </div>
        </b-scroll>
        <b-scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <list-view :data="playHistory" @select="selectSong"></list-view>
          </div>
        </b-scroll>
      </div>
      <div class="no-result-wrapper" >
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from '@/base/switches/switches'
import BScroll from '@/base/scroll/bScroll'
import ListView from '@/base/list-view/list-view'
import SingerSong from '@/common/js/songBySinger'
import {mapGetters,mapActions} from 'vuex'
import {playerlistMixin} from '@/common/js/mixin'
  export default {
    mixins:[playerlistMixin],
    data() {
      return {
        currentIndex: 0,
        switches: [
          {
            name: '我喜欢的'
          },
          {
            name: '最近听的'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'favoriteList',
        'playHistory'
      ])
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
      },
      selectSong(song) {
        this.insertSong(new SingerSong(song))
      },
      backTo() {
        this.$router.back()
      },
      random() {
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
        list = list.map((song)=>{
          return new SingerSong(song)
        })
        this.randomPlay({
          list
        })
      },
      handlePlayerlist(){
        const bottom = this.playerList.length > 0 ? '72px' : ''
        this.$refs.listWrapper.style.bottom = bottom
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
        this.$refs.playlist && this.$refs.playlist.refresh()
      },
      ...mapActions([
        'insertSong',
        'randomPlay'
      ])
    },
    components: {
      Switches,
      BScroll,
      ListView
    }
  }
</script>

<style scoped lang="less">
@import "~@/common/less/variable";
@import "~@/common/less/minix";
.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: @background-color-default;
  z-index: 1000;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      // font-size: @font-size-large-x;
      color: #fff;
    }
  }

  .switches-wrapper {
    margin: 10px 0 30px 0;
  }

  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 5px 10px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid @color-text-l;
    color: @color-text-l;
    border-radius: 100px;
    font-size: 0;

    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: @font-size-medium-x;
    }

    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: @font-size-small;
    }
  }

  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;

    .list-scroll {
      height: 100%;
      overflow: hidden;
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>