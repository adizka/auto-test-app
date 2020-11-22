import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('<Footer />', () => {
  it('should render year', () => {
    const year = 2020
    render(<Footer year={year} />)
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument()
  })
})
