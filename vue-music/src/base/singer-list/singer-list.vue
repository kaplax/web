<template>
    <b-scroll class="listview" 
            ref="listview" 
            :data="data"
            :listenScroll="listenScroll"
            @scroll="scroll"
            :probeType="probeType">
            <ul>
                <li v-for="(group, index) in data" :key="index" class="type-gruop" ref="typeGruop">
                    <h2 class="type-title">{{group.title}}</h2>
                    <ul class="singer-group">
                        <li 
                            v-for="(item, index) in group.items" 
                            :key="index"
                            class="singer-item"
                            @click="selectSiner(item)">
                            <img class="avatar-img" v-lazy="item.avatar" alt="">
                            <span class="name">{{item.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div 
                class="list-chortcut" 
                @touchstart="onShortcutTouchStart" 
                @touchmove.stop.prevent="onShortcutTouchMove">
                <ul>
                    <li 
                        v-for="(item, index) in shortcutList" 
                        :key="index" 
                        class="shortcut-item" 
                        :data-index="index"
                        :class="{'active': currentIndex==index}"
                        >
                        {{item}}
                    </li>
                </ul>
            </div>
            <div class="list-fixed"
                 v-show="fixedTitle" 
                 ref="fixed" >
                <h2 class="fixed-title">{{fixedTitle}}</h2>
            </div>
            <div v-if="!data.length" class="loading-container">
                <loading></loading>
            </div>
    </b-scroll>
</template>
<script>
import BScroll from '@/base/scroll/bScroll'
import {attr} from '@/common/js/dom'
import Loading from '@/base/loading/loading'
import {playerlistMixin} from '@/common/js/mixin'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 25
export default {
    mixins: [playerlistMixin],
    props: {
        data: {
            type: Array,
            default: ()=>{return []}
        }
    },
    data() {
        return {
            probeType: 3,
            currentIndex: 0,
            scrollY: -1,
            diff: 0
        }
    },
    methods: {
        handlePlayerlist(playerList) {
            const bottom = playerList.length > 0 ? '72px' : ''
            this.$refs.listview.$el.style.bottom = bottom
            this.$refs.listview.refresh()
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        selectSiner(item) {
            this.$emit('select',item)
        },
        // 点击快捷导航
        onShortcutTouchStart(e) {
            let anchorIndex = attr(e.target , 'data-index')
            let firstTouch = e.touches[0]
            this.touch.startY = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this.__scrollTo(anchorIndex)
        },
        // 滑动快捷导航
        onShortcutTouchMove(e) {
            let moveTouch = e.touches[0]
            this.touch.moveY = moveTouch.pageY
            let delta = (this.touch.moveY-this.touch.startY)/ANCHOR_HEIGHT | 0
            let anchorIndex = ~~this.touch.anchorIndex + delta
            this.__scrollTo(anchorIndex)
        },
        // 滚动至被激活导航相应位置
        __scrollTo(index){
            if(!index && index !==0){
                return false
            }
            if(index<0){
                index = 0
            }else if(index>this.listHeight.length-2) {
                index = this.listHeight.length-2
            }
            this.scrollY = -this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.typeGruop[index], 0)
        },
        __calculateHeight() {
            this.listHeight = []
            const list = this.$refs.typeGruop
            let height = 0
            this.listHeight.push(height)
            for(let i = 0; i < list.length; i++){
                let item = list[i]
                height+=item.clientHeight
                this.listHeight.push(height)
            }
        }
    },
    created() {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
    },
    computed: {
        shortcutList() {
            return this.data.map((group) => {
                return group.title.substr(0, 1)
            })
        },
        fixedTitle() {
            if (this.scrollY > 0) {
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '' 
        }
    },
    components: {
        BScroll,
        Loading
    },
    watch: {
        data() {
            setTimeout(()=>{
                this.__calculateHeight()
            },20)
        },
        scrollY(newY) {
            // 当滚动至顶部时
            if(newY>0){
                return this.currentIndex = 0
            }
            const listHeight = this.listHeight
            // 中间部分正常滚动
            for(let i = 0; i < listHeight.length-1; i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]
                if(-newY >= height1 && -newY < height2){
                    this.currentIndex = i
                    this.diff = height2+newY
                    return
                }
            }
            this.currentIndex = listHeight.length-2
        },
        diff(newVal) {
            let fixedTop = (newVal>0&&newVal<TITLE_HEIGHT) ? newVal-TITLE_HEIGHT : 0
            if(this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    }
    
}
</script>
<style lang="less" scoped>
@import "~@/common/less/variable";
.listview {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 58px;
  overflow: hidden;
  padding: @comm-padding;
  background: @background-color-default;
//   padding-top:10px;
}
.type-gruop {
  padding-bottom: 16px;
  .type-title {
    // font-size: @font-size-medium-x;
    color: @color-primary;
    margin-left: 5px;
  }
}
.singer-group {
  .singer-item {
    margin-top: 16px;
    display: flex;
    align-items: center;
    .avatar-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 12px;
    }
    .name {
      font-size: @font-size-medium-x;
      color: @color-primary;
    }
  }
}
.list-chortcut {
  position: fixed;
  z-index: 999;
  right: 0;
  width: 20px;
  text-align: center;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  background-color: @background-color-accent;
  line-height: 1.5;
  padding: 6px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  .shortcut-item {
    font-size: @font-size-small;
    color: @color-text-a;
  }
  .shortcut-item.active {
    color: @color-text-active;
  }
}
.list-fixed {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 16px;
  background-color: @background-color-default;
  .fixed-title {
    color: @color-primary;
    margin-left: 5px;
  }
}
.loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}
</style>
