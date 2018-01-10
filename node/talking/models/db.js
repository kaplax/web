'use strict';
//封装所有对数据库的操作
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
class CRUDDB {
    constructor() {
        this.__ISCONN = false;
        this.url = '';
    }
    /**
     * 内部错误方法
     * @param {*} errMsg 
     */
    static __error(errMsg) {
        throw new Error(errMsg);
    }
    /**
     * 查看是否为callback
     * @param {*} cd 
     */
    static __maybeCallback(cd) {
        return typeof cd === "function" ? cd : err => err
    }
    static __getData(data, type) { //type:0---string 1---number 2---object 3---array 4---boolen
        switch (type) {
            case 0:
                return typeof data === 'string' ? data : CRUDDB.__error('requires a string');
                break;
            case 1:
                return typeof data === 'number' ? data : CRUDDB.__error('requires an integer');
                break;
            case 2:
                console.log(data)
                return data instanceof Object ? data : CRUDDB.__error('requires an object');
                break;
            case 3:
                return data instanceof Array ? data : CRUDDB.__error('requires an array');
                break;
            default:
                return CRUDDB.__error('type error');
                break;
        }
    }
    /**
     * 设置连接表
     * @param {*} url 
     */
    connectDB(url = 'mongodb://127.0.0.1:27017/test') {
        this.url = url;
    }
    /**
     * 内部调用连接数据库
     * @param {*} url 
     * @param {*} callback 
     */
    __connectDB(url, callback) {
        this.__ISCONN = true;
        MongoClient.connect(url, (err, db) => {
            return callback(err, db);
        });
    }
    /**
     * 插入一条数据
     * @param {*} collectionName 
     * @param {*} json 
     * @param {*} callback 
     */
    insertOne(
        collectionName = CRUDDB.__error('collectionName must be required'),
        data = CRUDDB.__error('data must be required'),
        callback = CRUDDB.__maybeCallback(callback || data)
    ) {
        this.__connectDB(this.url, (err, db) => {
            if (err) return callback(err);
            db.collection(collectionName).insertOne(data, (err, result) => {
                db.close();
                return callback(err, result);
            });
        });
    }
    /**
     * 插入多条数据
     * @param {*} collectionName 
     * @param {*} data 
     * @param {*} callback 
     */
    inserMany(
        collectionName = CRUDDB.__error('collectionName must be required'),
        data = CRUDDB.__error('data must be required'),
        callback
    ) {
        callback = CRUDDB.__maybeCallback(callback || data);
        this.__connectDB(this.url, (err, db) => {
            if (err) return callback(err);
            db.collection(collectionName).insertMany(data, (err, result) => {
                db.close();
                return callback(err, result);
            });
        });
    }
    /**
     * 查找数据
     * @param {*} collectionName  
     * @param {*} data 
     * @param {*} option 
     * @param {*} callback 
     */
    find(
        collectionName = CRUDDB.__error('collectionName must be required'),
        data = {},
        { limit = 0, skip = 0, sort = {} } = { limit: 0, skip: 0, srot: {} },
        callback = () => { }
    ) {
        if (typeof collectionName !== 'string') return this.__error('url must be a string');
        if (typeof data === 'function') { callback = data; data = {} };
        if (typeof arguments[2] === 'function') { callback = arguments[2]; limit = 0, skip = 0, sort = {} }
        this.__connectDB(this.url, (err, db) => {
            if (err) return callback(err);
            db.collection(collectionName).find(data).limit(limit).skip(skip).sort(sort).toArray().then((result) => {
                db.close(); return callback(null, result);
            }).catch(err => { db.close(); callback(err) });
        })
    }
    /**
     * 获取数据数量
     * @param {*} collectionName 
     * @param {*} data 
     * @param {*} callback 
     */
    getCount(
        collectionName = CRUDDB.__error('collectionName must be required'),
        data = {},
        callback
    ) {
        callback = CRUDDB.__maybeCallback(callback || data);
        if (typeof data !== 'object') data = {};
        this.__connectDB(this.url, (err, db) => {
            if (err) return callback(err);
            db.collection(collectionName).find(data).count().then(count => { db.close(); return callback(null, count) })
                .catch(err => { db.close(); return callback(err) })
        });
    }
    /**
     * 修改一条数据
     * @param {*} collectionName 
     * @param {*} data 
     * @param {*} callback 
     */
    updateOne(
        collectionName = CRUDDB.__error('collectionName must be required'),
        findData = {},
        data = {},
        callback = err => err
    ) {
        this.__connectDB(this.url, (err, db) => {
            if (err) return callback(err);
            db.collection(collectionName).updateOne(findData, data).then(result => {
                return callback(null, result);
            }).catch(err => callback(err));
        });
    }
    /**
     * 修改多条数据
     * @param {*} collectionName 
     * @param {*} data 
     * @param {*} callback 
     */
    updateMany(
        collectionName = CRUDDB.__error('collectionName must be required'),
        findData = {},
        data = {},
        callback = err => err
    ) {
        this.__connectDB(this.url, (err, db) => {
            if (err) return callback(err);
            db.collection(collectionName).updateMany(findData, data).then(result => callback(callback(null, result)))
                .catch(err => callback(err));
        });
    }
    delete(
        collectionName = CRUDDB.__error('collectionName must be required'),
        data = {},
        callback = CRUDDB.__maybeCallback(callback || data)
    ) {
        if (typeof data !== 'object') { data = {} }
        this.__connectDB(this.url, (err, db) => {
            if (err) return callback(err);
            db.collection(collectionName).deleteOne(data).then(result => callback(null, result)).catch(err => callback(err))
        });
    }
}
module.exports = CRUDDB;
