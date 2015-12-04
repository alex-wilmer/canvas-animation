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
  time = time / 200
  canvas.width = canvas.width

  let hue = time % 360

  let coordinates = [
    canvas.width / 2,
    canvas.height / 2
  ]

  let radius = Math.max(0, Math.sin(time)) * 100
  let angle = [ 0, 360 ]

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
