import {playMode} from '@/common/js/config'
import {getLoadSearch, loadFavorite ,loadPlay} from '@/common/js/cache'
const state = {
    musicMenu: {},//歌单数据
    singer: {},//歌手数据
    playing: false,//播放器是否正在播放
    playerFullScreen: false,//播放器全屏
    playerList: [],//播放数据
    sequenceList: [],//顺序排序播放数据
    mode: playMode.sequence,//播放状态
    currentIndex: 0 ,//当前播放index
    topId:{},//排行榜
    searchHistory:getLoadSearch(), //  搜索历史
    playHistory: loadPlay(),
    favoriteList: loadFavorite() //收藏歌曲列表
}
export default state