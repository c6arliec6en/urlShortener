const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/url', {
  useNewUrlParser: true,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose err!')
})
db.once('open', () => {
  console.log('mongodb connect')
})

const Url = require('./models/url')

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/show', (req, res) => {
  const originUrl = req.body.url

  if (originUrl === '') {
    res.render('index', { message: '請輸入想要變短的網址' })
  }

  let shortUrl = Math.random().toString(36).slice(-5)

  Url.find({ shortUrl: shortUrl }, (err, data) => {
    if (data.length > 0) {
      while (data[0].shortUrl === shortUrl) {
        shortUrl = Math.random().toString(36).slice(-5)
      }
    }
  })
  const newUrl = new Url({
    url: originUrl,
    shortUrl,
  })
  newUrl.save().then(url => {
    res.render('show', { shortUrl: shortUrl })
  })
})

app.get('/:shorturl', (req, res) => {
  Url.findOne({ shortUrl: req.params.shorturl }, (err, data) => {
    if (err) console.log(err)
    console.log(data.url)
    return res.redirect('/')
  })
})

app.listen(process.env.PORT || port, () => {
  console.log('Express starting')
})