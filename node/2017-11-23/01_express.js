const express = require( 'express' );
const app = express();
app.get('/index/:id',(req,res)=>{
    console.log( req.params['id'] );
    res.end();
}).listen(3000)