const axios = require('axios')
const express = require('express')
const config = require('./config/index')
const app = express()
const apiRoutes = express.Router()
const port = process.env.PORT || config.build.port
const host = process.env.HOST || config.build.host


apiRoutes.get('/getDiscList', function (req, res) {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        return res.json(response.data)
    }).catch(error => {
        return res.json(error)
    })
})
apiRoutes.get('/getMusicMenuDetail', (req, res) => {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/w/taoge.html?ADTAG=newyqq.taoge&id=3601757973',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        return res.json(response.data)
    }).catch(err => {
        return res.json(err)
    })
})
apiRoutes.get('/getLyric', (req, res) => {
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        let ret = response.data
        if (typeof ret === 'string') {
            let reg = /^\w+\(({[^()]+})\)$/
            let mathes = ret.match(reg)
            if (mathes) {
                ret = JSON.parse(mathes[1])
                ret.lyric = new Buffer(ret.lyric, 'base64').toString()
            }
        }
        return res.json(ret)
    }).catch(err => {
        return res.json(err)
    })
})
app.use('/api', apiRoutes)
app.use(express.static('./dist'))
module.exports = app.listen(port, (err)=>{
    if(err) {
        return console.log(err)
    }
    console.log('Listening at http://localhost:'+port+'\n')
})