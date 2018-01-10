const fs = require('fs');
const util = require('util');
const path = require('path');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const __path = process.cwd();
module.exports = {
    method: {
        /**
         * 获取所有相册页面
         */
        getAllAlbums: (callback) => {
            let ret_obj = { 'ret': '-1', 'msg': '', 'data': '', 'log': '' };
            readdir(path.join(__dirname, '../upload')).then((files) => {
                let allAlbums = [];
                files.map((item, index) => {
                    stat(path.join(__dirname, '../upload/' + item)).then((stats) => {
                        stats.isDirectory() && allAlbums.push(files[index])
                        if (files.length - 1 === index) return callback(null, allAlbums);
                    }).catch((err) => {
                        return callback(err);
                    });
                });
            }).catch((err) => {
                return callback(err);
            });
        },
        /**
         * 获取指定相册页面
         */
        getAlbum: (req, res, callback) => {
            let photoFilePath = [];
            fs.readdir(path.join(__path, 'upload', req.path), (err, files) => {
                if (err) return callback(err);
                if (0 === files.length) return callback(null, photoFilePath);
                files.map((item, index) => {
                    let currFilePath = path.join(__path,'upload',req.path,item);
                    let currFileRelPath = path.join(req.path, item);
                    fs.stat(currFilePath, (err, stats) => {
                        if (err) return callback(err);
                        if (stats.isFile()) photoFilePath.push(currFileRelPath);
                        if (files.length - 1 === index) return callback(null, photoFilePath);
                    });
                });
            });
        },
        /**
         * 显示上传页面
         */
        showUpload: (req, res, callback) => {

        }
    }
}