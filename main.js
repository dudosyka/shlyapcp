const express = require('express')
const fs = require("fs");
const parser = require('body-parser');
const cors = require('cors');
const cp = require("child_process")

const app = express()
const port = 3000


const conf = require("main.conf.js")

app.use(cors())
app.use(parser.urlencoded({extended: false, limit: '50mb', parameterLimit: 1000000}))
app.use(parser.json())

app.get('/', (req, res) => {
    res.send(fs.readFileSync('index.html').toString())
})

app.get('/create', (req, res) => {
    res.send(fs.readFileSync('create.html').toString())
});

app.post('/create', (req, res) => {
    if (req.body.type == 1) {
        fs.appendFile(`${req.body.name}.${conf.domain}`, fs.readFileSync('domain1.conf').toString().replace('%name%', req.body.name).replace('%name%', req.body.name), err => {
            console.log(err);
        })
    } else {
        fs.appendFile(`${req.body.name}.${conf.domain}`, fs.readFileSync('domain2.conf').toString().replace('%name%', req.body.name).replace('%name%', req.body.name).replace('%name%', req.body.name).replace('%port%', req.body.port), err => {
            console.log(err);
        })
    }
    cp.spawn(`cp ./${req.body.name}.${conf.domain} ${conf.nginx.available}`);
    cp.spawn(`ln -s ${conf.nginx.available}/${req.body.name}.${conf.domain} ${conf.nginx.enabled}/${req.body.name}.${conf.domain}`);
    cp.spawn(`nginx -t`);
    cp.spawn(`systemctl restart nginx`);
    cp.spawn(`certbot --nginx -d ${req.body.name}.${conf.domain}`)
})

app.get('/manage', (req, res) => {
    res.send(fs.readFileSync('manage.html').toString())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})