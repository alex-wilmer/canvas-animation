## Bonus 2: Audio Visualizer
### `git checkout audio`
<br>

Wouldn't it be pretty cool if our animation responded to audio data? Let's use the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to stream some music, analyzing its frequency data and using that information to modify our animation.

For this bonus step, we're going to serve an audio file from Express, though the same technique can be used to stream audio from a different source.

First let's install `express` and `cors`...

```
npm install express cors
```

...then write our server file.

```javascript
var fs = require('fs')
var path = require('path')
var express = require('express')
var cors = require('cors')

var app = express()
app.use(cors())
//
var filepath = path.join(`${__dirname}/audio.mp3`)

app.get(`/music`, (req, res) => {
  res.set({ [`Content-Type`]: `audio/mpeg` })
  var readStream = fs.createReadStream(filepath)
  readStream.pipe(res)
})

app.listen(
  5000,
  () => console.log('Broadcasting on port 5000.')
)
```

In the above example, we'll need to put an audio file called `audio.mp3` in our root directory.

We're creating an endpoint at `localhost:5000/music` that will stream our audio file to the requester.

Now let's update `app.js` to make the request and decode the stream into audio data we can play and analyze.

> Note:
I prefer to use `async/await` over promises, so I've installed `babel-polyfill`.

Let's create the audio context and from that create source and analyser nodes.

```javascript
let audioContext = new AudioContext()
let source = audioContext.createBufferSource()
let analyser = audioContext.createAnalyser()
```

Next let's make a request to our server and decode the data that comes back. Once the data is decoded we'll hook up our nodes and start the music!

```javascript
async () => {
  let response = await fetch(`http://localhost:5000/music`)
  let stream = await response.arrayBuffer()

  function play (data) {
    source.buffer = data
    source.connect(analyser)
    source.connect(audioContext.destination)
    source.start(0)
  }

  audioContext.decodeAudioData(stream, play)
}()
```

We'll need our analyser node to create useful values from our audio source, so let's set that up.

```javascript
analyser.fftSize = 32
let dataArray = new Uint8Array(analyser.frequencyBinCount)
```

With that setup, we can poll the `dataArray` on every `render`. We'll take a random slice from it, and use that as our level.

```javascript
function render (time) {
  ...
  analyser.getByteTimeDomainData(dataArray)
  let level = Math.max(0, (dataArray[5]) * 4
  let dots = level
  let hue = level
  ...
}

```

[Audio Visualizer Demo](http://45.55.239.144:8000/)
