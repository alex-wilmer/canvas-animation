let canvas = document.querySelector(`canvas`)

function resize () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

window.onresize = resize

resize()

//

let context = canvas.getContext(`2d`)

function draw (time) {
  canvas.width = canvas.width

  let originX = canvas.width / 2
  let originY = canvas.height / 2

  let dots = 300

  for (let i = 0; i < dots; i += 1) {
    let coordinates = [
      originX + Math.sin(i) * i,
      originY + Math.cos(i) * i
    ]

    let radius =
      Math.max(0, Math.sin(time / (i * dots) * 100)) * 100

    let angle = [ 0, Math.PI * 2 ]

    context.beginPath()
    context.fillStyle = `hsl(${ time / i % 360 }, 51%, 41%)`
    context.arc(
      ...coordinates,
      radius / 5,
      ...angle
    )
    context.fill()
  }

  window.requestAnimationFrame(draw)
}

draw()
