import { useEffect, useState, useRef, useCallback } from 'react'
import { ApiError } from '../api'

export function useFetch<T>(
  fetchMethod: (abort?: AbortController) => Promise<T>
) {
  const [data, setData] = useState<T | ApiError | undefined>()
  const abort = useRef<AbortController | undefined>()

  const fetchMethodCallback = useCallback(async () => {
    setData(undefined)
    try {
      abort.current = new AbortController()
      const data = await fetchMethod(abort.current)
      setData(data)
    } catch (err) {
      setData(err)
    }
  }, [fetchMethod])

  useEffect(() => {
    fetchMethodCallback()
    const abortController = abort.current

    return () => {
      if (abortController) {
        abortController.abort()
      }
    }
  }, [fetchMethodCallback])

  return { data, isLoading: data === undefined, refetch: fetchMethodCallback }
}
