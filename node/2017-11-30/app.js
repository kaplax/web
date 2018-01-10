const db = require('./models/db');
const Students = require('./models/Student');
var info = { name: 'xiaohong', age: 12, sex: '女' }
// let xiaoming = new Students(info);
// xiaoming.save((err)=>{
//   console.log('success');
// })

// Students.create(info,(err)=>{
//   console.log( 'success' );
// });
// Students.findStudent({ name: 'xiaoming' }, (err, data) => {
//   console.log(data)
// })
// Students.findStudent({name:'xiaoming'},(err,data)=>{
//   console.log(data)
// })
let student = new Students();
// student.findStudents({'name':'xiaoming'},(err,data)=>{
//   console.log(data);
// });
Students.find({ name: 'xiaohong' }, (err, result) => {
  let xueshen = result[0];
  xueshen.findOne({ name: 'xiaoming' }, (err, result) => {
    // console.log(result);
  })
})
// Students.findOne({name:'xiaoming'},function(err,data){
//   console.log(data)

// })