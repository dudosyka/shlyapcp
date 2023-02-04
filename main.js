const express = require('express')
const fs = require("fs");
const parser = require('body-parser');
const cors = require('cors');
const cp = require("child_process")

const { exec } = require('child_process')

const app = express()
const port = 3000


const conf = {
    domain: "psyreply.com",
    nginx: {
        main: "/etc/nginx/",
        enabled: "/etc/nginx/sites-enabled",
        available: "/etc/nginx/sites-available"
    },
    sites_path: "/root/domains/"
}

	//require("main.conf.js")

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
        fs.appendFile(`../domains/confs/${req.body.name}.${conf.domain}`, fs.readFileSync('domain1.conf').toString().replace('%name%', req.body.name).replace('%name%', req.body.name), err => {
            console.log(err);
            fs.copyFile(`../domains/confs/${req.body.name}.${conf.domain}`, `/etc/nginx/sites-available/${req.body.name}.${conf.domain}`, (err) => {
	    const lnchild = cp.execFile(`./upload_bash/ln.sh`, [ `-a${req.body.name}.${conf.domain}` ]); 
            lnchild.on('exit', () => {console.log(11);});
            const ntchild = cp.execFile(`./upload_bash/nginxt.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            ntchild.on('exit', () => {console.log(11);});
            const nxchild = cp.execFile(`./upload_bash/nginxrs.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            nxchild.on('exit', () => {console.log(11);});
            
            const cchild = cp.execFile(`./upload_bash/certbot.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            cchild.on('exit', () => {console.log(11);});

            const mkchild = cp.execFile(`./upload_bash/mkdir.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            mkchild.on('exit', () => {console.log(11);});
            const indexchild = cp.execFile(`./upload_bash/index.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            indexchild.on('exit', () => {console.log(11);});
		    console.log('err',err);
	    });
	})
    } else {
        fs.appendFile(`../domains/confs/${req.body.name}.${conf.domain}`, fs.readFileSync('domain2.conf').toString().replace('%name%', req.body.name).replace('%name%', req.body.name).replace('%name%', req.body.name).replace('%port%', req.body.port), err => {
		console.log(err);
            fs.copyFile(`../domains/confs/${req.body.name}.${conf.domain}`, `/etc/nginx/sites-available/${req.body.name}.${conf.domain}`, (err) => {
                    console.log('err',err);
            const lnchild = cp.execFile(`./upload_bash/ln.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            lnchild.on('exit', () => {console.log(11);});
            const ntchild = cp.execFile(`./upload_bash/nginxt.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            ntchild.on('exit', () => {console.log(11);});
            const nxchild = cp.execFile(`./upload_bash/nginxrs.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            nxchild.on('exit', () => {console.log(11);});
            
            const cchild = cp.execFile(`./upload_bash/certbot.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            cchild.on('exit', () => {console.log(11);});

	    const mkchild = cp.execFile(`./upload_bash/mkdir.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            mkchild.on('exit', () => {console.log(11);});
            const indexchild = cp.execFile(`./upload_bash/index.sh`, [ `-a${req.body.name}.${conf.domain}` ]);
            indexchild.on('exit', () => {console.log(11);});
            });

		console.log(err);
        })
    }
    res.send("");
})

app.get('/manage', (req, res) => {
    res.send(fs.readFileSync('manage.html').toString())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
