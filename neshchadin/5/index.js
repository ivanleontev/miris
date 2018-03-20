const crypto = require('crypto');

const express = require('express');
const app = express();
const dns = require('dns');
const fs = require('fs');
//const bodyParser = require("body-parser")
const nodemailer = require("nodemailer");
const formidable = require('express-formidable');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(formidable({
    encoding: 'utf-8',
    uploadDir: './storage',
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    var html = fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.end(html);
    });
});

app.get('/getHost', (req, res) => {
    console.log('getHost: ' + req.query.host)
    dns.lookup(req.query.host, (err, address, family) => {

        let ip = req.connection.remoteAddress;

        dns.reverse(ip, (err, hosts) => {
            res.json({
                address,
                hosts,
                ip,
            });
        });
    });
});

app.post('/mailSend', (req, res) => {
    console.log(req.files)
    sendEmail(req.files.file.name, req.files.file.path, req.fields.to, req.fields.text).then(() => {
        res.end("done");
    });
});

function sendEmail(fileName, filePath, sendTo, text) {
    let transporter = nodemailer.createTransport(
        {
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'idb-14-13@yandex.ru',
                pass: ''
            }
        },
        {
            from: 'idb-14-13@yandex.ru'
        }
    );

    let message = {
        to: sendTo,
        subject: 'Test mail',
        text: text,
        attachments: [
            {
                filename: fileName,
                path: __dirname + "/" + filePath,
            }
        ]
    };
    
    return new Promise((res, rej) => {
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                rej(error)
                return process.exit(1);
            }
        
            console.log(info.messageId);
            console.log(info.message.toString());
            res(info())
        });
    })
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});