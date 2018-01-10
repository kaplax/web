import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
export function getType() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:'jsonp',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0
  })

  return jsonp(url, data, options)
}
export function getMusicMenuList(categoryId=10000000) {
  const url = '/api/getDiscList'

  const data = Object.assign({}, {
    g_tk: 5381,
    notice: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId,
    needNewCode: 0,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


