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
