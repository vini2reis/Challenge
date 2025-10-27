import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api.js'
import SharedHeader from '../components/SharedHeader.jsx'

export default function SharedList() {
  const { shareId } = useParams()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    api.get(`/favorites/shared/${shareId}`).then(res => {
      setMovies(res.data || [])
    })
  }, [shareId])

  return (
    <div className='container'>
      <SharedHeader />

      <div className='favorites-list'>
        {movies.map(movie => (
          <div className='movie-row' key={movie.tmdbId}>
            <img src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`} className='movie-poster' />
            <div className='movie-info'>
              <h3 className='movie-title shared-movie'>{movie.title}</h3>
              <p className='rating'><strong>⭐ {movie.rating.toFixed(1).replace('.0', '')}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
