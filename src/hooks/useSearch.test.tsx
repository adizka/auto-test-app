import { BrowserRouter } from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'
import { useSearch } from './useSearch'
import { fakeFactory } from 'src/utils/test-utils'

describe('useSearch', () => {
  it('should return query path', () => {
    const color = fakeFactory.getRandomColor()
    const manufacturer = fakeFactory.getRandomManufacturer().name
    const page = fakeFactory.getRandomPage()
    const query = `?color=${color}&manufacturer=${manufacturer}&page=${page}`
    window.history.pushState({}, 'Test page', query)

    const hook = renderHook(() => useSearch(), {
      wrapper: BrowserRouter,
    })
    expect(hook.result.current.search).toEqual({
      color,
      manufacturer,
      page: `${page}`,
    })
  })
})
