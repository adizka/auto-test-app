import React from 'react'
import styles from './Footer.module.scss'

type Props = {
  year?: number
}

const defaultYear = () => new Date().getFullYear()

export function Footer({ year = defaultYear() }: Props) {
  return <footer className={styles.footer}>&copy; CAR1 Group {year}</footer>
}
