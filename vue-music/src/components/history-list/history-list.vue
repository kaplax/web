<template>
  <div class="search-history">
    <div class="search-history-header">
        <h3>搜索历史</h3>
        <p @click="clear">全部清空</p>
    </div>
    <ul class="search-list">
        <li class="search-item" 
            v-for="(item, index) in data" :key="index"
            >
            <div class="left" >{{index+1}}.</div>
            <div class="right" @click.stop="selectHistory(item)">
                <div>
                    <p >{{item}}</p>
                </div>
                <i class="icon" @click.stop.prevent="deleteHistory(item)">close</i>
            </div>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
    props:{
        data: {
            type: Array,
            default: ()=>{return []}
        }
    },
    methods: {
        selectHistory(item){
            this.$emit('selectHistory', item)
        },
        deleteHistory(item) {
            this.$emit('deleteHistory', item)
        },
        clear() {
            this.$emit('clear')
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
.icon {
  margin: initial;
}
@vertical-padding-bottom: 16px;
.search-history {
  .search-history-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .search-list {
    .search-item {
      align-items: center;
      margin-top: 16px;
      .left {
        padding-bottom: @vertical-padding-bottom;
        margin-right: 15px;
        color: @color-primary;
        float: left;
        line-height: 26px;
      }
      .right {
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @color-accent;
        padding-bottom: @vertical-padding-bottom;
        div > p:first-child {
          font-size: @font-size-medium-x;
          color: @color-primary;
        }
      }
    }
  }
}
</style>

