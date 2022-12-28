const rows = 10; // number of rows in the grid
const cols = 10; // number of columns in the grid

let grid = []; // 2D array to represent the grid

for (let i = 0; i < rows; i++) {
  grid[i] = []; // create an empty array for each row
  for (let j = 0; j < cols; j++) {
    grid[i][j] = ' '; // initialize each element in the row with a space
  }
}

// generate a random color for each element in the grid
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    grid[i][j] = getRandomColor();
  }
}

function getRandomColor() {
  // generate a random number between 0 and 5
  let r = Math.floor(Math.random() * 6);
  // return a color based on the random number
  switch (r) {
    case 0:
      return 'red';
    case 1:
      return 'orange';
    case 2:
      return 'yellow';
    case 3:
      return 'green';
    case 4:
      return 'blue';
    case 5:
      return 'purple';
  }
}

// function to check if there are 3 or more matching blocks in a row
function checkForMatches() {
  // check each row for matches
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols - 2; j++) {
      // check if the current block is the same color as the next two blocks
      if (grid[i][j] === grid[i][j+1] && grid[i][j] === grid[i][j+2]) {
        // remove the matching blocks
        grid[i][j] = ' ';
        grid[i][j+1] = ' ';
        grid[i][j+2] = ' ';
      }
    }
  }
  // check each column for matches
  for (let i = 0; i < rows - 2; i++) {
    for (let j = 0; j < cols; j++) {
      // check if the current block is the same color as the next two blocks
      if (grid[i][j] === grid[i+1][j] && grid[i][j] === grid[i+2][j]) {
        // remove the matching blocks
        grid[i][j] = ' ';
        grid[i+1][j] = ' ';
        grid[i+2][j] = ' ';
      }
    }
  }
}

// function to move the blocks down until they reach the bottom of the grid
function moveBlocksDown() {
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = 0; j < cols; j++) {
      // if the current block is empty, find the first non-empty block above it and swap them
      if (grid[i][j] === ' ')
for (let k = i - 1; k >= 0; k--) {
        if (grid[k][j] !== ' ') {
          let temp = grid[i][j];
          grid[i][j] = grid[k][j];
          grid[k][j] = temp;
          break;
        }
      }
    }
  }
}

// function to draw the grid to the screen
function drawGrid() {
  let output = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      output += `[${grid[i][j]}]`;
    }
    output += '\n';
  }
  console.log(output);
}

// main game loop
while (true) {
  checkForMatches();
  moveBlocksDown();
  drawGrid();
  // pause for 1 second before the next iteration
  await new Promise(resolve => setTimeout(resolve, 1000));
}
