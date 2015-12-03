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

function render (time) {
  let hue = time / 10 % 360
  let position = [ canvas.width / 2, canvas.height / 2 ]
  let size = 100 // radians
  let angle = [ 0, Math.PI * 2 ]

  context.beginPath()
  context.fillStyle = `hsl(${hue}, 75%, 50%)`
  context.arc(
    ...position,
    size,
    ...angle
  )
  context.fill()

  window.requestAnimationFrame(render)
}

render()
