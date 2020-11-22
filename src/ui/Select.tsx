import React, { createContext, useRef, useState } from 'react'
import cl from 'clsx'
import styles from './scss/Select.module.scss'

type OptionProp = {
  text: string
  value: string
}

type Props = {
  title: string
  options: ReadonlyArray<OptionProp>
  defaultValue?: string
  onSelect: (value: string) => void
}

type SelectContextProps = {
  onSelect: (e: React.MouseEvent, value: string) => void
  onMouseDown: () => void
  selectedValue?: string
}

const SelectContext = createContext<SelectContextProps>({
  onSelect() {},
  onMouseDown() {},
})

const Select: React.FC<Props> = ({
  title,
  children,
  defaultValue,
  onSelect,
  options,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string | undefined>(defaultValue)
  const allowBlur = useRef<boolean>(true)
  const selectedOption = options.find((option) => option.value === value)

  return (
    <div
      title={title}
      className={styles.select}
      onBlur={() => {
        if (allowBlur.current) {
          setIsOpen(false)
        }
      }}
    >
      {title && (
        <label htmlFor={`${title}Input`} className={styles.selectLabel}>
          {title}
        </label>
      )}
      <div className={styles.selectToggler} onClick={() => setIsOpen(true)}>
        <input
          id={`${title}Input`}
          className={styles.selectTogglerInput}
          readOnly={true}
          value={selectedOption?.text ?? ''}
        />
        <button className={styles.selectTogglerButton} data-testid="btnToggle">
          <span
            className={cl(
              styles.selectArrow,
              isOpen ? styles.selectArrowOpen : styles.selectArrowClose
            )}
          />
        </button>
      </div>
      <SelectContext.Provider
        value={{
          onSelect(e, value) {
            e.stopPropagation()
            setValue(value)
            onSelect(value)
            setIsOpen(false)
            allowBlur.current = true
          },
          onMouseDown() {
            allowBlur.current = false
          },
          selectedValue: value,
        }}
      >
        {isOpen && (
          <div role="list" className={styles.selectMenu}>
            {children}
          </div>
        )}
      </SelectContext.Provider>
    </div>
  )
}

export { Select, SelectContext }
export type { OptionProp }
