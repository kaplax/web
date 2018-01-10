const fs = require('fs');
const path = require('path');
const htmlTemp = require('./02_watchfile_write');
const __targetPath = process.argv[2] ? path.join(__dirname, process.argv[2]) : "";
const __writePath = process.argv[3] ? path.join(__dirname, process.argv[3]) : "";
do {
    if (!__targetPath || !__writePath) {
        throw 'error path must be required';
    }
    fs.stat(__targetPath, (err, stats) => {
        if (stats.isFile()) {
            fs.watchFile(__targetPath, {interval:500},(curr, prev) => {
                let fss = fs.createReadStream(__targetPath);
                let htmlTempData = "";
                fss.on('data', (chunk) => {
                    htmlTempData += chunk;
                });
                fss.on('end', () => {
                    var nht = htmlTemp(htmlTempData.toString());
                    fs.writeFile(__writePath, nht, (err) => {
                        if (err) {
                            throw err;
                        }else{
                            console.log( 'write success!' )
                        }
                    })
                });

            });
        } else {
            throw 'error : is not a file'
        }
    })
} while (0);
console.log(__targetPath)