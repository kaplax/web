const http = require('http');
const url = require('url');
http.createServer((req, res) => {
    console.log( url.parse( req.url ).query )
    console.log(req.url)
    res.end();
}).listen(3000, () => {
    console.log('server running');
})