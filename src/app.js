let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let originX = canvas.width / 2
let originY = canvas.height / 2

let dots = 100

function render (t) {
  canvas.width = canvas.width

  for (let i = 0; i < dots; i += 1) {
    let s = Math.sin(t * (i / dots) / 100)
    let radius = Math.abs(i * s)

    context.beginPath()
    context.fillStyle =
      `hsl(${i * Math.tan(t / 10000)}, 100%, 50%)`

    context.arc(
      originX + Math.sin(i) * i,
      originY + Math.cos(i) * i,
      radius / 5,
      0,
      2 * Math.PI
    )
    context.fill()
  }

  return window.requestAnimationFrame(render)
}

render()

window.onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
