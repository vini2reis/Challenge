import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites.js'
import Header from '../components/Header.jsx'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function Favorites() {
  const userId = localStorage.getItem("userId")
  
  const {
    favorites,
    errorMessage,
    fetchFavorites,
    removeFavorite,
    shareFavorites
  } = useFavorites(userId)

  const [copied, setCopied] = useState(false)
  const [copiedLink, setCopiedLink] = useState('')

  useEffect(() => {
    fetchFavorites()
  }, [])

  async function handleShare() {
    const link = await shareFavorites()
    navigator.clipboard.writeText(link)
    setCopiedLink(link)
    setCopied(true)
    console.log(copied)
    setTimeout(() => setCopied(false), 1000)
    console.log(copied)
  }

  return (
    <div className='container'>
      <Header />

      <h2 className='page-title'>Meus Favoritos</h2>

      <>
        <button data-tooltip-id='share-tooltip' className='button btn-primary share-button' onClick={handleShare}>
          Compartilhar Lista
        </button>

        <Tooltip id='share-tooltip' place='top' style={{ whiteSpace: 'pre-line' }} content={`Link copiado ✅`} isOpen={copied}/>
      </>

      <div className='grid'>
        {favorites.length === 0 && <p>{errorMessage}</p>}

        {favorites.map(movie => (
          <div className='movie-card' key={movie.tmdbId}>
            <img src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`} className='movie-poster' />
            <h3 className='movie-title'>{movie.title}</h3>

            <div className='actions'>
              <Link to={`/movie/${movie.tmdbId}`}>
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
