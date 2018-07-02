function Cell(i, j, w) {

  //this.i = 0;
  //this.j = 0;
  this.i = i;
  this.j = j;
  this.w = w;
  this.x = i * w;
  this.y = j * w;
  this.surroundbomb = 0;
  /*if (random(1) < 0.5) {
    this.bomb = true;
  } else {
    this.bomb = false;
  }*/
  this.bomb = false;
  this.open = false;

}

Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.open) {
    if (this.bomb) {
      fill(150);
      ellipse(this.x + 12, this.y + 12, this.w / 1.5, this.w / 1.5);
    } else {
      fill(180);
      rect(this.x, this.y, this.w, this.w);
      if (this.surroundbomb != 0) {
        fill(0);
        textSize(12);
        text(this.surroundbomb, this.x + 10, this.y + 15);
      }
    }
  }
}

Cell.prototype.nowopen = function() {
  this.open = true;

}

Cell.prototype.nobee = function() {
  for (var m = -1; m <= 1; m++) {
    for (var n = -1; n <= 1; n++) {
      var a = m + this.i;
      var b = n + this.j;
      if (a >= 0 && b >= 0 && a < cols && b < rows) {
        if (!grid[a][b].bomb && !grid[a][b].open) {
          grid[a][b].nowopen();
        }
      }
    }
  }
}

Cell.prototype.countbombs = function() {
  for (var m = -1; m <= 1; m++) {
    for (var n = -1; n <= 1; n++) {
      var a = m + this.i;
      var b = n + this.j;
      if (a >= 0 && b >= 0 && a < cols && b < rows) {
        if (grid[a][b].bomb) {
          this.surroundbomb++;
        }
      }
    }
  }
}
