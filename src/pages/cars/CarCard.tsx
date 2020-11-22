import React from 'react'
import { Link } from 'react-router-dom'
import { Car } from 'src/api'
import { FormattedCar } from './FormattedCar'
import styles from './scss/CarCard.module.scss'

type Props = {
  car: Car
}

const CarCard: React.FC<Props> = ({ car }) => {
  return (
    <div className={styles.carCard}>
      <img
        src={car.pictureUrl}
        alt={`${car.manufacturerName} ${car.modelName}`}
        className={styles.carCardImage}
      />
      <div className={styles.carCardInfo}>
        <h3 className={styles.carCardTitle}>
          {car.manufacturerName} {car.modelName}
        </h3>
        <span className={styles.carCardDescription}>
          <FormattedCar car={car} />
        </span>
        <Link className={styles.carCardDetails} to={`/cars/${car.stockNumber}`}>
          View details
        </Link>
      </div>
    </div>
  )
}

export { CarCard }
