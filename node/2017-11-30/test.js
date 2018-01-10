var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/cms');
db.on('error', function (error) {
    console.log(error);
});
var mongooseSchema = new mongoose.Schema({
    username: { type: String, default: '匿名用户' },
    title: { type: String },
    content: { type: String },
    time: { type: Date, default: Date.now },
    age: { type: Number }
});
mongooseSchema.methods.findbyusername = function (username, callback) {
    return this.model('mongoose').find({ username: username }, callback);
}
mongooseSchema.statics.findbytitle = function (title, callback) {
    return this.model('mongoose').find({ title: title }, callback);
}
var mongooseModel = db.model('mongoose', mongooseSchema);




var doc = { username: 'model_demo_username', title: 'emtity_demo_title', content: 'emtity_demo_content' };
// var mongooseEntity = new mongooseModel(doc);

// mongooseEntity.save(function (error) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('saved OK!');
//     }
//     // 关闭数据库链接
//     db.close();
// });
// mongooseModel.create(doc, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('save ok');
//     }
//     // 关闭数据库链接
//     db.close();
// });

// var conditions = {username : 'model_demo_username'};
// var update     = {$set : {age : 27, title : 'asdasd'}};
// var options    = {upsert : true};
// mongooseModel.update(conditions, update, options, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('update ok!');
//     }
//     //关闭数据库链接
//     db.close();
// });
var mongooseEntity = new mongooseModel();
mongooseEntity.findbyusername('model_demo_username', function (error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result[0]);
        this.find();
    }
    //关闭数据库链接
    db.close();
});