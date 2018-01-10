const serverConf = require('./config');
const net = require('net');
let sendMessage = {};
let username = '';
const clientSocket = net.createConnection({ port: serverConf.port }, () => {
    console.log('success connect to server');
    
    rl.question('what\s your name?', (answer) => {
        username = answer.trim();
        rl.setPrompt(username + '> ');
        rl.prompt();
    });
    rl.on('line', (line) => {
        // console.log(line);
        sendMessage = {
            procotol: 1,
            username,
            message: line.trim()
        }
        clientSocket.write(JSON.stringify(sendMessage));   
    });
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});
clientSocket.on('data', (chunk) => {
    let resData = JSON.parse(chunk.toString().trim());
    console.log(resData.username + ' : ' + resData.message);
    rl.prompt();
});
clientSocket.on('end', () => {
    console.log('disconnected from server');
});


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


