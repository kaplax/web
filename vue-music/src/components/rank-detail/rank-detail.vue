<template>
  <div class="singer-detail-container">
      <div class="detail-header" ref="banner">
        <div class="album">
          <div class="album-media">
            <div class="js-album-media">
              <i class="icon icon-white" @click="backToPrev">keyboard_backspace</i>
              <i class="icon icon-white">favorite</i>
            </div>
            <div class="album-info">
              <img v-lazy="topId.picUrl" alt="">
              <!-- <p class="name">{{singer.name}}</p> -->
            </div>
          </div>
          <img class="blur-img" :src="topId.picUrl" alt="">
        </div>
      </div>
      <div class="bg-layer" ref="bgLayer"></div>
      <b-scroll :data="songList" ref="list" class="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
          <div class="song-list-wrapper">
              <list-view :data="songList" @select="selectItem">
                <div class="js-list-header" @click="playAll">
                    <i class="icon">play_circle_outline</i>
                    <span class="play-all-text">播放全部</span>
                    <span class="music-num">({{songList.length}})</span>
                </div>
              </list-view>
          </div>
          <div  v-if="!songList.length" class="loading-container">
            <loading></loading>
          </div>
      </b-scroll>
  </div>
</template>
<script>
import BScroll from '@/base/scroll/bScroll'
import ListView from '@/base/list-view/list-view'
import Loading from '@/base/loading/loading'
import {mapGetters,mapActions} from 'vuex'
import {getSongByTop} from '@/api/rank'
import {ERR_OK} from '@/api/config'
import {getUrl} from '@/api/song'
import {createSong} from '@/common/js/songByRank'
import {prefixStyle} from '@/common/js/dom'
import {playerlistMixin} from '@/common/js/mixin'
const transfrom = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
const RESERVED_HEIGHT = 55
const BANNER_HEIGHT = 180
export default {
  mixins:[playerlistMixin],
  data() {
      return {
          songList:[],
          scrollY: -1
      }
  },
  methods: {
      backToPrev() {
          this.$router.push('/rank')
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      selectItem(item, index) {
        document.querySelector('audio').play()
        this.selectPlayer({
          list: this.songList,
          index
        })
      },
      playAll() {
        this.randomPlay({
          list: this.songList,
          index: 0
        })
      },
      handlePlayerlist(playerList){
        const bottom = playerList.length > 0 ? '72px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      __getRankDetail() {
          if(!this.topId.id){
            return  this.$router.push('/rank')
          }
          getSongByTop(this.topId.id).then(res=>{
              if(ERR_OK===res.code){
                  this.songList = this.__normalizeSongs(res.songlist)
              }
          })
      },
      __normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          ((item)=>{
            let musicData = item.data
            if (musicData.songid && musicData.albummid) {
              getUrl(musicData.songmid).then((res)=>{
                musicData.url = res
                ret.push(createSong(musicData))
              })              
            }
          })(item)
          
        })
        return ret
      },
      ...mapActions([
        'selectPlayer',
        'randomPlay'
      ])
  },
  created() {
      this.__getRankDetail()   
      this.probeType = 3
      this.listenScroll = true
  },
  mounted() {
    this.minTranslateY = -BANNER_HEIGHT + RESERVED_HEIGHT
  },
  computed: {
    ...mapGetters([
        'topId'
    ])
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
      BScroll,
      ListView,
      Loading
  }
  
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
@header-height: 180px;
@vertical-padding-bottom: 16px;
.icon {
  margin: initial;
}
.bg-layer {
  position: relative;
  height: 100%;
  background: #fff;
}
.singer-detail-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @background-color-default;
  z-index: 1000;
  .detail-header {
    position: relative;
    height: @header-height;
    background-color: @background-color-black;
    overflow: hidden;
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .album-message {
            margin-left: 16px;
          }
          img {
            width: 72px;
            border-radius: 50%;
            margin-bottom: 12px;
          }
          .name {
            font-size: @font-size-large;
            color: @color-default;
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
        height: 100%;
        object-fit: cover;
        -webkit-filter: blur(36px);
      }
    }
  }
  .detail-header:after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    content: "";
  }
}
.list {
  position: fixed;
  top: @header-height;
  bottom: 0;
  width: 100%;
  background: @background-color-default;
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
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
</style>



