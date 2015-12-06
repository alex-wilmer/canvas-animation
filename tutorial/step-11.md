## Step 11: Filling In The Gaps
#### `git checkout step-11`

### Multiplying Index By Itself

What would happen if we multiplied the coordinate position by the current index, rather than 200 every time?

```javascript
let coordinates = [
  originX + Math.sin(i) * i,
  originY + Math.cos(i) * i
]
```

![sinkhole](http://i.imgur.com/Cz1M5jM.png)

`i`, representing the number of circles, is a rather small value when talking about pixels. Let's add more dots!

```javascript
let dots = 360
```

![wow](http://i.imgur.com/YIXp7iT.png)

**wow**.

It turns out that by multiplying `sin(i)` by `i` creates a panorama of spirals, pulling circles with lower index values closer to the center--a miniature, zero-velocity solar-system.

It's flickering again.. let's lower the slope of time.

```javascript
...
let hue = time / 10000 * i % 360
...
let radius = Math.max(0, Math.sin(time / 30000 * i)) * 100
...
```

`render`:

```javascript
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
```
