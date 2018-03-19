const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    fs.readFile('index.html', function (err, html) {
        if (err) {
            throw err;
        }

        res.end(html)
    })
})

app.get('/xml', (req, res) => {
    fs.readFile('./db.xml', (err, html) => {
        if (err) {
            throw err; 
        }       
        res.end(html);
    });
});

app.post('/save', (req, res) => {
    fs.writeFileSync('./db.xml', req.body.xml);
    res.end('success');
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})