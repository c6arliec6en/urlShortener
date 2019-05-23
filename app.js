const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/url', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose err!')
})
db.once('open', () => {
  console.log('mongodb connect')
})

// 資料庫鍵入一個是原始網址一個是產生的亂碼
// 亂碼需要去看是否已經有現有網址使用了
// schema需要鍵入originUrl和亂碼
// 使用pramas去還原網址

// app.get('/:shorturl', (req, res) => {
//   Url.findOne({ shorturl: req.params.shorturl }, (err, url) => {

//   })
// })


app.listen(port, () => {
  console.log('Express starting')
})