export interface ApiRequestOptions {
  readonly method:
    | 'GET'
    | 'PUT'
    | 'POST'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD'
    | 'PATCH'
  readonly path: string
  readonly cookies?: Record<string, any>
  readonly headers?: Record<string, any>
  readonly query?: Record<string, any> | string
  readonly formData?: Record<string, any>
  readonly body?: any
  readonly responseHeader?: string
  readonly errors?: Record<number, string>
  readonly abort?: AbortController
}
