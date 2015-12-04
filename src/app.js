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

  let originX = canvas.width / 2
  let originY = canvas.height / 2

  let dots = 360

  for (let i = 0; i < dots; i += 1) {
    let hue = time / 10000 * i % 360

    let coordinates = [
      originX + Math.sin(i) * i,
      originY + Math.cos(i) * i
    ]

    let radius = Math.max(0, Math.sin(time / 30000 * i)) * 100
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
