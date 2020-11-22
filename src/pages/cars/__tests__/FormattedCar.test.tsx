import React from 'react'
import { render, screen } from '@testing-library/react'
import { FormattedCar } from '../FormattedCar'
import { Car } from 'src/api'
import { fakeFactory } from 'src/utils/test-utils'

describe('<FormattedCar />', () => {
  it('check FormattedCar render', () => {
    const car: Car = Object.assign(fakeFactory.getCarStub()) // car.id = 1
    render(<FormattedCar car={car} />)
    expect(screen.getByText(/Stock# 1/i)).toBeInTheDocument()
  })
})
