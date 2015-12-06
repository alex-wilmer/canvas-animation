import 'babel-polyfill'

// debugger

// setup

let canvas = document.querySelector(`canvas`)

function handleResize () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

window.onresize = handleResize

handleResize()

// Audio

let audioContext = new AudioContext()
let source = audioContext.createBufferSource()
let analyser = audioContext.createAnalyser()

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

async () => {
  let response = await fetch(`http://localhost:5000/music`)
  let buffer = await response.arrayBuffer()

  audioContext.decodeAudioData(buffer, (data) => {
    console.log('decoded data', data)
    source.buffer = data
    source.connect(analyser)
    source.connect(audioContext.destination)
    source.start(0)
  })
}()

// Mouse

let dots = 0
let mouse = { x: 0, y: 0 }

window.onmouseover = event =>
  mouse = { x: event.clientX, y: event.clientY }

window.onmousemove = event =>
  mouse = { x: event.clientX, y: event.clientY }

// window.onclick = event =>
//   dots = 500

// the fun part

let context = canvas.getContext(`2d`)

function render (time) {
  canvas.width = canvas.width

  // audio
  let originX = canvas.width / 2
  let originY = canvas.height / 2

  analyser.getByteTimeDomainData(dataArray);
  // let dots = mouse.x

  let level = Math.max(0, (dataArray[100] - 120)) * 4
  dots = level

  // console.log((dataArray[2000] - 100))
  // dots = time % 10 === 0 ? dots - 1 : dots
  // dots = dots - 18

  for (let i = 0; i < dots; i += 1) {
    let coordinates = [
      originX + Math.sin(i) * i,
      originY + Math.cos(i) * i
    ]

    let radius =
      Math.max(0, Math.sin(time * i / 30000)) * i / 10

    let angle = [ 0, Math.PI * 2 ]

    // let hue = time / i * (mouse.y / 100)
    let hue = dots

    context.beginPath()
    context.fillStyle = `hsl(${ hue }, 67%, 51%)`
    context.arc(
      ...coordinates,
      radius,
      ...angle
    )
    context.fill()
  }

  window.requestAnimationFrame(render)
}

render()
