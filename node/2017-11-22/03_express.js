const fs = require('fs');
const express = require('express');
const axios = require('axios');
const app = express();
app.get('/api', (req, res) => {
    const url = 'https://www.pcddapi.com/api/v0/pay/payAust.api'
    data = {
        amount: 58,
        userName: 'deanwen258',
        type: 2,
        token: '9b063676b56146997ff2e93c0da02d57'
    }
    axios({
        method:'post',
        url,
        data,
        headers:{
            'Content-type':'application/json;charset=utf-8'
        }
    }).then((response) => {
        res.send({data:response.data})
    }).catch((err) => {
        console.log(err)
        res.end('error')
    })
    // fs.readFile(__dirname+'/uploads/images/1.jpg', (error,data)=>{
    //     // console.log(data.toString('base64'))
    //     let html = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //         <title>Document</title>
    //     </head>
    //     <body>
    //         <img src="data:image/png;base64,${data.toString('base64')}" >
    //     </body>
            
    //     </html>
    //                 `
    //     res.send(html)
    // })
})
app.listen(8000,'192.168.0.136');
