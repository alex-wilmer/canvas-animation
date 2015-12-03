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
  canvas.width = canvas.width

  let hue = time / 10 % 360

  let originX = canvas.width / 2
  let originY = canvas.height / 2

  let coordinates = [
    time % canvas.width,
    time % canvas.height
  ]

  let radius = time / 10 % 100
  let angle = [ 0, Math.PI * 2 ]

  context.beginPath()
  context.fillStyle = `hsl(${hue}, 75%, 50%)`
  context.arc(
    ...coordinates,
    radius,
    ...angle
  )
  context.fill()

  window.requestAnimationFrame(render)
}

render()
