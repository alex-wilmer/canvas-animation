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
