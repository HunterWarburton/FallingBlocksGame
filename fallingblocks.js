function generateGrid(numRows, numColumns) {
let grid = [];
for (let i = 0; i < numRows; i++) {
let row = [];
for (let j = 0; j < numColumns; j++) {
let color = Math.random() > 0.5 ? "primary" : "secondary";
let block = {color: color};
row.push(block);
}
grid.push(row);
}
return grid;
}

//Next, we need to create a function to check for blocks of the same color that are adjacent to each other. We will do this by iterating through the grid and checking each block's neighbors. If we find 3 or more blocks of the same color, we will mark them for destruction.

function checkForMatches(grid) {
let numRows = grid.length;
let numColumns = grid[0].length;
for (let i = 0; i < numRows; i++) {
for (let j = 0; j < numColumns; j++) {
let block = grid[i][j];
// check for matching blocks to the right
if (j < numColumns - 2 && block.color === grid[i][j + 1].color && block.color === grid[i][j + 2].color) {
block.destroy = true;
grid[i][j + 1].destroy = true;
grid[i][j + 2].destroy = true;
}
// check for matching blocks below
if (i < numRows - 2 && block.color === grid[i + 1][j].color && block.color === grid[i + 2][j].color) {
block.destroy = true;
grid[i + 1][j].destroy = true;
grid[i + 2][j].destroy = true;
}
}
}
}

//Now we need to create a function to destroy the marked blocks and move all the blocks down to fill in the empty spaces.

function destroyBlocks(grid) {
let numRows = grid.length;
let numColumns = grid[0].length;
// destroy marked blocks
for (let i = 0; i < numRows; i++) {
for (let j = 0; j < numColumns; j++) {
if (grid[i][j].destroy) {
grid[i][j] = null;
}
}
}
// move blocks down to fill in empty spaces
for (let j = 0; j < numColumns; j++) {
let numEmptySpaces = 0;
for (let i = numRows - 1; i >= 0; i--) {
if (grid[i][j] === null) {
numEmptySpaces++;
} else if (numEmptySpaces > 0) {
grid[i + numEmptySpaces][j] = grid[i][j];
grid[i][j] = null;
}
}
}
}

//Finally, we can create a function to run the game loop. This function will generate the grid, check for matches, destroy the marked blocks, and repeat until there are no more matches.

function runGame() {
let grid = generateGrid(10, 10);
let hasMatches = true;
while (hasMatches) {
checkForMatches(grid);
destroyBlocks(grid);
hasMatches = false;
for (let i = 0; i < grid.length; i++) {
for (let j = 0; j < grid[0].length; j++) {
if (grid[i][j] && grid[i][j].destroy) {
hasMatches = true;
break;
}
}
if (hasMatches) {
break;
}
}
}
}

//To run the game, we just need to call the "runGame" function.

runGame();

function renderGrid(grid) {
let table = document.createElement("table");
for (let i = 0; i < grid.length; i++) {
let row = document.createElement("tr");
for (let j = 0; j < grid[0].length; j++) {
let cell = document.createElement("td");
if (grid[i][j]) {
cell.classList.add(grid[i][j].color);
}
row.appendChild(cell);
}
table.appendChild(row);
}
document.body.appendChild(table);
}

//We can then call the "renderGrid" function after each iteration of the game loop in the "runGame" function.

function runGame() {
let grid = generateGrid(10, 10);
let hasMatches = true;
while (hasMatches) {
checkForMatches(grid);
destroyBlocks(grid);
hasMatches = false;
for (let i = 0; i < grid.length; i++) {
for (let j = 0; j < grid[0].length; j++) {
if (grid[i][j] && grid[i][j].destroy) {
hasMatches = true;
break;
}
}
if (hasMatches) {
break;
}
}
renderGrid(grid);
}
}

//Now when we run the game, we should see the grid of blocks displayed on the page, with the matching blocks disappearing and the remaining blocks falling down to fill in the empty spaces.
