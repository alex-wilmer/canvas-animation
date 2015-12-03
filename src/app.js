// Setup

let canvas = document.querySelector(`canvas`)

function fitWindow () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

fitWindow()

window.onresize = fitWindow

// The fun part!

let context = canvas.getContext(`2d`)

function render () {
  let hue = 180
  let position = [ 0, 0 ]
  let size = [ 100, 100 ]

  context.beginPath()
  context.fillStyle = `hsl(${hue}, 75%, 50%)`
  context.rect(
    ...position,
    ...size
  )
  context.fill()
}

render()
