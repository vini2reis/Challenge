import { useState } from 'react'
import { api } from '../api.js'
import SearchBar from '../components/SearchBar.jsx'
import Header from '../components/Header.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import useFavorites from '../hooks/useFavorites.js'

export default function Home() {
  const userId = localStorage.getItem("userId")

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const { addFavorite, favorites } = useFavorites(userId)

  async function handleSearch(q) {
    setQuery(q)
    setPage(1)
    const res = await api.get(`/movies/search?q=${q}&page=1`)
    setMovies(res.data)
  }

  async function handleLoadMore() {
    const nextPage = page + 1
    const res = await api.get(`/movies/search?q=${query}&page=${nextPage}`)
    setMovies(prev => [...prev, ...res.data])
    setPage(nextPage)
  }

  return (
    <>
      <div className='container'>
        <Header />
        <SearchBar onSearch={handleSearch} />
        <MovieGrid movies={movies} onAddFavorite={addFavorite} favorites={favorites}/>

        {movies.length > 0 && (
          <button className="button btn-primary" onClick={handleLoadMore}>
            Carregar Mais
          </button>
        )}
      </div>
    </>
  )
}
