## Step 7: Clean Slate
#### `git checkout step-7`
<br>
Right now, every `render` call is drawing on top of the last rendered state. While this makes for a cool swooshy screensaver, a lot of the time animations draw an entirely new picture each frame, "clearing" the previously rendered state.

We will add one single line to `render` to achieve this. It's a little obscure, but it gets the job done.

```javascript
canvas.width = canvas.width
```
