/**
 * A Simple Solution to Sudoku
 */
let solve = (list) => {
  // definition
  let cells = Array(81)
  let rows = Array(9).fill(0).map(_ => [])
  let cols = Array(9).fill(0).map(_ => [])
  let grids = Array(9).fill(0).map(_ => [])

  // set
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      let grid = row - row % 3 + col / 3 << 0;
      let cell = cells[row * 9 + col] = {
        row: row,
        col: col,
        grid: grid,
        value: list[row][col]
      };
      rows[row].push(cell);
      cols[col].push(cell);
      grids[grid].push(cell);
    }
  }
  // 将与当前项有联系的（同行row同列col同网格grid）放在当前项的groups当中
  cells.forEach(function (cell) {
    let arr = cell.groups = [cell];
    rows[cell.row].concat(cols[cell.col]).concat(grids[cell.grid]).forEach(function (obj) {
      if (arr.indexOf(obj) === -1) {
        arr.push(obj);
      }
    });
    arr.shift();
  });
  let results = [];
  let time = 0;

  solve(0);

  function solve(n) {
    if (results.length) return
    time++;
    // solved
    if (n === 81) {
      // return cell.value
      let result = cells.map(function (cell) {
        return cell.value;
      });
      for (let i = result.length - 1; i >= 0; i--) {
        if (i % 9 == 0) result.splice(i, 0, '\n');
        result.splice(i, 0, ' ')
      }
      result = result.join("");
      results.push(result);
      return;
    }
    let cell = cells[n];
    if (cell.value) {
      solve(n + 1);
    } else {
      for (let i = 1; i <= 9; i++) {
        // Judging 'i' in current 'groups'
        let exist = cell.groups.some(function (obj) {
          return obj.value === i;
        });
        // next for
        if (exist) continue;
        cell.value = i;
        solve(n + 1);
      }
      cell.value = 0;
    }
  }
  return results
}

module.exports.solve = solve