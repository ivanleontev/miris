const express = require('express');
const app = express();
const dns = require('dns');
const fs = require('fs');
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded());
app.use(bodyParser.raw({ type: 'multipart/form-data' }))

let lastFile = '';

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

app.post('/file', (req, res) => {
    let arrName = req.query.fname.split('\\');
    let fname = arrName[arrName.length - 1]; 
    let filePath = __dirname + '/' + fname;
    let sendTo = req.query.to;
    let text = req.query.text;

    fs.appendFile(filePath, req.body, function() {
        sendEmail(fname, sendTo, text);
        res.end("done");
    });
});

function sendEmail(file_name, sendTo, text) {
    let transporter = nodemailer.createTransport(
        {
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: '',
                pass: ''
            }
        },
        {
            // default message fields
            // sender info
            from: ''
        }
    );

    let message = {
        // Comma separated list of recipients
        to: sendTo,
    
        // Subject of the message
        subject: 'Test mail',
    
        // plaintext body
        text: text,
        // An array of attachments
        attachments: [
            // Binary Buffer attachment
            {
                filename: file_name,
                path: __dirname + "/" + file_name,
            }
        ]
    };
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }
    
        console.log(info.messageId);
        console.log(info.message.toString());
    });
}

app.listen(8000);