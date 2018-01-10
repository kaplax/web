'use strict';
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const CRUD = require('../models/db');
const sha512 = require('../commons/sha512');
const db = new CRUD();
db.connectDB(config.db_path);
let avatarName = '';
module.exports = {
    showIndex: (req, res, next) => {
        res.render('index');
    },
    showRegist: (req, res, next) => {
        res.render('regist');
    },
    userlogin: (req, res, next) => {
        const ret_obj = { ret: -1, data: '', msg: '' };
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) { return res.json(ret_obj); }
            let { username, passwd } = fields;
            if (username == undefined || passwd == undefined) {
                ret_obj = -2; ret_obj.msg = '必要参数缺失';
                return res.json(ret_obj);
            }
            db.find(config.table_name, {
                name: username,
                passwd: sha512(passwd)
            }, (err, data) => {
                if (err) {
                    ret_obj.ret = -3;
                    ret_obj.msg = '登录失败!请稍后重试';
                    return res.json(ret_obj);
                }
                ret_obj.ret = 0, ret_obj.data = data;
                req.session.userlogin = 1; req.session.username = username;
                return res.json(ret_obj);
            })
        });

    },
    checkUser: (req, res, next) => {
        const ret_obj = { ret: -1, data: '', msg: '' };
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) { return res.json(ret_obj); }
            db.getCount(config.table_name, { name: fields.username }, (err, data) => {
                if (err) { ret_obj.ret = -2; ret_obj.msg = err; return res.json(ret_obj) }
                else { ret_obj.ret = 0, ret_obj.data = data; return res.json(ret_obj); }
            });
        })
    },
    postRegist: (req, res, next) => {
        const ret_obj = { ret: -1, data: '', msg: '' };
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) { return res.json(ret_obj) }
            let { username, passwd, avatar } = fields;
            if (username == undefined || passwd == undefined) { ret_obj.ret = -2, ret_obj.msg = "必要参数缺失"; return res.json(ret_obj) }
            db.getCount(config.table_name, { name: fields.username }, (err, data) => {
                if (err) { ret_obj.ret = -3; ret_obj.msg = err; return res.json(ret_obj) }
                else if (0 !== parseInt(data)) {
                    ret_obj.ret = 0, ret_obj.data = data; return res.json(ret_obj);
                } else if (0 === parseInt(data)) {
                    db.insertOne(config.table_name,
                        {
                            name: fields.username,
                            passwd: sha512(passwd),
                            avatar: '/images/avatar/define.jpg',
                            status: 0,
                            stime: new Date,
                            etime: new Date,
                            remark: ''
                        },
                        (err, data) => {
                            if (err) { ret_obj.ret = -4; ret_obj.msg = err; return res.json(ret_obj) }
                            else {
                                ret_obj.ret = 0;
                                ret_obj.data = data;
                                req.session.userlogin = 1;
                                req.session.username = username;
                                return res.json(ret_obj);
                            }
                        });
                }
            });
        })
    },
    checkLogin: (req, res, next) => {
        const ret_obj = { ret: -1, data: '', msg: '' };
        let [username, userlogin] = [req.session.username, req.session.userlogin];
        if (username == undefined || userlogin != 1) {
            ret_obj.ret = 1, ret_obj.msg = "用户未登录";
            return res.json(ret_obj);
        }
        const form = new formidable.IncomingForm();
        db.find(config.table_name, { name: username }, (err, data) => {
            if (err) {
                ret_obj.ret = -2; ret_obj.msg = "查询失败,请稍后重试";
                return res.json(ret_obj);
            }
            if (data !== null || data !== undefined) {
                ret_obj.ret = 0; ret_obj.data = data;
                return res.json(ret_obj);
            } else {
                ret_obj.ret = 1; ret_obj.data = data;
                return res.json(ret_obj);
            }
        });

    },
    issueTalking: (req, res, next) => {
        const ret_obj = { ret: -1, data: '', msg: '' };
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) { return res.json(ret_obj) }
            let { content, author } = fields;
            if (content == undefined || author == undefined) { ret_obj.ret = -2, ret_obj.msg = "必要参数缺失"; return res.json(ret_obj) }
            db.insertOne(config.table_talking_name, {
                content,
                author,
                stime: new Date,
                status: 0
            }, (err, data) => {
                if (err) { ret_obj.ret = -3, ret_obj.msg = "插入失败,请稍后重试"; return res.json(ret_obj) }
                ret_obj.ret = 0, ret_obj.data = data;
                return res.json(ret_obj);
            });
        });
    },
    myTalking: (req, res, next) => {
        const ret_obj = { ret: -1, data: '', msg: '' };
        const pagesize = 5;
        let { username, page } = req.parse;
        if (username == undefined || page == undefined) {
            ret_obj.ret = -2, ret_obj.msg = "必要参数缺失";
            return res.json(ret_obj);
        }
        db.find(config.table_talking_name,
            { name: username },
            { limit: pagesize, skip: page * pagesize, sort: { stime: -1 } },
            (err, data) => {
                if (err) {
                    ret_obj.ret = -3, ret_obj.msg = "查询失败,请稍后重试";
                    return res.json(ret_obj);
                }
                ret_obj.ret = 0, ret_obj.data = data;
                return res.json(ret_obj);
            });
    },
    setAvatar: (req, res, next) => {
        if (req.session.userlogin) {
            res.render('setAvatar');
        } else {
            res.redirect('/');
        }
    },
    uploadAvatar: (req, res, next) => {
        const ret_obj = { ret: -1, data: '', msg: '' };
        let username = req.session.username;
        if (!username) {
            ret_obj.msg = '登录超时,请重新登录';
            return res.json(ret_obj);
        }
        const form = new formidable.IncomingForm();
        form.uploadDir = config.BASENAME + "/public/images/avatar";
        form.parse(req, (err, fields, files) => {
            if (err) {
                ret_obj.ret = -2; ret_obj.msg = '数据获取失败,请重试!';
                return res.json(ret_obj);
            }
            avatarName = path.basename(files.avatar_img.path);
            return res.json(ret_obj);
        });
    }
}