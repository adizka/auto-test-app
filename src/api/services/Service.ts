import type { Car } from '../models/Car'
import type { Color } from '../models/Color'
import type { Manufacturer } from '../models/Manufacturer'
import { request } from '../core/request'

export class Service {
  static async getCars(
    query: string,
    abort?: AbortController
  ): Promise<{
    cars: ReadonlyArray<Car>
    totalPageCount: number
    totalCarsCount: number
  }> {
    const result = await request({
      method: 'GET',
      path: `/api/cars`,
      abort,
      query,
    })
    return result.body
  }

  static async getCar(
    stockNumber: number,
    abort?: AbortController
  ): Promise<{
    car?: Car
  }> {
    const result = await request({
      method: 'GET',
      abort,
      path: `/api/cars/${stockNumber}`,
      errors: {
        400: `A car with the specified stock number was not found`,
      },
    })
    return result.body
  }

  static async getColors(): Promise<{
    colors: ReadonlyArray<Color>
  }> {
    const result = await request({
      method: 'GET',
      path: `/api/colors`,
    })
    return result.body
  }

  static async getManufacturers(): Promise<{
    manufacturers: ReadonlyArray<Manufacturer>
  }> {
    const result = await request({
      method: 'GET',
      path: `/api/manufacturers`,
    })
    return result.body
  }
}
