require('dotenv').config()
const path = require('path')
const express = require('express');
const cors = require('cors');

const app = express();

const { server } = require('./utils/server')

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "/views"))
app.use(cors());
app.use(express.static(path.join(__dirname, './assets')));
app.use(express.static(path.join(__dirname, './../public')));

const regex1 = new RegExp(/^([12]\d{3}-((0)?[1-9]|1[0-2])-((0)?[1-9]|[12]\d|3[0-1]{0,1}))$/mi)
const regex2 = new RegExp(/^(((0)?|1)\d{1})-(((0)?|1|2)\d{1})-((19|20)\d{2})/mi)

app.get('/', function (req, res) {
    res.render('index.pug')
});
app.get("/api", (req, res) => {
    const UNIX = new Date().getTime();

    const UTC = new Date().toUTCString();
    res.json({ unix: UNIX, utc: UTC })
})
app.get("/api/:date_string?", (req, res) => {
    const date = req.params.date_string
    console.log(new Date(parseInt("2022-12-12")))
    const regTest1 = regex1.test(date);
    const regTest2 = regex2.test(date);
    if (regTest1) {
        console.log("1 if")
        const UNIX = new Date(date).getTime();
        const UTC = new Date(date).toUTCString();
        res.json({ unix: UNIX, utc: UTC })
    }
    else if(regTest2){
        console.log("2 if")
        const UNIX = new Date(date).getTime();
        const UTC = new Date(date).toUTCString();
        res.json({ unix: UNIX, utc: UTC })
    }
    else {
        if (isNaN(date)) {
            console.log("else if")
            res.json({ error: "Invalid Date" })
        }
        else if (new Date(parseInt(date)) !== NaN) {
            console.log(`${regTest1} from else else`)
            const UNIX = new Date(parseInt(date)).getTime();
            const UTC = new Date(parseInt(date)).toUTCString();
            res.json({ unix: UNIX, utc: UTC })
        }
        else {
            res.json({ error: "Invalid Date" })

        }
    }
})

app.listen(process.env.PORT, server());
