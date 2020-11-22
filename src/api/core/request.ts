import qs from 'query-string'
import { ApiError } from './ApiError'
import type { ApiRequestOptions } from './ApiRequestOptions'
import type { ApiResult } from './ApiResult'
import { API } from './API'
import { isString } from '../../utils/string-utils'

function getUrl(options: ApiRequestOptions): string {
  const url = `${API.BASE}${options.path}`

  if (isString(options.query)) {
    return `${url}${options.query}`
  }

  if (options.query) {
    const queryString = qs.stringify(options.query)
    return `${url}?${queryString}`
  }

  return url
}

function getHeaders(options: ApiRequestOptions): Headers {
  const headers = new Headers({
    Accept: 'application/json',
    ...options.headers,
  })

  if (options.body) {
    headers.append('Content-Type', 'application/json')
  }
  return headers
}

function getRequestBody(options: ApiRequestOptions): BodyInit | undefined {
  if (options.body) {
    if (isString(options.body)) {
      return options.body
    } else {
      return JSON.stringify(options.body)
    }
  }
  return undefined
}

function sendRequest(
  options: ApiRequestOptions,
  url: string
): Promise<Response> {
  const request: RequestInit = {
    method: options.method,
    headers: getHeaders(options),
    body: getRequestBody(options),
  }
  return fetch(url, request)
}

function getResponseHeader(
  response: Response,
  responseHeader?: string
): string | null {
  if (responseHeader) {
    const content = response.headers.get(responseHeader)
    if (isString(content)) {
      return content
    }
  }
  return null
}

async function getResponseBody(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch (error) {
    console.error(error)
  }

  return null
}

function catchErrors(options: ApiRequestOptions, result: ApiResult): void {
  const errors: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    ...options.errors,
  }

  const error = errors[result.status]
  if (error) {
    throw new ApiError(result, error)
  }

  if (!result.ok) {
    throw new ApiError(result, 'Generic Error')
  }
}

/**
 * Request using fetch client
 * @param options The request options from the the service
 * @result ApiResult
 * @throws ApiError
 */
export async function request(options: ApiRequestOptions): Promise<ApiResult> {
  const url = getUrl(options)
  const response = await sendRequest(options, url)
  const responseBody = await getResponseBody(response)
  const responseHeader = getResponseHeader(response, options.responseHeader)

  const result: ApiResult = {
    url,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    body: responseHeader || responseBody,
  }

  catchErrors(options, result)
  return result
}
