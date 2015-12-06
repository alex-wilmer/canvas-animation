## Step 9: Fill In The Loop
#### `git checkout step-9`

### Drawing Circles `n` times per `render`

What if we wanted to draw more than one circle per frame?

```javascript
function render (time) {
  ...
  let dots = 20

  for (let i = 0; i < dots; i += 1) {
    ...
    context.fill()
  }

  window.requestAnimationFrame(render)
```

All of the tasks that occur in `render` are synchronous, with the exception of `requestAnimationFrame`. Every `fill` in the `for` loop is "batched" up until `requestAnimationFrame` is called, drawing 20 circles (`dots`) at once.

Inside of the `for` loop, we can use iterator (`i`) to modify our variables independently for each circle.

One possibility is to modify the coordinates of each circle, such that they form a circle

```javascript
let coordinates = [
  originX + Math.sin(i),
  originY + Math.cos(i)
]
```

Remember that `sin` and `cos` return values between -1 and 1, so let's multiply that effect.

```javascript
let coordinates = [
  originX + Math.sin(i) * 200,
  originY + Math.cos(i) * 200
]
```

Now we've "batched" up 20 circles, formed in a circular shape around our origin.

The circles are rather big for this arrangement, so let's divide the radius down by 5.

```javascript
context.arc(
  ...coordinates,
  radius / 5,
  ...angle
)
```

`render` should look something like this now:

```javascript
function render (time) {
  canvas.width = canvas.width

  let originX = canvas.width / 2
  let originY = canvas.height / 2

  let dots = 20

  for (let i = 0; i < dots; i += 1) {
    let hue = time / 10 % 360

    let coordinates = [
      originX + Math.sin(i) * 200,
      originY + Math.cos(i) * 200
    ]

    let radius = Math.max(0, Math.sin(time / 100)) * 100
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
```

The browser should look something like this:

![circle of circles](http://i.imgur.com/q0H1mHC.png)
