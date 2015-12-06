# Tutorial

This tutorial can be done in one of two ways. You can start from scratch by running `git checkout step-0` and writing the code yourself, or you can checkout each of the completed steps one at a time, seeing the result in the browser.

The choice is yours, though you may get more mileage by typing it out.

 - [Step 1: Getting Started](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-1-getting-started)
 - [Step 2: Hello Rectangle](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-2-hello-rectangle)
 - [Step 3: A Small Refactor](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-3-a-small-refactor)
 - [Step 4: Centered Circle](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-4-centered-circle)
 - [Step 5: Enter the Loop](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-5-enter-the-loop)
 - [Step 6: Animating Size & Position](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-6-animating-size--position)
 - [Step 7: Clean Slate](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-7-clean-slate)
 - [Step 8: Writing Waves](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-8-writing-waves)
 - [Step 9: Fill In The Loop](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-9-fill-in-the-loop)
 - [Step 10: Modify By Index](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-10-modify-by-index)
 - [Step 11: Filling In The Gaps](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-11-filling-in-the-gaps)
 - [Step 12: Final Touches](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#step-12-final-touches)
 - [The Program](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#the-program)
 - [Bonus 1: Mouse Events](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#bonus-1-mouse-events)
 - [Bonus 2: Audio Visualizer](https://github.com/alex-wilmer/canvas-animation/blob/master/tutorial/full-tutorial.md#bonus-2-audio-visualizer)

## Step 1: Getting Started
#### `git checkout step-1`

### Markup

Before we start, let's take a look at `index.html` from the root of the project:

```html
<html>
  <body>
    <style>
      html, body {
        height: 100;
        margin: 0;
        background: black;
      }
    </style>
    <canvas></canvas>
    <script src="bundle.js"></script>
  </body>
</html>
```

There's not a whole lot going on here. We set the body to take up the height of window, lose the default margin and make it black, which will provide a nice contrast for what we'll be drawing.

We create an empty `<canvas>` element which we will reference in JavaScript and will be the destination of our animation.

The `bundle.js` file is what Webpack is automatically generating for us, so we don't need to refresh the page when we make a change to our JavaScript.

### JavaScript

Next let's open up `src/app.js`. We will write the entire program in this file. If our program were longer it would be beneficial to split the code in multiple files using [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export).

```javascript
let canvas = document.querySelector(`canvas`)
```
The first thing to do is to create a reference to our `<canvas>` element. We'll the use the DOM's [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) function and pass `canvas` as a selector. If there were more than one canvas we would probably use an ID instead.

If we had followed the setup steps in the [readme](https://github.com/alex-wilmer/canvas-animation/blob/master/README.md), we should be able to go to `http://localhost:8080`, open up the developer tools (`F12` / `cmd+alt+i`), mouseover the `<canvas>` element and see an empty 300px x 150px element in the top left corner of the browser window.

![default canvas](http://i.imgur.com/oAn0Hiw.png)

Cool... but likely we'll want the canvas to fit the width and height of a particular element, or in this case, the size of the window, so let's create a function which will do that.

```javascript
function fitWindow () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

fitWindow()
```

To make sure the canvas keeps the correct proportions when we resize our window, let's set the `window.onresize` event handler to be this function we just wrote.

```javascript
window.onresize = fitWindow
```

Now when we go back to the browser, we should see our canvas has `width` & `height` properties that match the size of our window. Try resizing the window with the dev tools open and see the properties update.

![fitted canvas](http://i.imgur.com/HCDWELw.png)

## Step 2: Hello Rectangle
#### `git checkout step-2`

### Rendering to the Drawing Context

Now that the canvas is the desired size, let's get the canvas `context` using [`HTMLCanvasElement.getContext()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)

```javascript
let context = canvas.getContext(`2d`)
```
In this tutorial we're going to create a 2D animation, however `getContext` also supports [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) for doing 3D.

Now let's write a function called `render` that will actually do the drawing part.

```javascript
function render () {
  context.beginPath()
  context.fillStyle = `hsl(180, 75%, 50%)`
  context.rect(
    0, 0,
    100, 100
  )
  context.fill()
}

render()
```

`beginPath` is synonymous to saying, "Get your pen ready, we're about to draw something!".

`fillStyle` takes a string representing a color like `red` or `#367c91`. We'll use HSL so we can go through all the colors by changing a single value (hue).

`rect` is one of several "path" methods which we can use to create shapes. Later on we'll use `arc` to draw circles. The first two arguments to `rect` are the `x` and `y` coordinates, and the last two are the `width` and `height`, respectively.

Finally, `fill` is what does the actual work, telling our program to fill in a blue-ish square in the top left of the screen. You can draw outlines using the `stroke` method instead.

After we call `render` we should see this in the browser:

![hello rectangle](http://i.imgur.com/bUCHll8.png)

## Step 3: A Small Refactor
#### `git checkout step-3`

### Extracting Variables

We're going to update some values once we start rendering our application over time, so let's turn them into variables.

```javascript
function render () {
  let hue = 180
  let coordinates = [ 0, 0 ]
  let size = [ 100, 100 ]

  context.beginPath()
  context.fillStyle = `hsl(${hue}, 75%, 50%)`
  context.rect(
    ...coordinates,
    ...size
  )
  context.fill()
}

render()
```

We're using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) so we can keep our coordinates and size as neat little pairs.

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

## Step 7: Clean Slate
#### `git checkout step-7`
<br>
Right now, every `render` call is drawing on top of the last rendered state. While this makes for a cool swooshy screensaver, a lot of the time animations draw an entirely new picture each frame, "clearing" the previously rendered state.

We will add one single line to `render` to achieve this. It's a little obscure, but it gets the job done.

```javascript
canvas.width = canvas.width
```

## Step 8: Writing Waves
#### `git checkout step-8`
### Wave Transformation
So far we've been using the modulus operator to transform our linear input into a series of "sawtooth waves". Anytime `time` goes over a certain value, we bring it back to zero, so that it can rise up to this certain value again.

![sawtooth](http://www.joelstrait.com/blog/2014/6/14/saw.png)

What if we wanted to transform our `time` values to look more like a "sin wave".

![sin](http://www.joelstrait.com/blog/2014/6/14/sine.png)

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

## Step 12: Final Touches
#### `git checkout step-12`
<br>
Our animation could use some depth--the feeling that objects in the distance are further away. Let's change the 100px modifier on the radius to be a factor of a given circle's closeness to the origin, or in other words, its index value.

This is the `radius` value from the last step:

```javascript
let radius = Math.max(0, Math.sin(time / 30000 * i)) * 100
 ```

Changing the hardcoded value, `100`, to `i`:

```javascript
let radius = Math.max(0, Math.sin(time / 30000 * i)) * i
```
![depth](http://i.imgur.com/iAm5eae.png)

Let's reduce the slope of increase in half.

```javascript
let radius = Math.max(0, Math.sin(time / 30000 * i)) * i / 2
```

![final](http://i.imgur.com/zoNJybp.png)

## The Program

```javascript
// Setup

let canvas = document.querySelector(`canvas`)

function fitWindow () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

fitWindow()

window.onresize = fitWindow

// The fun part!

let context = canvas.getContext(`2d`)

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

    let radius = Math.max(0, Math.sin(time / 30000 * i)) * i / 2

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

render()
```

## Bonus 1: Mouse Events

Let's make our animation.. interactive! This is a browser "application" after all.

```javascript
let mouse = { x: 0, y: 0 }

window.onmousemove = event =>
  mouse = { x: event.clientX, y: event.clientY }
```

Now when we move our mouse around, we're capturing the cursor's coordinates, which we can use to manipulate other variables.

```javascript
let dots = mouse.x
let hue = time / i * mouse.y / 150 % 360
```

Try out different combinations!

## Bonus 2: Audio Visualizer
### `git checkout audio`
<br>

Wouldn't it be pretty cool if our animation responded to audio data? Let's use the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to stream some music, analyzing its frequency data and using that information to modify our animation.

For this bonus step, we're going to serve an audio file from Express, though the same technique can be used to stream audio from a different source.

First let's install `express` and `cors`...

```
npm install express cors
```

...then write our server file.

```javascript
var fs = require('fs')
var path = require('path')
var express = require('express')
var cors = require('cors')

var app = express()
app.use(cors())
//
var filepath = path.join(`${__dirname}/audio.mp3`)

app.get(`/music`, (req, res) => {
  res.set({ [`Content-Type`]: `audio/mpeg` })
  var readStream = fs.createReadStream(filepath)
  readStream.pipe(res)
})

app.listen(
  5000,
  () => console.log('Broadcasting on port 5000.')
)
```

In the above example, we'll need to put an audio file called `audio.mp3` in our root directory.

We're creating an endpoint at `localhost:5000/music` that will stream our audio file to the requester.

Now let's update `app.js` to make the request and decode the stream into audio data we can play and analyze.

> Note:
I prefer to use `async/await` over promises, so I've installed `babel-polyfill`.

Let's create the audio context and from that create source and analyser nodes.

```javascript
let audioContext = new AudioContext()
let source = audioContext.createBufferSource()
let analyser = audioContext.createAnalyser()
```

Next let's make a request to our server and decode the data that comes back. Once the data is decoded we'll hook up our nodes and start the music!

```javascript
async () => {
  let response = await fetch(`http://localhost:5000/music`)
  let stream = await response.arrayBuffer()

  function play (data) {
    source.buffer = data
    source.connect(analyser)
    source.connect(audioContext.destination)
    source.start(0)
  }

  audioContext.decodeAudioData(stream, play)
}()
```

We'll need our analyser node to create useful values from our audio source, so let's set that up.

```javascript
analyser.fftSize = 32
let dataArray = new Uint8Array(analyser.frequencyBinCount)
```

With that setup, we can poll the `dataArray` on every `render`. We'll take a random slice from it, and use that as our level.

```javascript
function render (time) {
  ...
  analyser.getByteTimeDomainData(dataArray)
  let level = Math.max(0, (dataArray[5]) * 4
  let dots = level
  let hue = level
  ...
}

```

[Audio Visualizer Demo](http://45.55.239.144:8000/)
