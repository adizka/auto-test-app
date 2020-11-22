import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

const FAVORITES_KEY = 'FAVORITES'

export function useFavorites() {
  const [items, setItems] = useLocalStorage(FAVORITES_KEY, [])
  const [favorites, _setFavorites] = useState(() => new Set<number>(items))
  const setFavorites = (newFavorites: Set<number>) => {
    _setFavorites(newFavorites)
    setItems(Array.from(newFavorites))
  }

  const isFavoriteItem = (id: number): boolean => {
    return favorites.has(id)
  }

  const setFavoriteItem = (id: number) => {
    const newSet = new Set<number>(favorites)
    newSet.add(id)
    setFavorites(newSet)
  }

  const removeFavoriteItem = (id: number) => {
    const newSet = new Set<number>(favorites)
    newSet.delete(id)
    setFavorites(newSet)
  }

  return {
    isFavoriteItem,
    setFavoriteItem,
    removeFavoriteItem,
  }
}
