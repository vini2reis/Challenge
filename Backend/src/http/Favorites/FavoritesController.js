import User from '../../database/models/User.js'
import { v4 } from 'uuid'

export async function addFavorite (request, h) {
  const { movie, userId } = request.body

  const filter = {
    userId
  }

  const options = {
    lean: true
  }

  const user = await User.findOne(filter, {}, options)

  const isAlreadyFavorite = user.favoriteMovies.some(favorite => favorite.tmdbId === movie.tmdbId)
  if (isAlreadyFavorite) {
    return h.status(409).json({ message: 'Filme já está na lista de favoritos' })
  }

  const update = {
    $push: {
      'favoriteMovies.movies': movie
    }
  }

  const updatedFavorite = await User.findOneAndUpdate(filter, update)

  return h.status(200).json(updatedFavorite.favoriteMovies)
}

export async function removeFavorite (request, h) {
  const { movieId, userId } = request.body
}