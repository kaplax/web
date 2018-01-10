<template>
  <div class="music-list-container" ref="musicListContainer">
      <div class="music-header">
          <div class="header-name">新歌首发</div>
          <!-- <div class="header-more">更多</div> -->
      </div>
      <div class="music-contet">
          <div 
            class="music-item" 
            v-for="(item, index) in songList"
            :key="index"
            @click="select(index,item.id)">
              <div style="display:flex">
                  <div class="music-img">
                  <img v-lazy="item.image" alt="">
                </div>
                <div class="music-text">
                    <p class="music-name" v-html="item.name.trim()"></p>
                    <span class="music-author" v-html="item.singer[0].name"></span>
                </div>
              </div>
              <div @click="favoriteToggle">
                  <i class="icon-favorite_normal icon" :class="favorite ? 'icon-favorite-active' : ''">favorite</i>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import {getRecommend,getMusicList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
import {mapActions} from 'vuex'
import {getSongs} from '@/common/js/song'
import {playerlistMixin} from '@/common/js/mixin'
export default {
  mixins:[playerlistMixin],
  props:{
      musicList:Array,
      defalut:()=>{return []}
  },
  data(){
      return {
          favorite: false,
          recommends: [],
          songList: []
      }
  },
  methods: {
      favoriteToggle(e) {
          e.stopPropagation;
          this.favorite=!this.favorite
      },
      select(index) {
        this.selectPlayer({
          list: this.songList,
          index
        })
      },
      handlePlayerlist(){
        const bottom = this.playerList.length > 0 ? '72px' : ''
        this.$refs.musicListContainer.style.paddingBottom = bottom
      },
      __getRecommend() {
          getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      __getDiscList() {
        getMusicList().then(res=>{
          if(res.code === ERR_OK) {
            this.songList = this.__normalizeSongs(res.new_song.data.song_list)
            // this.randomPlay(this.songList)
          }
        })
      },
      //标准化歌单数据
      __normalizeSongs(musicData) {
        // console.log(musicData)
          return getSongs(musicData)
      },
      ...mapActions([
        'selectPlayer',
        'randomPlay'
      ])
  },
  created() {
      this.__getRecommend()
      this.__getDiscList()
      
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
.music-list-container {
  padding: 0 16px;
  box-sizing: border-box;
  .music-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-name {
      color: @color-primary;
    }
    .header-more {
      color: @color-text-d;
      font-size: @font-size-small;
    }
  }
  .music-contet {
    .music-item {
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .music-img {
        width: 48px;
        margin-right: 12px;
        img {
          border-radius: 50%;
        }
      }
      .music-text {
        // line-height: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .music-name {
          color: @color-primary;
          font-size: @font-size-medium-x;
        }
        .music-author {
          color: @color-text-d;
          font-size: @font-size-medium;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
        }
      }
    }
  }
}
</style>

