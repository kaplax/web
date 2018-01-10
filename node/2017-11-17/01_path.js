const path = require('path');
const temp = path.join( __dirname,'./../2017-11-15/test' );//拼接绝对路径
console.log( path.basename( temp ) )//获取文件名
console.log( temp );
console.log( path.delimiter )//获取路径分隔符
console.log( process.env.PATH )//获取环境变量
console.log( process.env.PATH.split( path.delimiter ) )
console.log( path.dirname(temp) )//获取目录名称
console.log( path.extname(temp) )//获取扩展名
var obj = path.parse( temp );//将字符串路径转换为对象
console.log( obj );
console.log( path.isAbsolute( temp ) );//判断是非为绝对路径
console.log( path.relative( __dirname,path.join( __dirname,'../2017-11-15/test' ) ) )
console.log( path.resolve( __dirname,'../2017-11-15/test' ) )
console.log( path.sep )//获取路径分隔符
console.log( path.win32 );
console.log( path.posix );
console.log( path===path.win32 )
console.log( path===path.posix )
