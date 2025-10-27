import { api } from '../api'
import { useState, useEffect } from 'react'

export default function useFavorites(userId) {
  const [favorites, setFavorites] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  async function fetchFavorites() {
    try {
      const res = await api.get(`/favorites/${userId}`)

      setFavorites(res.data || [])
      setErrorMessage("")
    } catch (err) {
      const msg = err.response?.data?.message || "Erro ao buscar favoritos"

      setFavorites([])
      setErrorMessage(msg)
    }
  }

  async function addFavorite(movie) {
    await api.put('/favorites/add-favorite', { userId, movie })

    setFavorites(prev => [...prev, movie])
  }

  async function removeFavorite(movieId) {
    await api.put('/favorites/remove-favorite', { userId, movieId })

    setFavorites(prev => prev.filter(m => m.tmdbId !== movieId))
  }


  useEffect(() => {
    fetchFavorites()
  }, [userId])

  return {
    favorites,
    errorMessage,
    fetchFavorites,
    addFavorite,
    removeFavorite
  }
}
