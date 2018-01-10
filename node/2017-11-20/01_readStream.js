const util = require('util');
const fs = require('fs');
const path = require('path');
const stat = util.promisify(fs.stat);

let fileStreamData = '';
let fileStream = fs.createReadStream(path.join(__dirname, 'pages/test.txt'));

stat(path.join(__dirname, 'pages/test.txt')).then(stats => stats).then(stats => {
    fileStream.on('data', (chunk) => {
        fileStreamData += chunk;
        console.log(fileStreamData.length / stats.size * 100 + '%');
    })
}).catch(err => {
    console.log('err')
})

// fs.stat( path.join( __dirname,'pages/zhanlang.mkv' ) ,(err,stats)=>{
//     console.log( stats.size );
// });


