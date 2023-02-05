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
    if (!isNaN(date)) {
        let dateTime = new Date(parseInt(date))
        res.json({ unix: new Date().getTime(), utc: dateTime })
    }
    else {
        let dateTime = new Date(date).toUTCString()
        if (dateTime === "Invalid Date") {
            res.json({ error: "Invalid Date" })
        }
        else {
            console.log(dateTime)
            res.json({ unix: new Date(dateTime).getTime(), utc: dateTime })
        }
        
    }
    
})

app.listen(process.env.PORT, server());