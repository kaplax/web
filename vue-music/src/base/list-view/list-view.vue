<template>
    <div>
        <slot></slot>
        <ul class="list-container">
            <li class="list-item" 
                v-for="(item, index) in data" 
                :key="index"
                @click="selectItem(item, index)">
                <div class="left" v-html="index+1"></div>
                <div class="right">
                    <div>
                        <p v-html="item.name"></p>
                        <p v-html="item.singerName"></p>
                    </div>
                    <i class="icon" @click.stop="toggleFavorite(item)" :class="getFavoriteIcon(item)" v-html="iconType"></i>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import BScroll from '@/base/scroll/bScroll'
import {createSong} from '@/common/js/song'
import {playerlistMixin} from '@/common/js/mixin'
export default {
    mixins:[playerlistMixin],
    props:{
        iconType:{
            type: String,
            default:'favorite'
        },
        data:{
            type: Array,
            default:()=>{return []}
        }
    },
    data() {
        return {}
    },
    methods: {
        selectItem(song, index) {
            this.$emit('select',song, index)
        },
        handlePlayerlist() {
            return false
        }
    },
    components: {
      BScroll
    }
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
@import "~@/common/less/minix";
@vertical-padding-bottom:16px;
.icon{
    margin: initial;
}
.list-container {
  padding: 16px;
  padding-top: 0;
  .list-item {
    align-items: center;
    margin-top: 16px;
    .left {
        padding-bottom: @vertical-padding-bottom;
        margin-right:15px;
        color:@color-primary;
        float: left;
        line-height: 34px;
    }
    .right {
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @color-accent;
        padding-bottom: @vertical-padding-bottom;
        div>p:first-child{
            font-size:@font-size-medium-x;
            color:@color-primary;
            margin-bottom: 8px;
        }
        div>p:last-child{
            font-size:@font-size-small;
            color:@color-text-a;
        }
        
    }
  }
}
</style>


