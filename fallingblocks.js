const BLOCK_SIZE = 50; // size of each block in pixels
const NUM_COLUMNS = 10; // number of columns in the grid
const NUM_ROWS = 20; // number of rows in the grid

// create a 2D array to represent the grid
let grid = [];
for (let i = 0; i < NUM_ROWS; i++) {
  grid[i] = [];
  for (let j = 0; j < NUM_COLUMNS; j++) {
    grid[i][j] = null; // initially fill the grid with null values
  }
}

// generate a random block at the top of the grid
function generateBlock() {
  let block = {
    x: Math.floor(Math.random() * NUM_COLUMNS), // random x position
    y: 0, // y position at the top of the grid
    color: Math.random() > 0.5 ? 'primary' : 'secondary' // random primary or secondary color
  };
  grid[block.y][block.x] = block; // add the block to the grid
}

// check for blocks of the same color that are adjacent to each other
function checkAdjacent(x, y) {
  let color = grid[y][x].color;
  let adjacent = [[1,0], [-1,0], [0,1], [0,-1]]; // array of x,y positions to check
  let count = 1; // start at 1 because the block being checked is included
  let checked = [[y,x]]; // array to keep track of blocks that have been checked
  let toCheck = [[y,x]]; // array of blocks to check next
  while (toCheck.length > 0) {
    let check = toCheck.pop();
    for (let i = 0; i < adjacent.length; i++) {
      let y2 = check[0] + adjacent[i][1];
      let x2 = check[1] + adjacent[i][0];
      if (y2 >= 0 && y2 < NUM_ROWS && x2 >= 0 && x2 < NUM_COLUMNS && grid[y2][x2] && grid[y2][x2].color == color && !checked.includes([y2,x2])) {
        // if the block is within the grid and is the same color and has not been checked, add it to the count and the arrays of checked and toCheck blocks
        count++;
        checked.push([y2,x2]);
        toCheck.push([y2,x2]);
      }
    }
  }
  if (count >= 3) {
    // if there are 3 or more blocks of the same color, remove them from the grid
    for (let i = 0; i < checked.length; i++) {
      grid[checked[i][0]][checked[i][1]] = null;
    }
  }
}

// move all the blocks down to the lowest possible position
function moveDown() {
  for (let i = NUM_ROWS - 1; i >= 0; i--) {
    for (let j = 0; j < NUM_COLUMNS; j++) {
      if (grid[i][j]) { // if there is a block in the current position
        let y = i;
        while (y + 1 < NUM_ROWS && !grid[y + 1][j]) { // move the block down as long as there is an empty space below it
          y++;
        }
        if (y != i) { // if the block has moved, update the grid
          grid[y][j] = grid[i][j];
          grid[i][j] = null;
          grid[y][j].y = y;
        }
      }
    }
  }
}

// main game loop
function update() {
  generateBlock(); // generate a new block at the top of the grid
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLUMNS; j++) {
      if (grid[i][j]) {
        checkAdjacent(j, i); // check for blocks of the same color that are adjacent to each other
      }
    }
  }
  moveDown(); // move all the blocks down to the lowest possible position
  draw(); // draw the grid
  requestAnimationFrame(update); // loop the game
}

// draw the grid on the canvas
function draw() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLUMNS; j++) {
      if (grid[i][j]) {
        ctx.fillStyle = grid[i][j].color == 'primary' ? 'red' : 'blue'; // set the fill color based on the block's color
        ctx.fillRect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); // draw the block
      }
    }
  }
}

update(); // start the game
