// Setup

let canvas = document.querySelector(`canvas`)

function fitWindow () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

fitWindow()

window.onresize = fitWindow

// The fun part!

let mouse = { x: 0, y: 0 }

window.onmouseover = event =>
  mouse = { x: event.clientX, y: event.clientY }

window.onmousemove = event =>
  mouse = { x: event.clientX, y: event.clientY }

let context = canvas.getContext(`2d`)

function render (time) {
  canvas.width = canvas.width

  let originX = canvas.width / 2
  let originY = canvas.height / 2

  let dots = 360

  for (let i = 0; i < dots; i += 1) {
    let hue = time / 10000 * i % 360

    let coordinates = [
      originX + Math.sin(i * Math.PI / mouse.x) * i,
      originY + Math.cos(i * Math.PI / mouse.y) * i
    ]

    let radius = Math.max(0, Math.sin(time / 30000 * i)) * i / 5

    let angle = [ 0, Math.PI * 2 ]

    context.beginPath()
    context.fillStyle = `hsl(${hue}, 75%, 50%)`
    context.arc(
      ...coordinates,
      radius / 5,
      ...angle
    )
    context.fill()
  }

  window.requestAnimationFrame(render)
}

render()
