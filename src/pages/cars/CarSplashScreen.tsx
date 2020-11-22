import React from 'react'
import cl from 'clsx'
import styles from './scss/CarSplashScreen.module.scss'

export function CarSplashScreen() {
  return (
    <div className={styles.splashScreen}>
      <div className={styles.splashScreenImage} />
      <div className={styles.splashScreenInfo}>
        <div
          className={cl(styles.splashScreenTitle, styles.splashScreenLine)}
        />
        <div className={styles.splashScreenLine} />
        <div
          className={cl(styles.splashScreenLine, styles.splashScreenDetails)}
        />
      </div>
    </div>
  )
}
