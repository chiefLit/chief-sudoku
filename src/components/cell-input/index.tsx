import React from 'react'
import './index.less'
import type { ICell } from '@/types'
import { globalContext } from '@/context'

interface CellInputProps {
  data?: ICell;
  onChange?: (value: ICell) => void;
}

const CellInput: React.FC<CellInputProps> = (props) => {
  const { data } = props;
  const { editableCell = null, setEditableCell, changeSingleCell, showRemainder } = globalContext.useContainer()
  const inputRef = React.useRef<HTMLInputElement>()

  React.useEffect(() => {
    if (editableCell?.index === data.index) {
      !data.disabled && inputRef.current?.focus()
    }
  }, [editableCell])

  const handleClick = () => {
    if (editableCell?.index === data.index) {
      setEditableCell(null)
      inputRef.current?.blur()
    } else {
      setEditableCell(data)
      !data.disabled && inputRef.current?.focus()
    }
  }

  const handleChange = (value: string | number) => {
    const newCell = { ...data, value: Number(value) || undefined }
    setEditableCell(newCell)
    changeSingleCell(newCell)
  }

  return <>
    <div style={{ position: 'relative' }}>
      <div className={[
        `cell-box`,
        // 与编辑项值相同项
        editableCell?.value && editableCell?.value === data.value && editableCell?.index !== data.index && 'same-value',
        // 编辑项
        editableCell?.index === data.index && 'current',
        // 与编辑项同组
        editableCell?.index !== data.index && (editableCell?.row === data.row || editableCell?.col === data.col || editableCell?.grid === data.grid) && 'same-group',
        // 同组内存在冲突项的编辑项
        editableCell?.value && editableCell?.value === data.value && editableCell?.index === data.index && (editableCell.row === data.row || editableCell.col === data.col || editableCell.grid === data.grid) && 'conflict-self',
        // 与编辑项同组并冲突项
        editableCell?.value && editableCell?.value === data.value && editableCell?.index !== data.index && (editableCell.row === data.row || editableCell.col === data.col || editableCell.grid === data.grid) && 'conflict-other',
        // 默认项
        data.disabled && 'disabled'
      ].filter(item => item).join(' ')} onClick={handleClick}>
        {
          data.value
            ? <span>{data.value}</span>
            : showRemainder ? <span className={'small-cell'}>{(data.group || []).join('')}</span> : null
        }

      </div>
      <input className={'cell-box input'} value={''} ref={inputRef} type="text" onChange={e => handleChange(e.target.value)} />
    </div>
  </>
}

export { CellInput }
export type { ICell }