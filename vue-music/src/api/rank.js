import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk:67232076,
    loginUin:0,
    hostUin:0,
    platform:'h5',
    needNewCode:1
  })

  return jsonp(url, data, options)
}

export function getSongByTop(id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk:5381,
    uin:0,
    format:'json',
    platform:'h5',
    needNewCode:1,
    tpl:3,
    page:'detail',
    type:'top',
    topid:id,
    _:1514452228668
  })

  return jsonp(url, data, options)
}

