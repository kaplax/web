'use strict'
// class test {
//     constructor() {
//     }
//     static __connect() {
//         let a = 1
//         console.log(a)
//     }
//     init() {
//         test.__connect();
//     }


// }
// var b = new test();
// b.init();
// var people = {
//     values: ['Dean Edwards', 'Alex Russell', 'Dean Tom']
// }
// function addMethod(obj, name, fn) {
//     let old = obj[name];
//     obj[name] = function () {
//         if (fn.length === arguments.length) {
//             return fn.apply(this, arguments);
//         } else if (typeof old === 'function') {
//             return old.apply(this, arguments);
//         }
//     }
// }
// addMethod(people, 'find', function () {
//     return this.values;
// })
// addMethod(people, 'find', function (firstName) {
//     let ret = [];
//     for (let i = 0; i < this.values.length; i++) {
//         if (this.values[i].indexOf(firstName) === 0) {
//             ret.push(this.values[i]);
//         }
//     }
//     return ret;
// });

// console.log(people.find())
// console.log(people.find('Dean Edwards'))
// function add({a=1,b=2}={a:1,b:2}){
//     console.log( a,b )
//     console.log( arguments[0] )
// }
// add({c:5,d:6});


// function add(a, b, c, d, callback) {
//     callback = maybeCallback(callback || c)
//     callback(a + b);
// }
function makeerr() {
    throw new Error('aldsfsjd');
}
function maybeCallback(cd) {
    return typeof cd === 'function' ? cd : () => { }
}
// add(1, 2, 'asd', (a) => {
//     console.log(a)
// });

function add(a, d, c = maybeCallback(c || d)) {
    console.log( c )
    c();
}
add(1, () => {
    console.log('s');
});
