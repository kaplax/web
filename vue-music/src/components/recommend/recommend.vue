<template>
  <div class="recommend">
    <scroll>
      <carousel :data="recommend"></carousel>
      <!-- <div class="randrom-music" @click="randromPlay"></div> -->
      <div style="margin-top:20px;">
        <MusicList></MusicList>
      </div>
      
    </scroll>
  </div>
</template>
<script>
import Carousel from '@/base/carousel/carousel'
import Scroll from '@/base/scroll/scroll'
import MusicList from '@/components/music-list/music-list'
import {getRecommend} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
export default {
    data() {
      return {
        recommend:[]
      }
    },
    methods: {
      randromPlay() {

      },
      __getRecommend() {
        getRecommend().then(res=>{
          if(ERR_OK===res.code){
            this.recommend = res.data.slider
          }
        })
      }
    },
    mounted() {
      this.__getRecommend()
    },
    components: {
      Carousel,
      Scroll,
      MusicList
    }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
.randrom-music {
  width: 80%;
  height: 72px;
  box-sizing: border-box;
  border: 1px solid @color-primary;
  margin: 0 auto;
  padding: 3px;
  margin-top: 16px;
  margin-bottom: 24px;
}
.recommend {
  position: fixed;
  top: 48px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

</style>


