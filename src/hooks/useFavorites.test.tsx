import { renderHook, act } from '@testing-library/react-hooks'
import { fakeFactory } from 'src/utils/test-utils'
import { useFavorites } from './useFavorites'

describe('useFavorites', () => {
  it('adds to favorites', () => {
    const expectedStock = fakeFactory.getRandomStockNumber()

    const hook = renderHook(() => useFavorites())
    act(() => {
      hook.result.current.setFavoriteItem(expectedStock) // added to favorites
    })
    expect(hook.result.current.isFavoriteItem(expectedStock)).toEqual(true)
  })

  it('removes from favorites', () => {
    const expectedStock = fakeFactory.getRandomStockNumber()

    const hook = renderHook(() => useFavorites())
    act(() => {
      hook.result.current.setFavoriteItem(expectedStock) // added to favorites
    })
    act(() => {
      hook.result.current.removeFavoriteItem(expectedStock) // removed from favorites
    })
    expect(hook.result.current.isFavoriteItem(expectedStock)).toEqual(false)
  })
})
