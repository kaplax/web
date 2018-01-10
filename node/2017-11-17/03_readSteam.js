const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const readline = require('readline');
const regex = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;
const filePath = path.join(__dirname, './music.lrc');
let data = "";
let streamReader = fs.createReadStream(filePath);
streamReader.on('data', (chunk) => {
    data +=iconv.decode(chunk,'gbk')
});
streamReader.on('end', () => {
    console.log(data);
})

function showLyric(items) {
    let matches = regex.exec(items);
    if (matches) {
        let m = parseFloat(matches[1]);
        let s = parseFloat(matches[2]);
        let f = parseFloat(matches[3]);
        let lyric = matches[4];
        setTimeout(() => {
            console.log(lyric)
        }, m * 60 * 1000 + s * 1000 + f);
    } else {
        // console.log( items );
    }
}