import { useState } from 'react'
import { api } from '../api.js'
import SearchBar from '../components/SearchBar.jsx'
import Header from '../components/Header.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import useFavorites from '../hooks/useFavorites.js'

export default function Home() {
  const userId = localStorage.getItem("userId")

  const [movies, setMovies] = useState([])
  const { addFavorite, favorites } = useFavorites(userId)

  async function handleSearch(q) {
    const res = await api.get(`/movies/search?q=${q}&page=1`)
    setMovies(res.data)
  }

  return (
    <>
      <div className='container'>
        <Header />
        <SearchBar onSearch={handleSearch} />
        <MovieGrid movies={movies} onAddFavorite={addFavorite} favorites={favorites}/>
      </div>
    </>
  )
}
