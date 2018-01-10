<template>
    <b-scroll class="suggest-container" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest" :beforeScroll="beforeScroll" @beforeScroll="listScroll"> 
        <ul class="suggest-list">
            <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="searchItem(item)">
                <i class="icon" v-html="getIcon(item)"></i>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" :showTitle="false"></loading>
        </ul>
        <div class="no-result" v-show="!hasMore && !result.length">
            <p >抱歉,暂无搜索结果</p>
        </div>
    </b-scroll>
</template>
<script>
import BScroll from '@/base/scroll/bScroll'
import {search} from '@/api/search'
import {ERR_OK} from '@/api/config'
import Loading from '@/base/loading/loading'
import {filterSinger} from '@/common/js/song'
import {createSong} from '@/common/js/songBySinger'
import {getUrl} from '@/api/song'
import Singer from '@/common/js/singer'
import {mapMutations,mapActions} from 'vuex'
const TYPE_SINGER = 'singer'
const PERPAGE = 20
export default {
  props: {
      query: {
          type: String,
          default: ''
      },
      showSinger: {
          type: Boolean,
          default: true
      }
  },
  data() {
      return {
          page: 1,
          result: [],
          pullup: true,
          hasMore: true,
          beforeScroll: true
      }
  },
  methods: {
      search() {
          this.page = 1
          this.hasMore = true
          this.$refs.suggest.scrollTo(0,0)
          search(this.query, this.page, this.showSinger, PERPAGE).then(res=>{
              if(res.code===ERR_OK){
                  this.result = this.__getResult(res.data)
                  this.__checkMore(res.data)
              }
          })
      },
      searchMore() {
          if(!this.hasMore){
              return 
          }
          this.page++
          search(this.query, this.page, this.showSinger, PERPAGE).then(res=>{
              if(res.code===ERR_OK){
                  this.result = this.result.concat(this.__getResult(res.data)) 
                  this.__checkMore(res.data)
              }
          })
      },
      getIcon(item) {
        return item.type == TYPE_SINGER ? 'person' : 'music_note'
      },
      getDisplayName(item){
          if(item.type===TYPE_SINGER){
              return item.singername
          }else{
              return `${item.songname}-${filterSinger(item.singer)}`
          }
      },
      searchItem(item) {
          if(item.type===TYPE_SINGER){
              const singer = new Singer({
                  id: item.singermid,
                  name: item.singername
              })
              this.$router.push({
                  path: `/search/${singer.id}`
              })
              this.setSinger(singer)
          }else{
              getUrl(item.songmid).then(res=>{
                  item.url = res
                  this.insertSong(createSong(item))
              })
          }
          this.$emit('select')
      },
      listScroll() {
          this.$emit('listScroll')
      },
      refresh() {
          this.$refs.suggest.refresh()
      },
      __getResult(data) {
          let ret = []
          if(data.zhida && data.zhida.singerid) {
              ret.push({...data.zhida,...{type: TYPE_SINGER}})
          }
          if(data.song) {
              ret = ret.concat(data.song.list)
          }
          return ret
      },
      __checkMore(data) {
          const song = data.song
          if(!song.list.length || (song.curnum+song.curpage*PERPAGE)>=song.totalnum){
              return this.hasMore = false
          }
      },
      ...mapMutations({
            'setSinger': 'SET_SINGER'
      }),
      ...mapActions([
          'insertSong'
      ])
      
  },
  watch: {
      query() {
          this.search()
      }
  },
  components: {
      BScroll,
      Loading
  }
}
</script>
<style lang="less" scoped>
@import '~@/common/less/variable';
@import '~@/common/less/minix';
.icon{
    margin: initial;
}
.suggest-container{
    box-sizing:border-box;
    padding: @comm-padding;
    height: 100%;
    overflow: hidden;
    .suggest-list{
        line-height: 2;
        .suggest-item{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            .name{
                margin-left: 5px;
            }
        }
        .suggest-item:first-child{
            padding-top: 20px;
        }
        .suggest-item:last-child{
            margin-bottom: 20px;
        }
    }
}
.no-result{
    width: 100%;
    text-align: center;
    margin-top: 40%;
}
</style>
