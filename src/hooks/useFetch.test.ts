import { renderHook } from '@testing-library/react-hooks'
import { ApiError, Service } from '../api'
import { useFetch } from './useFetch'
import fetch from 'jest-fetch-mock'

describe('useFetch', () => {
  it('should return loading', () => {
    const fetcher = (_?: AbortController) => Promise.resolve()
    const hook = renderHook(() => useFetch(fetcher))

    expect(hook.result.current.isLoading).toBeTruthy()
  })

  it('should return data', async () => {
    const fetcher = (_?: AbortController) => Promise.resolve({ foo: 1 })

    const hook = renderHook(() => useFetch(fetcher))
    await hook.waitForNextUpdate()

    expect(hook.result.current.data).toEqual({ foo: 1 })
  })

  it('should return error', async () => {
    fetch.once(JSON.stringify({ error: 'no way' }), { status: 404 })
    const fetcher = (_?: AbortController) => Service.getCar(1)

    const hook = renderHook(() => useFetch(fetcher))
    await hook.waitForNextUpdate()

    expect(hook.result.current.data).toBeInstanceOf(ApiError)
  })
})
