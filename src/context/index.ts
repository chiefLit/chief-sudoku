import React from "react";
import { createContainer } from 'unstated-next';
import type { ICell } from '@/types'

const ALL_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const global = () => {
  const [cells, setCells] = React.useState<ICell[]>(new Array(81)) // 平铺数据
  const [rows, setRows] = React.useState<ICell[][]>(new Array(9).fill(0).map(_ => []))
  const [cols, setCols] = React.useState<ICell[][]>(new Array(9).fill(0).map(_ => []))
  const [grids, setGrids] = React.useState<ICell[][]>(new Array(9).fill(0).map(_ => []))
  const [editableCell, setEditableCell] = React.useState<ICell | undefined>()
  // 是否展示余数
  const [showRemainder, setShowRemainder] = React.useState(true)

  // 统一处理 行 列 网
  React.useEffect(() => {
    const rows = new Array(9).fill(0).map(_ => [])
    const cols = new Array(9).fill(0).map(_ => [])
    const grids = new Array(9).fill(0).map(_ => [])
    cells.forEach(cell => {
      rows[cell.row][cell.col] = cell;
      cols[cell.col][cell.row] = cell;
      grids[cell.grid][cell.gIndex] = cell;
    })
    cells.forEach(cell => {
      // 设置关联项
      const group = [
        ...rows[cell.row],
        ...cols[cell.col],
        ...grids[cell.grid]
      ].map(cell => cell?.value).filter(value => value);
      const opposite = ALL_NUMBER.filter(num => !group.includes(num))
      cell.group = Array.from(new Set(opposite)).sort()
    })
    setRows([...rows])
    setCols([...cols])
    setGrids([...grids])
  }, [cells])

  // 初始化数据
  const oprateInitData = (data: number[][]) => {
    const cells = new Array(81)
    
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
      }
    }
    
    setCells([...cells])
  }

  // 改变某项值
  const changeSingleCell = (cell: ICell) => {
    cells[cell.row * 9 + cell.col] = cell;
    rows[cell.row][cell.col] = cell;
    cols[cell.col][cell.row] = cell;
    grids[cell.grid][cell.gIndex] = cell;
    setCells([...cells])
  }

  return {
    cells, rows, cols, grids,
    editableCell,
    setEditableCell,
    oprateInitData,
    changeSingleCell,
    showRemainder, setShowRemainder
  }
}

const globalContext = createContainer(global);

export { globalContext }