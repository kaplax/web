const crypto = require('crypto');
module.exports = (str) => {
    const hmac = crypto.createHmac('sha512', 'kapla');
    return hmac.update(str).digest('hex');
}