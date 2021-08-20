import React from "react";
import { createContainer } from 'unstated-next';
import type { ICell } from '@/types'

const global = () => {
  const [cells, setCells] = React.useState<ICell[]>(new Array(81)) // 平铺数据
  const [rows, setRows] = React.useState<ICell[][]>(new Array(9).fill(0).map(_ => []))
  const [cols, setCols] = React.useState<ICell[][]>(new Array(9).fill(0).map(_ => []))
  const [grids, setGrids] = React.useState<ICell[][]>(new Array(9).fill(0).map(_ => []))
  const [editableCell, setEditableCell] = React.useState<ICell | undefined>()

  const oprateInitData = (data: number[][]) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const grid = row - row % 3 + col / 3 << 0;
        const gIndex = col % 3 * 3 + row % 3;
        let cell: ICell = {
          index: row * 9 + col,
          row, 
          col, 
          grid,
          gIndex,
          disabled: !!data[row][col],
          value: data[row][col] || undefined
        }
        cells[row * 9 + col] = cell;
        rows[row][col] = cell;
        cols[col][row] = cell;
        grids[grid][gIndex] = cell;
      }
    }
    setCells([...cells])
    setRows([...rows])
    setCols([...cols])
    setGrids([...grids])
  }

  const setSingleCell = (cell: ICell) => {
    cells[cell.row * 9 + cell.col] = cell;
    rows[cell.row][cell.col] = cell;
    cols[cell.col][cell.row] = cell;
    grids[cell.grid][cell.gIndex] = cell;
    setCells([...cells])
    setRows([...rows])
    setCols([...cols])
    setGrids([...grids])
  }

  // 设置关联项
  const setCellRelation = (cell: ICell) => {
    cell.group = [
      ...rows[cell.row],
      ...cols[cell.col],
      ...grids[cell.grid]
    ]
      .map(cell => cell.value)
      .filter(value => value);
  }

  return {
    cells, rows, cols, grids,
    editableCell,
    setEditableCell,
    oprateInitData,
    setSingleCell
  }
}

const globalContext = createContainer(global);

export { globalContext }