const net = require('net');
const clientSocket = net.createConnection({ port: 3000 }, () => {
    console.log('success connect to server');
    process.stdout.write('client > ');
    process.stdin.on('data', (chunk) => {
        // console.log(chunk.toString().trim());
        clientSocket.write(chunk.toString().trim());
    });

});
clientSocket.on('data', (chunk) => {
    console.log(chunk.toString());
})

clientSocket.on('end', () => {
    console.log('disconnencted from server');
})