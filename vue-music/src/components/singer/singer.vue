<template>
  <div class="singer-list">
    <singer-list :data="singers" @select="selectSinger"></singer-list>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import SingerList from '@/base/singer-list/singer-list'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/js/singer'
import { mapMutations } from 'vuex'

const HOST_NAME = '热门'
const HOST_LIST = 10
export default {

  data() {
    return {
      singers: []
    }
  },
  methods: {
    __getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this.__normalizeSinger(res.data.list)
        }
      })
    },
    // 标准化歌手数据
    __normalizeSinger(list) {
      let map = {
        hot: {
          title: HOST_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOST_LIST) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          )
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        )
      })
      // 为map排序
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOST_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    ...mapMutations({
      'setSinger': 'SET_SINGER'
    })
  },
  computed: {
    
  },
  created() {
    this.__getSingerList()
  },
  components: {
    SingerList
  }
}
</script>
<style lang="less" scoped>
// @import '~@/common/less/variable';
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>

