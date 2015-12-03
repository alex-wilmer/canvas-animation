let canvas =
  document.querySelector(`canvas`)

canvas.width =
  window.innerWidth

canvas.height =
  window.innerHeight

let context =
  canvas.getContext(`2d`)

let render = (t) => {
  t += 1000

  console.log(t)

  let height = Math.abs(Math.sin(t)) * 500

  console.log(height)

  context.fillStyle = `rgb(200,0,0)`
  context.fillRect(0, 0, height, 100)

  return requestAnimationFrame(render)
}

render()
