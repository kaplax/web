const serverConf = require('./config');
const net = require('net');
const clients = [];
let sendMessage = "";

//procotol:1---boardcast  2---p2p
const serverSocket = net.createServer((socket) => {
    clients.push(socket);
    socket.on('data', (chunk) => {
        try {
            console.log( chunk,chunk.toString() )
            let signal = JSON.parse(chunk.toString().trim());
            let { procotol } = signal;
            signal.userAddress = socket.remoteAddress;
            switch (procotol) {
                case 1:
                    __boardcast(signal);
                    break;
                case 2:
                    __p2p(signal);
                    break;
                default:
                    break;
            }

        } catch (err) {
            socket.write(err);
        }
    }).on('close',(had_error)=>{
        console.log( had_error );
    });
}).listen(serverConf.port, (err) => {
    err ? console.log('server error') : console.log('server running');
});
const __p2p = (signal) => {
    sendMessage = { procotol, username, toAddress, message } = signal;
}
const __boardcast = (signal) => {
    sendMessage = { procotol, username, message } = signal;
    clients.map((client, index) => {
        client.write(JSON.stringify(sendMessage));
    });
}