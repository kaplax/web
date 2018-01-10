const express = require('express');
const app = express();
const server = require('http').Server(app);
const IO = require('socket.io')(server);
IO.on('connection', function () {
    console.log('有一个连接');
});

app.use(express.static(__dirname + '/public'));
server.listen(3000,'192.168.0.136');
