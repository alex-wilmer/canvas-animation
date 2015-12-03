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
  time = time / 10

  let hue = time % 360

  let position = [
    time * 5 % canvas.width,
    time * 5 % canvas.height
  ]

  let size = time % 100 // radians
  let angle = [ 0, 360 ]

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
