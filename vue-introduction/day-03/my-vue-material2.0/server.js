const express = require('express');
const app = express();
app.get('/api', (req, res) => {
    let json = {
        data: [
            {
                name: 'kapla',
                age: 24
            },
            {
                name: 'kapla',
                age: 24
            }
        ]
    }
    res.json(json);
});
app.listen(8089, '192.168.0.136');