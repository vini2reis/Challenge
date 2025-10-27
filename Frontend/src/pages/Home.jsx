import { useState } from 'react'
import { api } from '../api.js'
import SearchBar from '../components/SearchBar.jsx'
import Header from '../components/Header.jsx'

export default function Home() {
  const [movies, setMovies] = useState([])

  async function handleSearch(q) {
    const res = await api.get(`/movies/search?q=${q}&page=1`)
    setMovies(res.data)
  }

  return (
    <>
      <div className='container'>
        <Header />
        <SearchBar onSearch={handleSearch} />
      </div>
    </>
  )
}
