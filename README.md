# Minimalist App Starter

Sometimes I just want to write something from scratch... but it needs Babel, obviously, and I don't want to be refreshing anything so I'm using Webpack.

```
npm install -g webpack webpack-dev-server
npm install
npm start
```

Then go to `localhost:8080`.

When you're happy and it's time to ship, run:

```
webpack -p
```

This will create a minified version of `bundle.js`. Then you can simply open `index.html` in your browser and enjoy the fruits of your labor.
