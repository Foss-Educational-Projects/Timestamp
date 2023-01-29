require('dotenv').config()
const path = require('path')
const njk = require('nunjucks')
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ dest: path.join(__dirname, "files") })

const { server } = require('./utils/server')

njk.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
})
app.use(cors());
app.use(express.static(path.join(__dirname, './assets')));
app.use(express.static(path.join(__dirname, './../public')));


app.get('/', function (req, res) {
  res.render('index.njk')
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  if (!req.file) {
    res.json({ error: "Provide A File" })
  }
  else {
    let fileInfo = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    };
    res.json(fileInfo);
  }
  
})

app.listen(process.env.PORT, server());
