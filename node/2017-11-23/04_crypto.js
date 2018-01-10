const crypto = require('crypto');
const hash = crypto.createHash('sha256');
;
console.log( hash.update('aasdasddasdasdasd').digest('hex') )