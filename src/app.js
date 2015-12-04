let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let config = {
  time: 7e7,
  size: 400,
  dots: 360,
  blend: 'screen'
}

function render (t) {
  canvas.width = canvas.width

  let oX = canvas.width / 2
  let oY = canvas.height / 2

  let size = Math.min(canvas.width, canvas.height) * 0.4

  for (let i = 0; i < config.dots; i += 1) {
    let r = (size / config.dots * i)
    let a = i * (Math.PI * (3 - Math.sqrt(5)))
    let s = 0.15 * Math.sin(t * (i / config.dots) / 100)
    let sz = Math.max(0, (r * s) + Math.sqrt(r))

    context.beginPath()
    context.fillStyle = 'hsl(' + (i * Math.tan(t / 10000)) + ', 100%, 50%)'
    context.arc(
      oX + Math.sin(a + Math.PI * (canvas.width)) * (r),
      oY + Math.cos(a + Math.PI * (canvas.height)) * (r),
      sz / 2,
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
