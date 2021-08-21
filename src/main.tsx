import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/components/sudoku'
import { globalContext } from '@/context'
import './styles/global.less'

let data = [
  [0, 6, 0, 0, 9, 3, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 5, 0, 0],
  [0, 3, 0, 4, 0, 0, 0, 9, 0],
  [1, 0, 8, 0, 2, 0, 0, 0, 4],
  [0, 0, 0, 3, 0, 9, 0, 0, 1],
  [2, 0, 0, 0, 1, 0, 6, 0, 9],
  [0, 8, 0, 0, 0, 6, 0, 2, 0],
  [0, 0, 4, 0, 0, 0, 8, 0, 7],
  [0, 0, 0, 7, 0, 5, 0, 1, 0]
]

ReactDOM.render(
  <React.StrictMode>
    <globalContext.Provider>
      <App data={data} />
    </globalContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
