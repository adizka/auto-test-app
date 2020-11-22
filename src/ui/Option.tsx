import React, { useContext } from 'react'
import cl from 'clsx'
import styles from './scss/Option.module.scss'
import { SelectContext } from './Select'

type Props = {
  value: string
}

const Option: React.FC<Props> = ({ children, value }) => {
  const { onSelect, onMouseDown, selectedValue } = useContext(SelectContext)
  return (
    <div
      role="listitem"
      onMouseDown={onMouseDown}
      onClick={(e) => onSelect(e, value)}
      className={cl(styles.option, selectedValue === value && styles.selected)}
    >
      {children}
    </div>
  )
}

export { Option }
