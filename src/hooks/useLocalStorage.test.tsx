import { renderHook, act } from '@testing-library/react-hooks'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  it('should return initialValue', async () => {
    const hook = renderHook(() => useLocalStorage('foo', 'bar'))
    const [storedValue] = hook.result.current
    expect(storedValue).toEqual('bar')
  })

  it('should update storedValue', async () => {
    const hook = renderHook(() => useLocalStorage('foo', 'bar'))
    let [storedValue, setValue] = hook.result.current
    expect(storedValue).toEqual('bar') // initial value 'bar'
    act(() => {
      setValue('baz') // updated to 'baz
    })
    const [updatedValue] = hook.result.current
    expect(updatedValue).toEqual('baz')
  })
})
