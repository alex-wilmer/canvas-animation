// Setup

let canvas = document.querySelector(`canvas`)

function fitCanvas () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

window.onresize = fitCanvas

fitCanvas()

// The fun part

let context = canvas.getContext(`2d`)

function render (time) {
  let hue = time % 360
  let saturation = 50
  let light = 50

  let position = [ canvas.width / 2, canvas.height / 2 ]
  let size = 100
  let angle = [ 0, 360 ]

  context.beginPath()
  context.fillStyle = `hsl(${hue}, ${saturation}%, ${light}%)`

  context.arc(
    ...position,
    size,
    ...angle
  )

  context.fill()

  window.requestAnimationFrame(render)
}

render()
