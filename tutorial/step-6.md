## Step 6: Animating Size & Position
#### `git checkout step-6`

<br>

Let's use `time` to modify some more variables.

```javascript
let coordinates = [ time, time ]
```

What if we set the `x` and `y` values to equal the current value of time. We would start with some low values like `[30, 30]` and continue increasing all the way up to `[5000, 5000]` and so on, drawing circles starting in the upper left moving diagonally to the lower right, continuing on well beyond the edge of the screen.

Let's use modulus again, this time by the canvas' width and height.

```javascript
let coordinates = [
  time % canvas.width,
  time % canvas.height
]
```

While we're at it, let's modify the radius by `time` modulus 100. `time` is going by pretty fast so let's lessen the slope like we did with `hue`.

```javascript
let radius = time / 10 % 100
```

Here's `render` after these changes:


```javascript
function render (time) {
  let hue = time / 10 % 360

  let originX = canvas.width / 2
  let originY = canvas.height / 2

  let coordinates = [
    time % canvas.width,
    time % canvas.height
  ]

  let radius = time / 10 % 100
  let angle = [ 0, Math.PI * 2 ]

  context.beginPath()
  context.fillStyle = `hsl(${hue}, 75%, 50%)`
  context.arc(
    ...coordinates,
    radius,
    ...angle
  )
  context.fill()

  window.requestAnimationFrame(render)
}
```

If we let this run for a short while, we should see a nice screen-saver like swooshes.

![swooshes](http://i.imgur.com/o2sXKb4.png)
