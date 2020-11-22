import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Car, FuelType } from '../api'
import faker from 'faker'

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

const fakeFactory = {
  getRandomStockNumber() {
    return faker.random.number()
  },
  getRandomPage() {
    return faker.random.number()
  },
  getRandomColor() {
    return faker.random.arrayElement(this.getColorsStub())
  },
  getRandomManufacturer() {
    return faker.random.arrayElement(this.getManufacturersStub())
  },
  getManufacturersStub() {
    return [
      {
        name: 'Audi',
      },
      {
        name: 'BMW',
      },
      {
        name: 'Chrysler',
      },
    ]
  },

  getColorsStub() {
    return ['red', 'blue', 'green', 'black', 'yellow', 'white', 'silver']
  },
  getCarsStub() {
    return [
      {
        stockNumber: this.getRandomStockNumber(),
        manufacturerName: 'Fiat',
        modelName: 'Albea',
        color: 'white',
        mileage: {
          number: faker.random.number(),
          unit: 'km',
        },
        fuelType: 'Petrol',
        pictureUrl: faker.image.imageUrl(),
      },
      {
        stockNumber: this.getRandomStockNumber(),
        manufacturerName: 'Fiat',
        modelName: 'Palio',
        color: 'white',
        mileage: {
          number: faker.random.number(),
          unit: 'km',
        },
        fuelType: 'Diesel',
        pictureUrl: faker.image.imageUrl(),
      },
    ]
  },
  getCarStub(stockNumber = 1): Car {
    return {
      stockNumber,
      manufacturerName: 'BWM',
      modelName: 'name1',
      mileage: {
        number: 1,
        unit: 'km',
      },
      fuelType: FuelType.DIESEL,
      color: 'red',
      pictureUrl: '',
    }
  },
}

export { renderWithRouter, fakeFactory }
