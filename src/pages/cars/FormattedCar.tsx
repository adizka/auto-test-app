import React from 'react'
import { Car } from 'src/api'

type Props = {
  car: Car
}

const FormattedCar: React.FC<Props> = ({ car }) => {
  if (!car) {
    return null
  }

  const formattedCar = `Stock# ${car.stockNumber}
   - ${car.mileage.number} ${car.mileage.unit.toUpperCase()}
   - ${car.fuelType}
   - ${car.color}`

  return <>{formattedCar}</>
}

export { FormattedCar }
