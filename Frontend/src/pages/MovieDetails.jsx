import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import Header from '../components/Header.jsx'
import useFavorites from '../hooks/useFavorites.js'

export default function MovieDetails() {
  const userId = localStorage.getItem("userId")

  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addFavorite, favorites } = useFavorites(userId)

  useEffect(() => {
    api.get(`/movies/details/${movieId}`).then(res => setMovie(res.data))
  }, [movieId])

  useEffect(() => {
    console.log(favorites)
    setIsFavorite(!!(movie && favorites?.find(f => f.tmdbId === movie.id)))
  }, [favorites, movie])

  if (!movie) return <p>Carregando...</p>

  const path = movie.backdrop_path || movie.poster_path
  const image = path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://res.cloudinary.com/dlobqpfcp/image/upload/v1761584266/background_poster_aurpmm.png'

  const favoriteMovie = {
    tmdbId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    rating: movie.vote_average
  }

  const handleFavorite = () => {
    addFavorite(favoriteMovie)
    setIsFavorite(true)
  }

  const formattedDate = new Date(movie.release_date).toLocaleDateString('pt-BR')

  const genres = movie.genres?.map(g => g.name).join(', ') || 'Não informado'
  const companies = movie.production_companies?.map(c => c.name).join(', ') || 'Não informado'

  return (
    <div className='container'>
      <Header />

      <div className='details-container details-content'>
        <div className='poster-section'>
          <img
            className='details-poster'
            src={image}
            alt={movie.title}
          />
        </div>

        <div className='details-content'>
          <div className='details-header'>
            <h2 className='details-title'>{movie.title}</h2>
            <p className='details-rating'><strong>⭐ </strong>{movie.vote_average.toFixed(1).replace('.0', '')}</p>
            {isFavorite ? (
              <span className='badge-fav'>Favorito</span>
            ) : (
              <button className='button btn-primary' onClick={handleFavorite}>
                Favoritar
              </button>
            )}
          </div>
          <p className='details-text'>{movie.overview}</p>
          <p className='details-text'><strong>Gênero(s): </strong>{genres}</p>
          <p className='details-text'><strong>Produção: </strong>{companies}</p>
          <p className='details-text'><strong>Data de lançamento: </strong>{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}
