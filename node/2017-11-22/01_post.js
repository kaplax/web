const http=require('http') 
      formidable = require('formidable');
const querystring =  require('querystring');
http.createServer((req,res)=>{
    if( req.method.toLowerCase()==='post' ){
        let formData = new formidable.IncomingForm();
        formData.uploadDir = __dirname+"/uploads/images";
        formData.parse( req,(err,fields,files)=>{
            err || console.log( err );
            console.log( fields );
            console.log( files );
            res.end('success');
        } );
    }
}).listen(3000,()=>{
    console.log( 'server running' );
});