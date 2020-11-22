import { useState } from 'react'

function checkLocalStorage() {
  return typeof localStorage !== 'undefined'
}

const localMemory: Record<string, unknown> = {}

const getItem = (key: string, initialValue: unknown) => {
  if (checkLocalStorage()) {
    return getItemFromLocalStorage(key, initialValue)
  }

  console.info('getting from localMemory')
  const memoryItem = localMemory[key]
  return memoryItem ? memoryItem : initialValue
}

const getItemFromLocalStorage = (key: string, initialValue: unknown) => {
  const item = localStorage.getItem(key)
  if (item === undefined || item === null) {
    return initialValue
  }

  try {
    return JSON.parse(item)
  } catch (error) {
    // console.log(error)
    return initialValue
  }
}

const setItem = (key: string, value: unknown) => {
  if (checkLocalStorage()) {
    setItemToLocalStorage(key, value)
    return
  }

  localMemory[key] = value
}

const setItemToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export function useLocalStorage(key: string, initialValue: unknown) {
  const [storedValue, setStoredValue] = useState(() => {
    return getItem(key, initialValue)
  })
  const setValue = (value: unknown) => {
    setItem(key, value)
    setStoredValue(value)
  }

  return [storedValue, setValue]
}
