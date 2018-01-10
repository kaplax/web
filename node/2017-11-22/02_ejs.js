const ejs = require( 'ejs' );
const fs = require('fs');
const path = require('path');
let tempData = {
    a:'X'
}
fs.readFile( path.join( __dirname,'temp/temp.js' ),(err,data)=>{
    let html = ejs.render(data.toString(),tempData);    
    console.log( html );
} );
