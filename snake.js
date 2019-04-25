const cvs = document.getElementById("canv");
const ctx = cvs.getContext("2d");

var highscore = localStorage.getItem("highscore");
var dr;
var new_snack = 1;
var score = 0;
var cds_x = [10, 10, 10];
var cds_y = [1, 2, 3];
rad = 30;
dir = {
  x : 0,
  y : 1
};

// Keystates
window.addEventListener('keydown', function(e){
  dr = e.keyCode;
}, true);

document.addEventListener('keyup', function(e){
  if(e.keyCode == 32)
    window.location.reload();
})

function draw(){
  // find and set direction
  if (dr == 37 && dir.x == 0){
        dir.x = -1;
        dir.y = 0;
  }
  if (dr == 39 && dir.x == 0){
        dir.x = 1;
        dir.y = 0;
  }
  if (dr == 38 && dir.y == 0){
        dir.y = -1;
        dir.x = 0;
  }
  if (dr == 40 && dir.y == 0){
        dir.y = 1;
        dir.x = 0;
  }

  // create a nice snack
  if(new_snack == 1){
    snack_x = Math.floor(Math.random() * (600/rad));
    snack_y = Math.floor(Math.random() * (600/rad));
    new_snack = 0;
  }

  // head before position
  var lng = cds_x.length;
  var head_x = cds_x[lng - 1];
  var head_y = cds_y[lng - 1];

  // add new head
  cds_x.push(head_x + dir.x);
  cds_y.push(head_y + dir.y);

  // remove tailblock, unless you caught a snack
  if(head_x == snack_x && head_y == snack_y){
    new_snack = 1;
    score++;
  }else{
    cds_x.shift();
    cds_y.shift();
  }

  // head after position
  var lng = cds_x.length;
  var head_x = cds_x[lng - 1];
  var head_y = cds_y[lng - 1];

  // check hits
  if(head_x < 0 | head_x > (600/rad -1) | head_y < 0 | head_y > (600/rad - 1)){
    clearInterval(game);
  }
  for(var i = 0; i < lng-1; i++){
    if(cds_x[i] == head_x && cds_y[i] == head_y){
      clearInterval(game);
    }
  }

  // background
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.rect(0,0,600,600);
  ctx.fill();

  // plot snack
  ctx.beginPath();
  ctx.fillStyle = "#0cba9f";
  ctx.rect(snack_x * rad, snack_y * rad, rad, rad);
  ctx.fill();

  // plot all snakeblocks from array
  for(var i = 0; i <= lng; i++){
    var i_x = cds_x[i];
    var i_y = cds_y[i];
    ctx.beginPath();
    ctx.strokeStyle = "#27262e";
    ctx.lineWidth = "2";
    ctx.rect(i_x * rad, i_y * rad, rad, rad);
    ctx.stroke();
  }
  // head
  ctx.beginPath();
  ctx.fillStyle = "#27262e";
  ctx.rect(cds_x[lng-1] * rad, cds_y[lng-1] * rad, rad, rad);
  ctx.fill();

  if(highscore !== null){
     if (score > highscore) {
         localStorage.setItem("highscore", score);
     }
  }else{
     localStorage.setItem("highscore", score);
  }

  ctx.fillStyle = "#27262e";
  ctx.font = "20px Arial";
  ctx.fillText("Score: "+score,10,25);
  ctx.fillText("Highscore: "+highscore,10,50);
}

let game = setInterval(draw, 80);
