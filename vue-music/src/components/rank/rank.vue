<template>
  <div class="rank" ref="rank">
    <h2>排行榜</h2>
      <div 
        class="toplist" 
        ref="toplist">
        <ul 
          v-for="(item, index) in topList"
          :key="index">
          <li class="item" @click="selectTop(item)">
            <div class="left">
              <img v-lazy="item.picUrl" alt="">
            </div>           
            <ul class="right" >
              <li v-for="(song, songIndex) in item.songList" :key="songIndex">
                {{songIndex+1}}.{{song.singername}}
              </li>              
            </ul>            
          </li>
        </ul>
      </div>
      <div v-if="!topList.length" class="loading-container">
        <loading ></loading>
      </div>
      <router-view></router-view>
  </div>
</template>
<script>
import {getTopList} from '@/api/rank'
import {ERR_OK} from '@/api/config'
import Loading from '@/base/loading/loading'
import {mapGetters,mapMutations} from 'vuex'
import {playerlistMixin} from '@/common/js/mixin'
export default {
  mixins:[playerlistMixin],
  data() {
    return {
      topList:[]
    }
  },
  methods: {
    handlePlayerlist(playerList){
      const bottom = playerList.length > 0 ? '72px' : ''
      this.$refs.rank.style.marginBottom=bottom
    },
    selectTop(item) {
      this.setTopId(item)
      this.$router.push('/rank/'+item.id)
    },
    __getTopList() {
      getTopList().then(res=>{
        if(res.code===ERR_OK){
            this.topList = res.data.topList
        }
      })
    },
    ...mapMutations({
      'setTopId': 'SET_TOP_ID'
    })
  },
  created() {
    this.__getTopList()
  },
  components: {
    Loading
  } 
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
.rank {
  position: relative;
  box-sizing:border-box;
  h2{
    box-sizing:border-box;
    padding: @comm-padding;
  }
  .toplist {
    box-sizing: border-box;
    padding:@comm-padding;
    .item {
      display: flex;
      align-items: center;
      margin-top: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .left {
        margin-right: 16px;
        img {
          width: 72px;
          height: 72px;
        }
      }
      .right {
        line-height: 1.5;
      }
    }
  }
}
.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>


