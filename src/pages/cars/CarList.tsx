import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { ApiError, Car, Service } from 'src/api'
import { Pagination } from 'src/ui/Pagination'
import { useFetch } from 'src/hooks/useFetch'
import { CarCard } from './CarCard'
import { CarSplashScreen } from './CarSplashScreen'
import styles from './scss/CarList.module.scss'

export function CarList() {
  const { search } = useLocation()
  const fetchCars = useCallback(
    (abort?: AbortController) => Service.getCars(search, abort),
    [search]
  )
  const { data, isLoading } = useFetch<{
    cars: ReadonlyArray<Car>
    totalCarsCount: number
    totalPageCount: number
  }>(fetchCars)

  if (data instanceof ApiError) {
    return null
  }

  return (
    <div className={styles.carsListWrapper}>
      <h2 className={styles.carListTitle}>Available cars</h2>
      <div className={styles.paginationDescription}>
        Showing {data?.cars.length ?? 0} of {data?.totalCarsCount ?? 0} results
      </div>
      {isLoading ? (
        <CarSplashScreen />
      ) : (
        <>
          {data?.cars.map((car) => (
            <CarCard key={car.stockNumber} car={car} />
          ))}
          <Pagination total={data?.totalPageCount ?? 0} />
        </>
      )}
    </div>
  )
}
