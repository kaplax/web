<template>
  <div class="search-container">
      <nav class="search-header">
        <search ref="searchBox" @cancel="cancel" @query="onQueryChange"></search>
      </nav>
      <div class="hot-tab-container" v-show="!query">
        <h3 style="padding:0 2px;">热门搜索</h3>
        <div>
          <div class="row">
            <div 
                class="col" 
                v-for="(item, index) in hotKey" 
                :key="index"
                @click="addQuery(item.k, index)" 
            >
                <span v-html="item.k"></span>
            </div>
        </div>  
        </div>
      </div>
      <div class="search-result" v-show="query"> 
        <suggest ref="suggest" :query="query" @listScroll="blurInput" @select="saveSearch"></suggest>
      </div>
      <div class="history-container" v-show="searchHistory.length" ref="list">
        <historyList 
          :data="searchHistory"
          @selectHistory="selectHistory" 
          @deleteHistory="deleteHistory" 
          @clear="clearAll">
        </historyList>
      </div>
      <m-dialog 
        v-if="showDialog" 
        title="是否清空所有搜索历史" 
        cancelText="取消" 
        confirmText="确认" 
        @cancel="cancelDiadol"
        @confirm="confirm"
        >
      </m-dialog> 
      <router-view></router-view>
  </div>
</template>
<script>
import Search from '@/base/search/search'
import HistoryList from '@/components/history-list/history-list'
import MDialog from '@/base/dialog/dialog'
import {LAYOUT_BOTTOM} from '@/common/js/config'
// import scroll from '@/base/scroll/scroll'
import {getHotSearch} from '@/api/search'
import Suggest from '@/components/suggest/suggest'
import {playerlistMixin} from '@/common/js/mixin'
import {ERR_OK} from '@/api/config'
import {mapGetters, mapActions} from 'vuex'
export default {
  mixins: [playerlistMixin],
  data() {
    return {
      hotKey: [],
      query: '',
      showDialog: false
    }
  },
  methods: {
    addQuery(query, index) {
      this.$refs.searchBox.setQuery(query)
    },
    cancel() {
      this.$router.back()
    },
    cancelDiadol() {
      this.showDialog = false
    },
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    selectHistory(query) {
      this.addQuery(query)
    },
    deleteHistory(query) {
      this.deleteHistoryOne(query)
    },
    clearAll() {
      this.showDialog = true
    },
    confirm() {
      this.showDialog = false
      this.clearHistory()
    },
    handlePlayerlist(){
      const bottom = this.playerList.length > 0 ? LAYOUT_BOTTOM : ''
      const height = this.playerList.length > 0 ? '87%' : '100%'
      this.$refs.list.style.paddingBottom = bottom
      this.$refs.suggest.$el.style.height = height
      this.$refs.suggest.refresh()
    },
    __getHotSearch() {
      getHotSearch().then(res=>{
        if(res.code===ERR_OK){
          this.hotKey = res.data.hotkey.slice(0,10)
        }
      })
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteHistoryOne',
      'clearHistory'
    ])
  },
  created() {
    this.__getHotSearch()
  },
  computed: {
    ...mapGetters([
      'searchHistory',
    ])
  },
  components: {
    Search,
    Suggest,
    HistoryList,
    MDialog,
    
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";

.search-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: @background-color-default;
  z-index: 1000;
}
.search-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.14),
    0 3px 3px -2px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  z-index: 20;
  background-color: @background-color-default;
}
.hot-tab-container {
  position: fixed;
  top: 80px;
  width: 100%;
  box-sizing: border-box;
  padding: @gird-padding;
}
.row {
  width: 100%;
  display: flex;
  flex-shrink: 1;
  flex-wrap: wrap;
  margin-top: 10px;
  .col {
    box-sizing: border-box;
    padding: 0 4px;
    width: 25%;
    position: relative;
    height: @grid-height;
    text-align: center;
    line-height: @grid-height;
    margin-top: 8px;
    color: @color-text-a;
    font-size: @font-size-medium;
    span {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }
  }
  .col:before {
    width: 100%;
    height: 100%;
    margin-bottom: -@grid-height;
    height: inherit;
    display: block;
    pointer-events: none;
    background-color: @background-color-accent;
    content: "";
  }
  .col.active {
    color: @color-default;
  }
  .col.active:before {
    background-color: @background-color-black;
  }
}
.search-result {
  position: fixed;
  width: 100%;
  bottom: 0;
  top: 56px;
  z-index: 10;
  background: #fff;
}
.history-container {
  position: fixed;
  width: 100%;
  top: 270px;
  padding: @comm-padding;
  box-sizing: border-box;
  bottom: 0;
  overflow: auto;
}

</style>


