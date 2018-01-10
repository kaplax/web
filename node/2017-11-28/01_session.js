const express = require('express');
const formidable = require('formidable');
const CRUD = require('./db');
const sha512 = require('./sha512');
const db = new CRUD();
const app = express();
db.connectDB('mongodb://127.0.0.1:27017/userInfo');
const table_name = 'userInfo';
app.set('view engine', 'ejs');

app.get('/loginpage', (req, res, next) => {
    res.render('login');
});
app.post('/login', (req, res, next) => {
    let ret_obj = { ret: -1, data: '', msg: '', interface: '' };
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) { ret_obj.ret = -2; ret_obj.msg = err; ret_obj.interface = 'form.parse'; return res.json(ret_obj) }
        else {
            db.find(table_name, { username: fields.username, passwd: sha512(fields.passwd) }, (err, data) => {
                if (err) { return res.json(ret_obj) }
                else if (0 === parseInt(data)) {
                    ret_obj.ret = 0; ret_obj.data = data;
                    return res.json(ret_obj);
                } else {
                    ret_obj.ret = 0; ret_obj.data = data;
                    return res.json(ret_obj);
                }
            })
        }
    });
})

app.get('/regist', (req, res, next) => {
    res.render('regist');
});
app.post('/postRegist', (req, res, next) => {
    let ret_obj = { ret: -1, data: '', msg: '', interface: '' };
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            ret_obj.ret = -2; ret_obj.msg = err; ret_obj.interface = 'form.parse'
            return res.json(ret_obj);
        } else {
            let username = fields.username;
            let passwd = fields.passwd;
            db.getCount(table_name, { name: username }, (err, result) => {
                if (err) {
                    ret_obj.ret = -2; ret_obj.msg = '接口调用错误'; ret_obj.interface = 'getCount';
                    return res.json(ret_obj);
                } else if (0 !== parseInt(result)) {
                    ret_obj.ret = 0; ret_obj.data = result;
                    return res.json(ret_obj);
                } else {
                    db.insertOne(table_name, { name: username, passwd: sha512(passwd) }, (err, result) => {
                        if (err) {
                            ret_obj.ret = -2; ret_obj.msg = "接口调用失败"; ret_obj.interface = "insertOne";
                        }
                        else {
                            ret_obj.ret = 0; ret_obj.msg = 'success'; ret_obj.data = result;
                        }
                        return res.json(ret_obj);
                    })
                }
            });
        }
    });
});
app.listen(3000);