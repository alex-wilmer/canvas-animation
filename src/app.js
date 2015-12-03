
  var canvas = document.querySelector('canvas'),
  	context = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var config = {
      time: 7e7,
      size: 400,
      dots: 1,
  	blend: 'screen'
  }

  var mouse = {x:0, y: 0};

  function render(t) {

    var t = config.time + t;

    canvas.width = canvas.width;

    let oX = canvas.width / 2
    let oY = canvas.height / 2

  	var size = Math.min(canvas.width, canvas.height) *.40;


    for (var i=0; i<config.dots; i++) {

        var r = (size/config.dots * i),
            a = i * (Math.PI*(3 - Math.sqrt(5))),
            s = 0.15 * Math.sin(t*(i/config.dots)/100),
            sz =  Math.max(0, (r * s) + Math.sqrt(r));

        context.beginPath();
        context.fillStyle = 'hsl('+(i*Math.tan(t/10000))+', 100%, 50%)';
        context.arc(oX + Math.sin(a+Math.PI*(mouse.x/canvas.width)) * (r), oY +
					Math.cos(a+Math.PI*(mouse.y/canvas.height)) * (r), sz/2, 0, 2*Math.PI);
        context.fill();
    }

    return requestAnimationFrame(render);
  }

  render();

  window.onmouseover = function(e) {
      mouse = {x: e.clientX, y: e.clientY};
  };

  window.onmousemove = function(e) {
      mouse = {x: e.clientX, y: e.clientY};
  };

  window.onresize = function(e) {
  	canvas.width = window.innerWidth;
  	canvas.height = window.innerHeight;
  };
