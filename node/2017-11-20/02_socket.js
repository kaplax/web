const net = require('net');
//创建socket服务器,但有客户端访问时将触发回调函数
const httpServer = net.createServer((socket) => {
    console.log('connection...');
    console.log( socket.address() );
    console.log( socket.remoteAddress,socket.remotePort );
    socket.on('data',(chunk)=>{
        console.log( chunk.toString() );
        socket.write('messages received');
    })
}).listen(3000, (err) => {
    err ? console.log(err) : console.log('success');
});