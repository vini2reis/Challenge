import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites.js'
import Header from '../components/Header.jsx'

export default function Favorites() {
  const userId = '123456789'
  const {
    favorites,
    errorMessage,
    fetchFavorites,
    removeFavorite
  } = useFavorites(userId)

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <div className='container'>
      <Header />

      <h2 className='page-title'>Meus Favoritos</h2>

      <div className='grid'>
        {favorites.length === 0 && <p>{errorMessage}</p>}

        {favorites.map(movie => (
          <div className='movie-card' key={movie.tmdbId}>
            <img src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`} className='movie-poster' />
            <h3 className='movie-title'>{movie.title}</h3>

            <div className='actions'>
              <Link to={`/movie/${movie.id}`}>
                <button className='button btn-primary'>Detalhes</button>
              </Link>

              <button className='button btn-danger' onClick={() => removeFavorite(movie.tmdbId)}>
                Remover
              </button>
            </div>

          </div>
        ))}
      </div>

      
    </div>
  )
}
