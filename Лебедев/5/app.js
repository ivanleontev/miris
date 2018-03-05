const express = require('express');
const app = express();
const dns = require('dns');
const fs = require('fs');
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded());
app.use(bodyParser.raw({ type: 'multipart/form-data' }))

app.get('/', (req, res) => {
    var html = fs.readFileSync('./index.html');
    res.end(html);
});

app.get('/domain', (req, res) => {
    dns.lookup(req.query.host, (err, address, family) => {

        let ip = req.connection.remoteAddress;

        if (req.connection.remoteAddress == '::1') {
            res.json({
                address,
                host: 'localhost',
                ip: '127.0.0.1', 
            });
        } else {
            dns.reverse(ip, (err, hosts) => {
                res.json({
                    address,
                    hosts,
                    ip,
                });
            });
        }
    });
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.end("done");
});

app.listen(8000);