import { api } from '../api'
import { useState, useEffect } from 'react'

export default function useFavorites(userId) {
  const [favorites, setFavorites] = useState([])

  async function addFavorite(movie) {
    await api.put('/favorites/add-favorite', { userId, movie })
    setFavorites(prev => [...prev, movie])
  }

  async function removeFavorite(movieId) {
    await api.put('/favorites/remove-favorite', { userId, movieId })
    setFavorites(prev => prev.filter(m => m.tmdbId !== movieId))
  }

  return {
    favorites,
    addFavorite,
    removeFavorite
  }
}
