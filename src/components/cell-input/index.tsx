import React from 'react'
import './index.less'
import type { ICell } from '@/types'
import { globalContext } from '@/context'

interface CellInputProps {
  data?: ICell;
  onChange?: (value: ICell) => void;
}

const CellInput: React.FC<CellInputProps> = (props) => {
  const { data, onChange } = props;
  const { editableCell, setEditableCell, setSingleCell } = globalContext.useContainer()
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)
  const inputRef = React.useRef<HTMLInputElement>()

  const handleClick = () => {
    setEditableCell(data)
    !data.disabled && inputRef.current?.focus()
  }

  const handleChange = (value: string | number) => {
    const newCell = { ...data, value: Number(value) || undefined }
    setEditableCell(newCell)
    setSingleCell(newCell)
    // onChange && onChange(newCell)
  }

  return <>
    <div style={{ position: 'relative' }}>
      <div className={`
        cell-box 
        ${editableCell?.value && editableCell?.value === data.value && 'samevalue'}
        ${editableCell?.index === data.index && 'current'}
        ${data.disabled && 'disabled'}
      `} onClick={handleClick}>
        {data.value}
      </div>
      <input className={'cell-box input'} value={''} ref={inputRef} type="text" onChange={e => handleChange(e.target.value)} />
    </div>
  </>
}

export { CellInput }
export type { ICell }