import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function MovieCard({ movie, onAddFavorite, favorites }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (favorites?.some(f => f.tmdbId === movie.id)) {
      setIsFavorite(true)
    }
  }, [favorites, movie.id])

  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Image'

  const favoriteMovie = {
    tmdbId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    rating: movie.vote_average
  }

  const handleFavorite = () => {
    onAddFavorite(favoriteMovie)
    setIsFavorite(true)
  }

  return (
    <div className='movie-card'>
      <img
        src={poster}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p><strong>⭐ {movie.vote_average.toFixed(1).replace('.0', '')}</strong></p>

      <div className='actions'>
        <Link to={`/movie/${movie.id}`}>
          <button className='button btn-primary'>Detalhes</button>
        </Link>

        {isFavorite ? (
          <span className='badge-fav'>Favorito</span>
        ) : (
          <button className='button btn-primary' onClick={handleFavorite}>
            Favoritar
          </button>
        )}
      </div>
    </div>
  )
}

