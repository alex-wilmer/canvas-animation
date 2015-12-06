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
