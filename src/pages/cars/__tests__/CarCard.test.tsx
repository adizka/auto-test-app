import React from 'react'
import { screen } from '@testing-library/react'
import { CarCard } from '../CarCard'
import { fakeFactory, renderWithRouter } from 'src/utils/test-utils'

describe('<CarCard />', () => {
  it('check CarCard render', () => {
    const car = fakeFactory.getCarStub()

    renderWithRouter(<CarCard car={car} />)
    expect(
      screen.getByAltText(`${car.manufacturerName} ${car.modelName}`)
    ).toBeInTheDocument() // check image
    expect(screen.getByText(/View details/i)).toBeInTheDocument() // check Link to CarDetails
  })
})
