const express = require('express');
const formidable = require('formidable');
const CRUDDB = require('./models/db');
const db = new CRUDDB();
const app = express();
const table_guestbook = 'guestbook'
db.connectDB('mongodb://127.0.0.1:27017/userInfo');
app.post('/postMessage', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        db.insertOne('guestbook', { 'name': fields.name, message: fields.message, stime: new Date }, (err, result) => {
            if (err) { return res.json({ ret: -1 }) } else {
                res.json({ ret: 0 });
            }
        })
    })
});
app.get('/getMessage', (req, res) => {
    let pagesize = 5;
    let page = parseInt(req.query.page) - 1 || 0;
    if (page < 0) return res.json({ ret: -2, msg: '参数错误' });
    db.find(table_guestbook, {}, { limit: pagesize, skip: page * pagesize, sort: { stime: -1 } }, (err, data) => {
        if (err) { console.log(err); return res.json({ ret: -1 }) }
        res.json({ ret: 0, data: data });
    })
});
app.get('/count', (req, res) => {
    db.getCount(table_guestbook, (err, count) => {
        if (err) return res.json({ ret: -1, msg: err });
        return res.json({ ret: 0, data: count });
    })
});
app.use(express.static(__dirname + '/public'));
app.listen(3000);