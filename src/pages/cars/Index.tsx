import React from 'react'
import { CarFilters } from './CarFilters'
import { CarList } from './CarList'
import styles from './scss/Cars.module.scss'

export function Index() {
  return (
    <div className={styles.cars}>
      <CarFilters />
      <CarList />
    </div>
  )
}
