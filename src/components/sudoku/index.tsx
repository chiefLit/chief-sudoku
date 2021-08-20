import React from 'react'
import { CellInput } from '@/components'
import type { ICell } from '@/types'
import { globalContext } from '@/context'
import './index.less'

const App: React.FC<{ data: Array<number[]> }> = ({ data }) => {
  const { cells, rows, cols, grids, oprateInitData, setSingleCell } = globalContext.useContainer()
  React.useEffect(() => oprateInitData(data), [])

  return (
    <div className="app-wrapper">
      {
        rows.map((row, rowIndex) => <div style={{ display: 'flex' }} key={rowIndex}>
          {
            row.map((cell, colIndex) => <CellInput
              key={`${rowIndex}${colIndex}`}
              data={cell}
              onChange={data => {
                setSingleCell(data)
              }}
            />)
          }
        </div>)
      }
      <div className='row-line-1 row-line line'></div>
      <div className='row-line-2 row-line line'></div>
      <div className='col-line-1 col-line line'></div>
      <div className='col-line-2 col-line line'></div>
    </div>
  )
}

export default App
