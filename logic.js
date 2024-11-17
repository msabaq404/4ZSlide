let m = 2,
  n = 5;

function createGrid(rows = 2, cols = 5) {
  (m = rows), (n = cols);
  let grid = new Array(m).fill().map(() => new Array(n).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      grid[i - 1][j - 1] = n * (i - 1) + j;
    }
  }
  grid[m - 1][n - 1] = 0;
  return grid;
}

function getTileToSlide(lastTileSlided, nullTile = [m - 1, n - 1]) {
  let [nullRow, nullCol] = nullTile;
  let top = nullRow > 0 ? [nullRow - 1, nullCol] : null;
  let bottom = nullRow < m - 1 ? [nullRow + 1, nullCol] : null;
  let left = nullCol > 0 ? [nullRow, nullCol - 1] : null;
  let right = nullCol < n - 1 ? [nullRow, nullCol + 1] : null;
  let filtered = [top, bottom, left, right].filter((option) => option !== null);
  let options = filtered.filter(
    (option) =>
      !(option[0] === lastTileSlided[0] && option[1] === lastTileSlided[1])
  );
  if (options.length === 0) options = filtered;
  if (options.length === 0) options = [nullTile];

  let randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function slide(grid, from, to) {
  let temp = grid[to[0]][to[1]];
  grid[to[0]][to[1]] = grid[from[0]][from[1]];
  grid[from[0]][from[1]] = temp;
}

function shuffleGrid(grid, degree = 5008) {
  let nullTile = [m - 1, n - 1],
    lastTileSlided = [m - 1, n - 1];
  while (degree != 0) {
    let tileToSlide = getTileToSlide(lastTileSlided, nullTile);
    slide(grid, tileToSlide, nullTile);
    lastTileSlided = nullTile.slice();
    nullTile = tileToSlide.slice();
    degree--;
  }
  return nullTile;
}