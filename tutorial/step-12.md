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
