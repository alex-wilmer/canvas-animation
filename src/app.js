// setup

let canvas = document.querySelector(`canvas`)

function handleResize () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

window.onresize = handleResize

handleResize()

let mouse = { x: 0, y: 0 }

window.onmouseover = event =>
  mouse = { x: event.clientX, y: event.clientY }

window.onmousemove = event =>
  mouse = { x: event.clientX, y: event.clientY }

// the fun part

let context = canvas.getContext(`2d`)

function render (time) {
  canvas.width = canvas.width

  let originX = canvas.width / 2
  let originY = canvas.height / 2

  let dots = mouse.x

  for (let i = 0; i < dots; i += 1) {

    let coordinates = [
      originX + Math.sin(i) * i,
      originY + Math.cos(i) * i
    ]

    let radius = Math.max(0, Math.sin(time * i / 30000)) * (i / 10)
    let angle = [ 0, Math.PI * 2 ]

    let hue = time / i * (mouse.y / 100)

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
