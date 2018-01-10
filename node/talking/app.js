const express = require('express');
const session = require('express-session');
const config = require('./config');
const router = require('./controller/router');
const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
app.set('view engine', 'ejs');
app.get('/', router.showIndex);
app.get('/regist', router.showRegist);//显示注册页面
app.get('/setAvatar',router.setAvatar);//修改头像页面
app.post('/checkUser', router.checkUser);//查看用户是否注册
app.post('/userLogin', router.userlogin);//用户登录
app.post('/regist', router.postRegist);//提交注册信息
app.post('/checkLogin', router.checkLogin);//查看session判断用户是否登录
app.post('/setAvatar',router.uploadAvatar);
app.use(express.static(config.BASENAME + '/public'));
app.use(express.static(config.BASENAME + '/uploads'));
app.listen(3000, '192.168.0.136');

