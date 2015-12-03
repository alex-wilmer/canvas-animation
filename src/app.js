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
  time = time

  let maxSize = Math.min(canvas.width, canvas.height) * 0.3

  for (let i = 0; i < 300; i += 10) {
    let r = (maxSize / 240 * i)
    let a = i * (Math.PI * (3 - Math.sqrt(5)))

    // let hue = time % 360

    let position = [
      (canvas.width / 2) + Math.sin(a) * (r),
      (canvas.height / 2) + Math.cos(a + Math.PI * (0 / canvas.height)) * (r)
    ]

    let size = time % 50 // radians
    let angle = [ 0, Math.PI * 2 ]

    context.beginPath()
    context.fillStyle = 'hsl(' + (i * Math.tan(time / 10000)) + ', 100%, 50%)'
    context.arc(
      ...position,
      size,
      ...angle
    )
    context.fill()
  }

  window.requestAnimationFrame(render)
}

render()
