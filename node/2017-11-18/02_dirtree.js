"use strict";


const path = require('path');
const fs = require('fs');
const utile = require('util');
const EventEmitter = require('events');
const stat = utile.promisify(fs.stat);
const readdir = utile.promisify(fs.readdir);
const readDone = new EventEmitter();

const dirArr = [];
const filesArr = [];
readDone.on('readdone', () => {
    console.log(filesArr);
    console.log( dirArr )
})
readdir(__dirname).then((files) => {
    files.map((items, index) => {
        stat(path.join(__dirname, items)).then((stat) => {
            if (stat.isFile()) {
                filesFn(items);
            } else {
                dirFn(items);
            }
        }).catch((err) => {
            throw err;
        }).then(() => {
            if (index === files.length-1) {
                readDone.emit('readdone')
            }
        });

    })
}).catch((err) => {
    throw err;
}).then(() => {
})

var dirFn = (dir) => {
    dirArr.push(dir);
    console.log( 'is dir' )
}
var filesFn = (files) => {
    filesArr.push(files);
}