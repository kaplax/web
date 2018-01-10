<template>
  <div class="container">
    <div class="song-menu-container">
      <scroll>
        <div class="hot-type">
          <h3 class="type-title">热门分类</h3>
          <music-type 
            :showTitle=false
            :typeDataList="typeDataList"
            @clickType="getListOnTyope">
          </music-type> 
        </div>
        <div class="music-container">
          <div class="hot-music-header">
            <div class="left" v-html="typeTitle"></div>
            <div class="right">更多</div>
          </div>
          <div class="music-menu-list">
            <div 
              class="music-menu-item" 
              v-for="(item, index) in musicMenuList" 
              :key="index"
              :dissid="item.dissid"
              @click="selectMusic(index,item.dissid)" >
              <div class="music-menu-item-img">
                <img v-lazy="item.imgurl" alt="">
                <div><i class="icon icon-small">headset</i><span v-html="item.listennum"></span></div>
              </div>
              <div v-html="item.dissname" class="dissname"></div>
            </div>
          </div>
          <div class="loading-container" v-if="!musicMenuList.length">
            <loading></loading>
          </div>
        </div>
      </scroll>
    </div>
    <transition name="slide">
        <router-view></router-view>
    </transition>
  </div> 
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import MusicType from '@/components/music-type/music-type'
import {mapMutations} from 'vuex'
import {getType,getMusicMenuList} from '@/api/song-menu'
import {getDiscList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
import Loading from '@/base/loading/loading'
export default {
  data() {
    return {
      typeDataList:[
        {
          categoryName: '全部'
        },
        {
          categoryName: '流行',
          categoryId:6
        },
        {
          categoryName: '华语',
          categoryId:165
        },
        {
          categoryName: '摇滚',
          categoryId:11
        },
        {
          categoryName: '民谣',
          categoryId:28
        },
        {
          categoryName: '轻音乐',
          categoryId:15
        },
        {
          categoryName: 'ACG',
          categoryId:39
        },
        {
          categoryName: '经典',
          categoryId:136
        },
        {
          categoryName: '治愈',
          categoryId:116
        },
        {
          categoryName: '欧美',
          categoryId:167
        },
        {
          categoryName: '伤感',
          categoryId:52
        },
        {
          categoryName: 'R&B',
          categoryId:8
        },
        
      ],
      musicMenuList:[],
      typeTitle: '推荐歌单'
    }
  },
  methods:{
      getListOnTyope(data, typeTitle) {
        getDiscList(data).then(res=>{
          this.musicMenuList = res.data.list
          this.typeTitle = typeTitle
        })
      },
      selectMusic(index, id) {
        this.setMusicMenuId(this.musicMenuList[index])
        this.$router.push({
          path: `/songMenu/${id}`
        })
      },
      __getTypeList() {
        getType().then(res=>{
            // this.typeDataList = res.data.categories
        })
      },
      __getMusicMenuList() {
        getMusicMenuList().then(res=>{
          if (res.code === ERR_OK) {
            this.musicMenuList = res.data.list
          }
        })
      },
      ...mapMutations({
        'setMusicMenuId':'SET_MUSIC_MENU'
      }) 

  },
  created() {
    // this.__getTypeList()
    this.__getMusicMenuList()
  },
  components: {
    MusicType,
    Scroll,
    Loading
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
.container {
  .song-menu-container {
    padding: @gird-padding;
    margin-top: 48px;
    position: fixed;
    top: 0;
    bottom: 0;
  }
}
.hot-type {
  margin-top: 36px;
  .type-title {
    color: @color-text-l;
    padding: 0 4px;
    font-size: @font-size-medium-x;
  }
}
.music-container {
  margin-top: 32px;
  .hot-music-header {
    padding: 0 4px;
    display: flex;
    justify-content: space-between;
    div.left {
      font-size: @font-size-medium-x;
      color: @color-primary;
    }
    div.right {
      font-size: @font-size-medium;
    }
  }
  .music-menu-list {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 1;
    .music-menu-item {
      box-sizing: border-box;
      margin-top: 10px;
      width: 33.333%;
      font-size: @font-size-small;
      padding: 0 4px;
      .music-menu-item-img {
        position: relative;
      }
      .dissname {
        height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>

