import User from '../../database/models/User.js'
import { v4 } from 'uuid'

export async function addFavorite (req, res) {
  const { movie, userId } = req.body

  const filter = {
    userId
  }

  const isAlreadyFavorite = await verifyFavoriteMovies ({ movieId: movie.tmdbId, filter })

  if (isAlreadyFavorite) {
    return res.status(409).json({ message: 'Filme já está na lista de favoritos' })
  }

  const update = {
    $push: {
      'favoriteMovies.movies': movie
    }
  }

  const options = {
    new: true
  }

  const updatedFavorite = await User.findOneAndUpdate(filter, update, options)

  return res.status(200).json(updatedFavorite.favoriteMovies)
}

export async function removeFavorite (req, res) {
  const { movieId, userId } = req.body

  const filter = {
    userId
  }

  const isAlreadyFavorite = await verifyFavoriteMovies ({ movieId, filter })
  if (!isAlreadyFavorite) {
    return res.status(404).json({ message: 'Filme não está na lista de favoritos' })
  }

  const update = {
    $pull: {
      'favoriteMovies.movies': { tmdbId: movieId }
    }
  }

  const options = {
    new: true
  }

  const updatedFavorite = await User.findOneAndUpdate(filter, update, options)

  return res.status(200).json(updatedFavorite.favoriteMovies)
}

async function verifyFavoriteMovies ({ movieId, filter }) {
  const options = {
    lean: true
  }

  const user = await User.findOne(filter, {}, options)

  return user.favoriteMovies?.movies?.some(favorite => favorite.tmdbId === movieId)
}