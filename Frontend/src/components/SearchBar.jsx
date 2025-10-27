import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query) return
    onSearch(query)
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Buscar filme...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='search-input'
      />
      <button className='search-button' type='submit'>Buscar</button>
    </form>
  )
}
