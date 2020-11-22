import React from 'react'
import { screen, act } from '@testing-library/react'
import fetch from 'jest-fetch-mock'
import { renderWithRouter, fakeFactory } from './utils/test-utils'
import App from './App'

describe('<App />', () => {
  it('should render cars page', async () => {
    fetch
      .once(JSON.stringify({ colors: [] }))
      .once(JSON.stringify({ manufacturers: [] }))
      .once(JSON.stringify({ cars: [], totalPageCount: 0, totalCarsCount: 0 }))
    act(() => {
      renderWithRouter(<App />, { route: '/cars' })
    })

    expect(
      await screen.findByText(/Showing 0 of 0 results/)
    ).toBeInTheDocument()
  })

  it('should render car details', async () => {
    const expectedStock = 123
    fetch.once(JSON.stringify({ car: fakeFactory.getCarStub(expectedStock) }))

    act(() => {
      renderWithRouter(<App />, { route: `/cars/${expectedStock}` })
    })

    expect(
      await screen.findByText(new RegExp(`Stock# ${expectedStock}`))
    ).toBeInTheDocument()
  })

  it('should render no match', () => {
    renderWithRouter(<App />, { route: '/not-exists' })

    expect(screen.getByText(/404 - Not Found/)).toBeInTheDocument()
  })
})
