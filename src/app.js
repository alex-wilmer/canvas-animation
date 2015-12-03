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
  context.beginPath()
  context.fillStyle = `hsl(180, 75%, 50%)`
  context.rect(
    0, 0,
    100, 100
  )
  context.fill()
}

render()
