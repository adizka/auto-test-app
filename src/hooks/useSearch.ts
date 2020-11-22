import qs from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function useSearch() {
  const { pathname, search } = useLocation()
  const parsed = useMemo(() => qs.parse(search), [search])

  function getSearchUrl(params: Record<string, string | number>) {
    const stringified = qs.stringify(
      {
        ...parsed,
        ...params,
      },
      { skipEmptyString: true }
    )
    return `${pathname}?${stringified}`
  }

  return { search: parsed, pathname, getSearchUrl }
}
