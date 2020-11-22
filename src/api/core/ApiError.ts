import type { ApiResult } from './ApiResult'

export class ApiError extends Error {
  readonly url: string
  readonly status: number
  readonly statusText: string
  readonly body: any

  constructor(response: ApiResult, message: string) {
    super(message)

    this.url = response.url
    this.status = response.status
    this.statusText = response.statusText
    this.body = response.body
  }
}
