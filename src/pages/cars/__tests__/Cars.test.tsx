import React from 'react'
import { screen, act } from '@testing-library/react'
import { renderWithRouter, fakeFactory } from 'src/utils/test-utils'
import fetch from 'jest-fetch-mock'
import { CarList } from '../CarList'
import { Route } from 'react-router-dom'

describe('<CarList />', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should render car list', async () => {
    fetch.once(
      JSON.stringify({
        cars: fakeFactory.getCarsStub(),
        totalPageCount: 1,
        totalCarsCount: 2,
      })
    )
    act(() => {
      renderWithRouter(<Route component={CarList} />)
    })

    expect(
      await screen.findByText(/Showing 2 of 2 results/)
    ).toBeInTheDocument()
  })
})
