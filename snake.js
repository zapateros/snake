const cvs = document.getElementById("canv");
const ctx = cvs.getContext("2d");

// blocks
var start = 100;

rad = 30;
head = {
  x : start,
  y : 100
};

dir = {
  x : 1,
  y : 0
};


// Keystates
var keyState = {};
window.addEventListener('keydown', function(e){
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function(e){
    keyState[e.keyCode || e.which] = false;
}, true);


function draw(){

  if ((keyState[37] || keyState[65]) && head.x >0){
        dir.x = -1;
        dir.y = 0;
  }
  if ((keyState[39] || keyState[68]) && head.x <570){
        dir.x = 1;
        dir.y = 0;
  }
  if ((keyState[38] || keyState[65]) && head.x >0){
        dir.y = -1;
        dir.x = 0;
  }
  if ((keyState[40] || keyState[68]) && head.x <570){
        dir.y = 1;
        dir.x = 0;
  }

  head.x = head.x + dir.x * rad;
  head.y = head.y + dir.y * rad;
// background
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.rect(0,0,600,600);
  ctx.fill();



  ctx.beginPath();
  ctx.fillStyle = "#ffcccc";
  ctx.rect(head.x, head.y, rad, rad);
  ctx.fill();


}

let game = setInterval(draw, 1000);
