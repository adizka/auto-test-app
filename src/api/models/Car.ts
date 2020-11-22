import type { Color } from './Color'

export interface Car {
  stockNumber: number
  manufacturerName: string
  modelName: string
  mileage: {
    number: number
    unit: 'km' | 'mi'
  }
  fuelType: FuelType
  color: Color
  pictureUrl: string
}

export enum FuelType {
  DIESEL = 'Diesel',
  PETROL = 'Petrol',
}
