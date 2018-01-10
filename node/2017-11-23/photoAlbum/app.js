const conf =  require( './config' );
const express = require('express');
const app = express();
const router = require('./controller/router');

app.set('view engine', 'ejs');

// 路由中间件
app.get('/', router.method.showIndex);
app.get('/:album', router.method.showAlum);
app.get('/up',router.method.showUpload);
app.post('/up',router.method.uploadPhoto);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/upload'));
app.all('*',router.method.show404);
app.listen(3000);
