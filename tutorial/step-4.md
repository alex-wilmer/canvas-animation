## Step 4: Centered Circle
#### `git checkout step-4`

<br>

Let's make two small changes to `render`.

First let's define our own origin to be the canvas center, and use that for our coordinates.

```javascript
let originX = canvas.width / 2
let originY = canvas.height / 2
let coordinates = [ originX, originY ]
```

Next let's use `context`'s `arc` method to draw a circle.

`arc` takes 5 arguments. The first two are the same as `rect`, the `x` and `y` coordinates. The 3rd argument is the radius (size from center to edge), and the final two arguments are the starting angle and ending angle, given in radians. A full circle goes from `0` to `Math.PI * 2`.

Our render function should look like something like this now:

```javascript
function render () {
  let hue = 180

  let originX = canvas.width / 2
  let originY = canvas.height / 2
  let coordinates = [ originX, originY ]

  let radius = 100
  let angle = [ 0, Math.PI * 2 ]

  context.beginPath()
  context.fillStyle = `hsl(${hue}, 75%, 50%)`
  context.arc(
    ...coordinates,
    radius,
    ...angle
  )
  context.fill()
}
```

And the browser should look like this:

![centered circle](http://i.imgur.com/BWgENy0.png)
