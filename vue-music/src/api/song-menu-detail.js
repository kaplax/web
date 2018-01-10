import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
export function getMusicMenuDetail(disstid=10000000) {
  const url = '/api/getMusicMenuDetail'

  const data = Object.assign({}, {
    platform: 'h5',
    sin: 0,
    ein: 29,
    sortId: 5,
    disstid,
    needNewCode: 0,
    rnd: Math.random(),
    format: 'json',
    type:1,
    json:1,
    utf8:1,
    onlysong:0,
    picmid:1,
    nosign:1,
    song_begin:0,
    song_num:15,
    new_format:1,
    uin:0
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


