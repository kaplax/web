import Vue from 'vue'
import Router from 'vue-router'
// import recommend from '../components/recommend/recommend'
// import songMenu from '../components/song-menu/song-menu'
// import singer from '../components/singer/singer'
// import rank from '../components/rank/rank'
// import search from '../components/search/search'
// import mine from '../components/mine/mine'
// import songMenuDetail from '../components/song-menu-detail/song-menu-detail'
// import singerDetail from '../components/singer-detail/singer-detail'
// import rankDetail from '../components/rank-detail/rank-detail'

const recommend = (resolve=>{
  import('../components/recommend/recommend').then((recommend)=>{
    resolve(recommend)
  })
})
const songMenu = (resolve=>{
  import('../components/song-menu/song-menu').then((songMenu)=>{
    resolve(songMenu)
  })
})
const singer = (resolve=>{
  import('../components/singer/singer').then((singer)=>{
    resolve(singer)
  })
})
const rank = (resolve=>{
  import('../components/rank/rank').then((rank)=>{
    resolve(rank)
  })
})
const search = (resolve=>{
  import('../components/search/search').then((search)=>{
    resolve(search)
  })
})
const mine = (resolve=>{
  import('../components/mine/mine').then((mine)=>{
    resolve(mine)
  })
})
const songMenuDetail = (songMenuDetail=>{
  import('../components/song-menu-detail/song-menu-detail').then((songMenuDetail)=>{
    resolve(songMenuDetail)
  })
})
const singerDetail = (resolve=>{
  import('../components/singer-detail/singer-detail').then((singerDetail)=>{
    resolve(singerDetail)
  })
})
const rankDetail = (resolve=>{
  import('../components/rank-detail/rank-detail').then((rankDetail)=>{
    resolve(rankDetail)
  })
})






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
    },
    {
      path: '/songMenu',
      name: 'songMenu',
      component: songMenu,
      children: [
        {
          path:':id',
          component: songMenuDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [
        {
          path:':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: rankDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      children: [
        {
          path:':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    
  ]
})
