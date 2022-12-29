let numRows = 6;
let numColumns = 6;
let id = 0;
let colors = ["red", "blue", "green", "orange", "purple", "yellow"];
let selectedBlock = null;

function generateGrid(numRows, numColumns) {
let grid = [];
let id = 0;
for (let i = 0; i < numRows; i++) {
let row = [];
for (let j = 0; j < numColumns; j++) {
let color = colors[Math.floor(Math.random() * colors.length)];
row.push({color: color, id: id});
id++;
}
grid.push(row);
}
return grid;
}



//Next, we need to create a function to check for blocks of the same color that are adjacent to each other. We will do this by iterating through the grid and checking each block's neighbors. If we find 3 or more blocks of the same color, we will mark them for destruction.

function checkForMatches(grid) {
// check rows
for (let i = 0; i < grid.length; i++) {
for (let j = 0; j < grid[0].length; j++) {
if (grid[i][j]) {
let color = grid[i][j].color;
if (j < grid[0].length - 2 && grid[i][j+1] && grid[i][j+2] && grid[i][j+1].color == color && grid[i][j+2].color == color) {
grid[i][j].destroy = true;
grid[i][j+1].destroy = true;
grid[i][j+2].destroy = true;
}
}
}
}
// check columns
for (let i = 0; i < grid.length; i++) {
for (let j = 0; j < grid[0].length; j++) {
if (grid[i][j]) {
let color = grid[i][j].color;
if (i < grid.length - 2 && grid[i+1][j] && grid[i+2][j] && grid[i+1][j].color == color && grid[i+2][j].color == color) {
grid[i][j].destroy = true;
grid[i+1][j].destroy = true;
grid[i+2][j].destroy = true;
}
}
}
}
}

//Now we need to create a function to destroy the marked blocks and move all the blocks down to fill in the empty spaces.

function destroyBlocks(grid) {
// fill in empty spaces with existing blocks
for (let i = grid.length - 1; i >= 0; i--) {
for (let j = 0; j < grid[0].length; j++) {
if (!grid[i][j]) {
let k = i;
while (k > 0 && !grid[k][j]) {
k--;
}
grid[i][j] = grid[k][j];
grid[k][j] = null;
}
}
}
// create new blocks
for (let i = 0; i < grid.length; i++) {
for (let j = 0; j < grid[0].length; j++) {
if (grid[i][j] && grid[i][j].destroy) {
let color = colors[Math.floor(Math.random() * colors.length)];
grid[i][j] = {color: color, id: id};
id++;
}
}
}
}


function handleBlockClick(row, column, grid) {
let table = document.querySelector("table");
if (!selectedBlock) {
selectedBlock = {row: row, column: column};
table.rows[row].cells[column].classList.add("selected");
} else {
// attempt to swap blocks
let temp = grid[selectedBlock.row][selectedBlock.column];
grid[selectedBlock.row][selectedBlock.column] = grid[row][column];
grid[row][column] = temp;
table.rows[selectedBlock.row].cells[selectedBlock.column].classList.remove("selected");
selectedBlock = null;
}
// check for matches and destroy blocks
checkForMatches(grid);
destroyBlocks(grid);
// remove existing table element
document.body.removeChild(table);
// render updated grid
document.body.appendChild(renderGrid(grid));
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
cell.classList.add("block");
cell.style.backgroundColor = grid[i][j].color;
cell.innerHTML = grid[i][j].id;
}
cell.addEventListener("click", function() {
handleBlockClick(i, j, grid);
});
row.appendChild(cell);
}
table.appendChild(row);
}
return table;
}

//We can then call the "renderGrid" function after each iteration of the game loop in the "runGame" function.

function runGame() {
	console.log("runGame");
let grid = generateGrid(numRows, numColumns);
document.body.appendChild(renderGrid(grid));
let hasMatches = true;
while (hasMatches) {
hasMatches = false;
checkForMatches(grid);
destroyBlocks(grid);
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

//let grid = generateGrid(numRows, numColumns);
//document.body.appendChild(renderGrid(grid));
//Now when we run the game, we should see the grid of blocks displayed on the page, with the matching blocks disappearing and the remaining blocks falling down to fill in the empty spaces.
