<template>
  <div class="container">
      <div class="music-menu-banner" ref="banner">
        <div class="album">
          <div class="album-media">
            <div class="js-album-media">
              <i class="icon icon-white" @click="backToPrev">keyboard_backspace</i>
              <i class="icon icon-white">favorite</i>
            </div>
            <div class="album-info">
              <img :src="songList.image" alt="">
              <div class="album-message">
                <p class="music-message" v-html="songList.dissname"></p>
                <span class="music-tab" v-html="songList.tags"></span>
              </div>
            </div>
          </div>
          <img class="blur-img" :src="songList.image" alt="">
        </div>
      </div>
      <div class="bg-layer" ref="bgLayer"></div>
      <b-scroll :data="songList.songs" class="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
        <div class="song-list-wrapper" >
          <list-view 
            icon-type="favorite" 
            :data="songList.songs"
            @select="selectItem">
            <div class="js-list-header">
                <i class="icon">play_circle_outline</i>
                <span class="play-all-text">播放全部</span>
                <span class="music-num">({{songsNum}})</span>
            </div>
          </list-view>
        </div>
      </b-scroll>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {getMusicMenuDetail} from '@/api/song-menu-detail'
import listView from '@/base/list-view/list-view'
import {createSong} from '@/common/js/song'
import {ERR_OK} from '@/api/config'
import BScroll from '@/base/scroll/bScroll'
import {prefixStyle} from '@/common/js/dom'
const RESERVED_HEIGHT = 55
const BANNER_HEIGHT = 180
const transfrom = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
export default {
  computed: {
    ...mapGetters(
      [
        'musicMenu'
      ]
    )
  },
  data() {
    return {
      songList:[],
      scrollY: 0,
      songsNum: null
    }
  },
  methods: {
    //返回上一页
    backToPrev() {
      this.$router.push('/songMenu')
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    selectItem(item, index) {
      this.selectPlayer({
        list: this.songList.songs,
        index
      })
    },
    //获取歌单详情
    __getMusicMenuDetail() {
      if(!this.musicMenu.dissid){
        return this.$router.push('/songMenu')
      }
      getMusicMenuDetail(this.musicMenu.dissid).then(res=>{
        if (res.code === ERR_OK) {
            this.songList = this.__normalizeSongs(res.cdlist[0])
            this.songsNum = this.songList.songs.length
        }
      })
    },
    //标准化歌单数据
    __normalizeSongs(musicData) {
        if (musicData.pic_mid && musicData.disstid) {
            return createSong(musicData)
        }
    },
    ...mapActions([
      'selectPlayer'
    ])
  },
  mounted() {
    this.minTranslateY = -BANNER_HEIGHT + RESERVED_HEIGHT
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.__getMusicMenuDetail()
  },
  watch: {
    scrollY: function(newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      const percent = Math.abs(newY / BANNER_HEIGHT)
      if (translateY < this.minTranslateY) return false
      this.$refs.bgLayer.style[transfrom] = `translate3d(0,${translateY}px,0)`
      if (newY > 0) {
        scale = 1 + percent/10
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20)
      }
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.banner.style.height = `${RESERVED_HEIGHT}px`
      }else{
        this.$refs.banner.style.height = BANNER_HEIGHT+'px'
      }
      this.$refs.banner.style.zIndex = zIndex
      this.$refs.banner.style[transfrom] = `scale(${scale})`
    }
  },
  components: {
    listView,
    BScroll
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/minix";
@import "~@/common/less/variable";
@music-menu-bannerHeight: 180px;
.container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: @background-color-default;
  z-index: 999;
  .music-menu-banner {
    position: relative;
    height: @music-menu-bannerHeight;
    overflow: hidden;
    background-color: @background-color-black;
    .album {
      color: @color-default;
      height: 100%;
      width: 100%;
      .album-media {
        box-sizing: border-box;
        padding: 16px;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        .album-info {
          width: 100%;
          margin-top: 20px;
          display: flex;
          align-items: center;
          .album-message {
            margin-left: 16px;
          }
          img {
            width: 96px;
          }
          .music-message {
            font-size: @font-size-large;
          }
          .music-tab {
            display: inline-block;
            margin-top: 8px;
            font-size: @font-size-medium;
          }
        }
        .js-album-media {
          display: flex;
          justify-content: space-between;
          i {
            margin: initial;
          }
        }
      }
      .blur-img {
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        -webkit-filter: blur(36px);
      }
    }
  }
  .music-menu-banner:after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    content: "";
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: #fff;
  }
  .list {
    position: fixed;
    top: 180px;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 3;
  }
  .js-list-header {
    margin: 24px 0px;
    padding: 0 6px;
    .play-all-text {
      font-size: @font-size-medium-x;
      color: @color-primary;
    }
    .music-num {
      font-size: @font-size-medium;
    }
  }
}
</style>


