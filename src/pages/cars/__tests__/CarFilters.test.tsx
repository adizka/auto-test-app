import React from 'react'
import { screen, act, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetch from 'jest-fetch-mock'
import { CarFilters } from '../CarFilters'
import { renderWithRouter, fakeFactory } from 'src/utils/test-utils'

describe('<CarFilters />', () => {
  it('check CarFilters render', async () => {
    fetch
      .once(JSON.stringify({ colors: fakeFactory.getColorsStub() }))
      .once(
        JSON.stringify({ manufacturers: fakeFactory.getManufacturersStub() })
      )

    renderWithRouter(<CarFilters />, { route: '/cars' })
    expect(await screen.findByText(/Filter/i)).toBeInTheDocument()
  })

  it('check filters button', async () => {
    fetch
      .once(JSON.stringify({ colors: fakeFactory.getColorsStub() }))
      .once(
        JSON.stringify({ manufacturers: fakeFactory.getManufacturersStub() })
      )
    renderWithRouter(<CarFilters />, { route: '/cars' })

    act(() => {
      userEvent.click(
        within(screen.getByTitle('Color')).getByTestId('btnToggle')
      )
    })
    await waitFor(() => {
      const [, firstOption] = within(screen.getByTitle('Color')).getAllByRole(
        'listitem'
      )
      userEvent.click(firstOption)
    })

    userEvent.click(await screen.findByText(/Filter/i))

    expect(window.location.search).toEqual(
      `?color=${fakeFactory.getColorsStub()[0]}`
    )
  })
})
