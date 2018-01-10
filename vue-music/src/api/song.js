import {commonParams} from './config'
import axios from 'axios'
import jsonp from '@/common/js/jsonp'

export function getLyric(mid) {
  const url = '/api/getLyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getUrl(songmid) {
  let filename = 'C400'+songmid+'.m4a'
  let guid = getGuid()
  return getVkey(songmid,filename,guid).then(res=>{
    let vkey = res.data.items[0].vkey
    return `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`
  })
}
function getGuid() {
  return Math.round(2147483647 * Math.random()) * (new Date).getUTCMilliseconds() % 1e10

}
function getVkey(songmid,filename, guid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = {
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    cid:205361747,
    callback:'MusicJsonCallback6817923929509115',
    uin:0,
    songmid:songmid,
    filename:filename,
    guid:guid
  }
  let options = 'MusicJsonCallback6817923929509115'
  return jsonp(url, data, options)
}