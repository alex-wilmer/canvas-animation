## Step 5: Enter the Loop
#### `git checkout step-5`

### Creating A Non-Blocking, Infinitely Recursing Loop With `requestAnimationFrame`

So far we've drawn a single "frame" to our canvas. One single `render` invocation. In order to turn this into an animation we're going to need to call `render` a lot. Constantly and forever!

In order to achieve this, we're going to call a browser method called `window.requestAnimationFrame`. Calling this function will ask the browser to fetch a highly precise timestamp and give it back to us as an argument to the callback function we pass to it. Note that this is done *asynchronously*.

Our workflow will go something like this:

  - Call `render`
  - Draw a circle
  - Go fetch a high precision timestamp.
  - Call `render` again, passing it the new timestamp
  - Repeat

Let's call `window.requestAnimationFrame` at the end of `render`. The next time it's called, it will be given the timestamp as an argument.

```javascript
function render (time) {
  ...
  window.requestAnimationFrame(render)
}
```

If we called `console.log(time)` inside `render`, we would see an increasing value, flying by at 60fps.

![timestamp](http://i.imgur.com/F49t3dK.png)

### Using The Timestamp To Modify Our Variables

Besides the awesome fact that now we're rendering our circle 60 times a second, we have a (mostly) linear value which we can use to modify any other value in our code!

The `hue` value in HSL is a number between 0 and 360. Let's take the `time` and use the modulus operator so that it never goes outside of that range.

```javascript
let hue = time % 360
```

If we check the browser now, we should see our circle is rapidly cycling through the color wheel. If you find this to be a tad too rapid, you can lower the slope of `time`.

```javascript
let hue = time / 10 % 360
```

At last, our new `render` function might look like this:

```javascript
function render (time) {
  let hue = time / 10 % 360

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

  window.requestAnimationFrame(render)
}
```
