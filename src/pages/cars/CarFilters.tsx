import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useSearch } from 'src/hooks/useSearch'
import { Service } from 'src/api'
import { Select, OptionProp } from 'src/ui/Select'
import { Option } from 'src/ui/Option'
import { Button } from 'src/ui/Button'
import { capitalize, isString, parametrize } from 'src/utils/string-utils'
import styles from './scss/CarFilters.module.scss'

export function CarFilters() {
  const { search, getSearchUrl } = useSearch()
  const history = useHistory()
  const defaultColor = useRef<OptionProp>({ text: 'All car colors', value: '' })
  const defaultManufacturer = useRef<OptionProp>({
    text: 'All car manufacturers',
    value: '',
  })

  const [color, setColor] = useState<string>(
    isString(search.color) ? search.color : ''
  )
  const [manufacturer, setManufacturer] = useState<string>(
    isString(search.manufacturer) ? search.manufacturer : ''
  )
  const [manufacturers, setManufacturers] = useState<ReadonlyArray<OptionProp>>(
    []
  )
  const [colors, setColors] = useState<ReadonlyArray<OptionProp>>([])

  useEffect(() => {
    Service.getColors().then(({ colors }) => {
      setColors(
        [defaultColor.current].concat(
          colors.map((color) => ({ text: capitalize(color), value: color }))
        )
      )
    })

    Service.getManufacturers().then(({ manufacturers }) => {
      setManufacturers(
        [defaultManufacturer.current].concat(
          manufacturers.map(({ name }) => ({
            text: name,
            value: parametrize(name),
          }))
        )
      )
    })
  }, [])

  const isDisabled = !(manufacturers || colors)

  return (
    <div className={styles.carsFiltersWrapper}>
      <div className={styles.carsFilters}>
        <Select
          title="Color"
          defaultValue={color}
          options={colors}
          onSelect={(value) => setColor(value)}
        >
          {colors.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
        <Select
          title="Manufactures"
          options={manufacturers}
          defaultValue={manufacturer}
          onSelect={(value) => setManufacturer(value)}
        >
          {manufacturers.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
        <Button
          isDisabled={isDisabled}
          onClick={() => {
            const url = getSearchUrl({
              manufacturer,
              color,
              page: '',
            })
            history.push(url)
          }}
        >
          Filter
        </Button>
      </div>
    </div>
  )
}
