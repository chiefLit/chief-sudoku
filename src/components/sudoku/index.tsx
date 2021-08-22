import React from 'react'
import { CellInput } from '@/components'
import { globalContext } from '@/context'
import './index.less'

const Sudoku: React.FC<{ data: Array<number[]> }> = ({ data }) => {
  const { cells, rows, cols, grids, oprateInitData, showRemainder, setShowRemainder, setEditableCell, changeSingleCell } = globalContext.useContainer()

  React.useEffect(() => oprateInitData(data), [])

  const actions = {
    clear: () => oprateInitData(data),
    // 展示所有余数
    switchShowRemainder: () => setShowRemainder(!showRemainder),
    // 补全 todo
    complete: () => {
      [rows, cols, grids].forEach((cellsList) => {
        cellsList.forEach((cells) => {
          const isOnly = cells.filter(cell => cell.value).length === 1;
   
        })
      })
    },
    // 找唯一余数
    findUniqueRemainderCell: () => {
      const uniqueRemainderCell = cells.find(cell => !cell.value && cell.group.length === 1)
      if (uniqueRemainderCell) {
        setEditableCell({ ...uniqueRemainderCell })
        changeSingleCell({ ...uniqueRemainderCell, value: uniqueRemainderCell.group[0] })
      }
    }
  }

  return (
    <div className="app-wrapper">
      {
        rows.map((row, rowIndex) => <div style={{ display: 'flex' }} key={rowIndex}>
          {
            row.map((cell, colIndex) => <CellInput
              key={`${rowIndex}${colIndex}`}
              data={cell}
            />)
          }
        </div>)
      }
      <div className='row-line-1 row-line line'></div>
      <div className='row-line-2 row-line line'></div>
      <div className='col-line-1 col-line line'></div>
      <div className='col-line-2 col-line line'></div>

      <div className={'button-box'}>
        <button onClick={() => actions.clear()}>清除</button>
        <button onClick={() => actions.switchShowRemainder()}>展示余数</button>
        <button onClick={() => actions.complete()}>补全</button>
        <button onClick={() => actions.findUniqueRemainderCell()}>寻找唯一余数</button>
      </div>
    </div>
  )
}

export default Sudoku
