const mongoose = require('mongoose');
const db = require('./db');
const studentSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    sex: { type: String }
});
studentSchema.statics.findStudent = function (data, callback) {
    return this.model('student').find(data, callback);
}
studentSchema.methods.findStudents = function(data,callback){
    return this.model('student').find(data, callback);
}
studentSchema.methods.findOne = function(data,callback){
    console.log( this )
    return this.model('student').findOne(data,callback);
}
studentSchema.methods.find = (data,callback)=>{
    console.log(this);
    // return this.model('student').find(data,callback);
}

const studentModel = db.model('student', studentSchema);
module.exports = studentModel;