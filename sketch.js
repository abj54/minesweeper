//var cell = new Cell();
var grid = [];

var beecount;

function makegrid(rows, cols) {
  var regrid = new Array(rows);
  for (var i = 0; i < rows; i++) {
    //for (var j = 0; j < cols; j++) {
    regrid[i] = new Array(cols);
    //}
  }
  return regrid;
}

var w = 20;
var rows;
var cols;


function setup() {
  createCanvas(501, 501);
  cols = floor(height / w);
  rows = floor(width / w);
  while (true) {
    beecount = prompt("Number of bees (<625)= ");
    if (beecount >= rows * cols) {
      alert("Less than 625 dumbass");
    } else {
      break
    }
  }
  grid = makegrid(rows, cols);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i, j, w);

    }
  }
  for (var a = 0; a < beecount; a++) {
    var i = floor(random(rows));
    var j = floor(random(cols));
    if (grid[i][j].bomb) {
      a--;
    } else {
      grid[i][j].bomb = true;
    }
  }
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].countbombs();
    }
  }



}



function draw() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      if (grid[i][j].surroundbomb == 0 && grid[i][j].open) {
        grid[i][j].nobee();
      }


      if (grid[i][j].bomb && grid[i][j].open) {
        for (var a = 0; a < rows; a++) {
          for (var b = 0; b < cols; b++) {
            if (grid[a][b].bomb) {
              grid[a][b].nowopen();
            }
          }
        }
      }
    }
  }
}





function mousePressed() {
  var mx = mouseX;
  var my = mouseY;
  var i = floor(mx / w);
  var j = floor(my / w);
  if (i >= 0 && j >= 0 && i < rows && j < cols) {
    //console.log(i, j);
    grid[i][j].nowopen();
  }

}
