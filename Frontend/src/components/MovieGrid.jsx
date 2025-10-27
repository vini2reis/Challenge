import MovieCard from './MovieCard.jsx'

export default function MovieGrid({ movies, onAddFavorite, favorites }) {
  return (
    <div className='grid'>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          favorites={favorites}
          onAddFavorite={onAddFavorite}
        />
      ))}
    </div>
  )
}
