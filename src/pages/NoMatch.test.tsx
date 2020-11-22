import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from 'src/utils/test-utils'
import { NoMatch } from './NoMatch'

describe('<NoMatch />', () => {
  it('check NoMatch render', () => {
    renderWithRouter(<NoMatch />)
    expect(screen.getByAltText(/CAR1 Group logo/i)).toBeInTheDocument() // check image logo
    expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument() // check h1
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument() // check description
    expect(screen.getByText(/homepage/i)).toBeInTheDocument() // check homepage link
  })
})
