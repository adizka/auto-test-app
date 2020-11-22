import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { capitalize } from 'src/utils/string-utils'
import { fakeFactory } from 'src/utils/test-utils'
import { Select } from '../Select'
import { Option } from '../Option'

describe('<Select />', () => {
  const selectedTitle = 'Color'
  const handleOnSelect = jest.fn()
  const allOption = {
    text: 'All car colors',
    value: '',
  }
  beforeEach(() => {
    const options = [allOption].concat(
      fakeFactory.getColorsStub().map((color) => ({
        text: capitalize(color),
        value: color,
      }))
    )

    render(
      <Select
        title={selectedTitle}
        defaultValue=""
        options={options}
        onSelect={(value) => handleOnSelect(value)}
      >
        {options.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.text}
          </Option>
        ))}
      </Select>
    )
  })

  it('renders Select component', () => {
    expect(screen.getByLabelText(selectedTitle)).toBeInTheDocument()
    expect(screen.getByDisplayValue(allOption.text)).toBeInTheDocument()
  })

  it('check menu toggle', () => {
    expect(screen.queryByRole('list')).not.toBeInTheDocument() // check menu options is closed
    userEvent.click(screen.getByTestId('btnToggle'))
    expect(screen.getByRole('list')).toBeInTheDocument() // check menu options is opened
    expect(screen.getAllByRole('listitem')).toHaveLength(
      fakeFactory.getColorsStub().length + 1
    ) // check options count
  })

  it('check option selection', () => {
    userEvent.click(screen.getByTestId('btnToggle'))
    const secondOption = screen.getAllByRole('listitem')[1]
    userEvent.click(secondOption)
    expect(
      screen.getByDisplayValue(capitalize(fakeFactory.getColorsStub()[0]))
    ).toBeInTheDocument() // check value was selected correct
  })
})
