import React from 'react'
import { waitFor } from '@testing-library/react'
import fetch from 'jest-fetch-mock'
import { renderWithRouter } from 'src/utils/test-utils'
import { Index } from './Index'
import { Route } from 'react-router-dom'

describe('<CarDetails />', () => {
  it('should redirect to 404', async () => {
    fetch.once(JSON.stringify({}), { status: 404 })

    renderWithRouter(<Route component={Index} carId={123} />)

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/404')
    })
  })
})
