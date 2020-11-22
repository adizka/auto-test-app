import React from 'react'
import cl from 'clsx'
import styles from './scss/Button.module.scss'

type Props = {
  isDisabled?: boolean
  onClick?: () => void
  className?: string
}

const Button: React.FC<Props> = ({
  children,
  isDisabled,
  onClick,
  className,
}) => {
  return (
    <div className={styles.buttonWrap}>
      <button
        className={cl(styles.button, className || '')}
        disabled={isDisabled}
        onClick={onClick}
        data-testid="uiBtn"
      >
        {children}
      </button>
    </div>
  )
}

export { Button }
