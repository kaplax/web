const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
fs.readFile(path.join(__dirname, './music.lrc'), (err, data) => {
    let lines = iconv.decode(data, 'gbk').split('\r\n');
    const regex = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;
    lines.map((items, index) => {
        let matches = regex.exec(items);
        if (matches) {
            let m = parseFloat(matches[1]);
            let s = parseFloat(matches[2]);
            let f = parseFloat(matches[3]);
            let lyric = matches[4];
            setTimeout(() => {
                console.log( lyric )
            }, m * 60 * 1000 + s * 1000 + f);
        } else {
            // console.log( items );
        }
    })
})