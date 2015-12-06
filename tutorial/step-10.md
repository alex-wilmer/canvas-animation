## Step 10: Modify By Index
#### `git checkout step-10`

### Modifying Radius And Color By The Index

Let's add some spice to our animation by modifying the size and color of a circle based on its index value.

```javascript
let hue = time / 10 * i % 360
```

We can inject `i` into the `hue` value...

```javascript
let radius = Math.max(0, Math.sin(time / 1000 * i)) * 100
```

...and into our radius. Note the change from `time / 100` to `time / 1000`. This is needed to keep our animation from flickering too fast.

`render` now:

```javascript
function render (time) {
  canvas.width = canvas.width

  let originX = canvas.width / 2
  let originY = canvas.height / 2

  let dots = 20

  for (let i = 0; i < dots; i += 1) {
    let hue = time / 10 * i % 360

    let coordinates = [
      originX + Math.sin(i) * 200,
      originY + Math.cos(i) * 200
    ]

    let radius = Math.max(0, Math.sin(time / 1000 * i)) * 100
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
```

Browser now:

![staggered circles](http://i.imgur.com/DjM2dP2.png)
