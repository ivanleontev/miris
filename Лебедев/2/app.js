const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
    var html = fs.readFileSync('./index.html');
    res.end(html);
});

app.get('/jquery', (req, res) => {
    fs.readFile('./jquery.min.js', (err, html) => {
        if (err) {
            throw err; 
        }       
        res.write(html);
    
    });
});

app.get('/xml', (req, res) => {
    fs.readFile('./auto.xml', (err, html) => {
        if (err) {
            throw err; 
        }       
        res.end(html);
    });
});

app.get('/save', (req, res) => {
    fs.writeFileSync('./db.xml', req.query.xml);
    res.end('success');
});

app.listen(8000);