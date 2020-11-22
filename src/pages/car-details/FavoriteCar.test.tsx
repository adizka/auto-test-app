import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FavoriteCar } from './FavoriteCar'
import { fakeFactory } from 'src/utils/test-utils'

describe('<FavoriteCar />', () => {
  const idMock = fakeFactory.getRandomStockNumber()
  beforeEach(() => {
    render(<FavoriteCar id={idMock} />)
  })

  it('check FavoriteCar render', () => {
    expect(screen.getByText(/If you like this car/i)).toBeInTheDocument()
  })

  it('check saving to favorites', async () => {
    userEvent.click(screen.getByTestId('uiBtn')) // added to favorites
    expect(
      await screen.findByText(/If you don't like this car anymore/i)
    ).toBeInTheDocument()
  })

  it('check removing from favorites', async () => {
    userEvent.click(screen.getByTestId('uiBtn')) // removed from favorites
    expect(await screen.findByText(/If you like this car/i)).toBeInTheDocument()
  })
})
