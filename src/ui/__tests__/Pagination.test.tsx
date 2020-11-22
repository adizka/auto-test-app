import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from 'src/utils/test-utils'
import { Pagination } from '../Pagination'

describe('<Pagination />', () => {
  it('should render page info', () => {
    renderWithRouter(<Pagination total={10} />)
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument()
  })

  it('should render first link', () => {
    renderWithRouter(<Pagination total={10} />, { route: '/?page=1' })
    expect(screen.getByText('First')).toHaveAttribute('href', '/?page=1')
  })

  it('should render previous link', () => {
    renderWithRouter(<Pagination total={10} />, { route: '/?page=9' })
    expect(screen.getByText('Previous')).toHaveAttribute('href', '/?page=8')
  })

  it('should render next link', () => {
    renderWithRouter(<Pagination total={10} />, { route: '/?page=5' })
    expect(screen.getByText('Next')).toHaveAttribute('href', '/?page=6')
  })

  it('should render last link', () => {
    renderWithRouter(<Pagination total={10} />, { route: '/?page=5' })
    expect(screen.getByText('Last')).toHaveAttribute('href', '/?page=10')
  })

  it('should go to next page', () => {
    renderWithRouter(<Pagination total={10} />, { route: '/?page=5' })
    userEvent.click(screen.getByText('Next'))
    expect(window.location.search).toEqual('?page=6')
  })
})
