import {getLyric, getUrl} from '@/api/song'
import {ERR_OK}  from '@/api/config'
export default class Song {
    constructor({singerid, pic_mid, nickname, dissname, image, songs, tags}) {
        this.singerid = singerid
        this.pic_mid = pic_mid
        this.nickname = nickname
        this.dissname = dissname
        this.image = image
        this.songs = songs
        this.tags = tags
    }
}
export function createSong(musicData) {
    return new Song({
        singerid: musicData.singerid,
        pic_mid: musicData.pic_mid,
        songs: getSongs(musicData.songlist),
        dissname: musicData.dissname,
        nickname: musicData.nickname,
        image: `//y.gtimg.cn/music/photo_new/T006R300x300M000${musicData.pic_mid}.jpg?max_age=2592000`,
        tags: getTabs(musicData.tags)
    })
}

export function getSongs(songList) {
    let songs = []
    songList.map((item, index)=>{
        ((song)=>{
            if(!item || !item.mid) { return '' }
            getUrl(item.mid).then(res=>{
                song.singerName = filterSinger(item.singer)
                song.image =  `http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`,
                song.url = res 
                song.duration = item.interval ? item.interval : ''               
                song.getLyric = function() {
                    if(this.lyric) {
                        return Promise.resolve(item.lyric)
                    }
                    return new Promise((resolve, reject)=>{
                        getLyric(item.mid).then(res=>{
                            if(res.retcode===ERR_OK) {
                                item.lyric = res.lyric
                                resolve(item.lyric)
                            }else{
                                reject('no lyric')
                            }
                        })
                    })
                }
                songs.push(song)
            })
        })(item)
    })
    return songs
}
export function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}
function getTabs(tags) {
    let ret = []
    if (!tags){ return '' }
    tags.forEach((s)=>{
        ret.push(s.name)
    })
    return ret.join('·')
}