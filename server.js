var express = require('express')
var fs = require('fs')
var path = require('path')

var cors = require('cors')

var app = express()
app.use(cors())
//
var filepath = path.join(`${__dirname}/audio.mp3`)

app.get(`/music`, (req, res) => {
  res.set({ [`Content-Type`]: `audio/mpeg` })
  var readStream = fs.createReadStream(filepath)

  // console.log('getting music')
  readStream.pipe(res)
})

app.listen(
  5000,
  () => console.log('Broadcasting on port 5000.')
)
