import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('<Button />', () => {
  const handleChange = jest.fn()
  const buttonText = 'Save'
  const buttonCSSClass = 'button-orange'
  beforeEach(() => {
    render(
      <Button
        className={buttonCSSClass}
        isDisabled={false}
        onClick={handleChange}
      >
        {buttonText}
      </Button>
    )
  })

  it('renders Button component', () => {
    const button = screen.getByText(buttonText)
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
    expect(button).toHaveClass(buttonCSSClass)
  })

  it('check button click', () => {
    userEvent.click(screen.getByText(buttonText))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
