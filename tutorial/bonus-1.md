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
