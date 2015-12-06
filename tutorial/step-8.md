## Step 8: Writing Waves
#### `git checkout step-8`
### Wave Transformation
So far we've been using the modulus operator to transform our linear input into a series of "sawtooth waves". Anytime `time` goes over a certain value, we bring it back to zero, so that it can rise up to this certain value again.

![sawtooth](http://www.joelstrait.com/blog/2014/6/14/saw.png)

What if we wanted to transform our `time` values to look more like a "sin wave".

![sin](http://www.joelstrait.com/blog/2014/6/14/sine.png)
*Images from http://www.joelstrait.com/*

JavaScript's `Math` object provides standard trigonometric functions that take values represented as radians, and returns a number between -1 and 1.

```javascript
Math.sin(0) // 0
Math.cos(0) // 1

Math.sin(Math.PI) // 1.2246467991473532e-16
Math.cos(Math.PI) // -1
```

`1.2246467991473532e-16` is an unexpected result! Due to the way floating point values are calculated in JavaScript, this particular calculation is little off, however the result is so close to `0`, that it's good enough.

Even though `time` does not really represent radians, we can still pass it to `sin` and `cos` to transform it into a "sin wave". A "cos wave" has the same shape, only starting at a different point on the wave.

### Modifying The Radius With A Sine Wav Transformation On `time`

Let's put the circle back in the center for now, but this time set the radius' value to be the outcome of passing `time` to `Math.sin`.

```javascript
let radius = Math.sin(time)
```

Calling `Math.sin(time)` in our loop will give us a stream of values between -1 and 1. To make these values sensible as a radius, let's remove all values below 0, and multiply the rest by 100.

```javascript
let radius = Math.max(0, Math.sin(time)) * 100
```

This works, but our "time to radius" slope is far too high, causing our circle to flicker wildly. Let's bring that down by a factor of 100.

```javascript
let radius = Math.max(0, Math.sin(time / 100)) * 100
```

Now our circle is growing and shrinking for the half the time, and being too small to be seen for the other half--its size following the course of a sine wave.

Here's `render` now:

```javascript
function render (time) {
  canvas.width = canvas.width

  let hue = time / 10 % 360

  let originX = canvas.width / 2
  let originY = canvas.height / 2
  let coordinates = [
    originX,
    originY
  ]

  let radius = Math.max(0, Math.sin(time / 100)) * 100
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
