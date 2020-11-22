import React from 'react'
import { screen } from '@testing-library/react'
import { Header } from './Header'
import { renderWithRouter } from '../utils/test-utils'

describe('<Header />', () => {
  it('should render logo', () => {
    renderWithRouter(<Header />)
    expect(screen.getByAltText('CAR1 Group')).toBeInTheDocument()
  })

  it('should render navigation', () => {
    renderWithRouter(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
