const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/cms');
db.once('open',(err)=>{
    console.log( 'connect success' );
});
module.exports = db;
