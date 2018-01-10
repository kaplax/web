<template>
      <div>
        <div class="title" v-if="showTitle">{{typeDataList.categoryGroupName}}</div>
        <div class="row">
            <div 
                class="col" 
                v-for="(item, index) in typeDataList" 
                :key="index" 
                @click="clickToggle(index, item.categoryId, item.categoryName)" 
                :class="{active:changed==index}"
                :categoryId="item.categoryId"
            >
                <span v-html="item.categoryName"></span>
            </div>
        </div>  
      </div>
</template>
<script>
import {getDiscList} from '@/api/recommend'
export default {
  data() {
      return {
          changed: NaN
      }
  },
  props:{
      typeDataList:{
          type:Array,
          default:[]
      },
      showTitle:{
          type: Boolean,
          default:true
      }
  },
  methods: {
      clickToggle(index,categoryId, categoryName) {
          this.changed = index
          this.$emit('clickType', categoryId, categoryName)
      }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@grid-height: 40px;
.type-title,.title {
  color: @color-text-l;
  padding:0 4px;
  font-size:@font-size-medium-x;
}
.title{
    border: 1px dashed #999;
    padding: 0;
    margin: 0 4px;
    text-align: center;
    height: @grid-height;
    line-height: @grid-height;  
    margin-top: 16px;
}
.row {
    width: 100%;
    display: flex;
    flex-shrink: 1;
    flex-wrap: wrap;
    .col {
        box-sizing: border-box;
        padding: 0 4px;
        width: 25%;
        position: relative;
        height: @grid-height;
        text-align: center;
        line-height: @grid-height;
        margin-top: 8px;
        color:@color-text-a;
        font-size:@font-size-medium;
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
    .col.active{
        color:@color-default;
    }
    .col.active:before{
        background-color: @background-color-black;
    }
    
}
</style>

