import User from '../../database/models/User.js'
import { v4 } from 'uuid'

const { FRONTEND_URL } = process.env

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

export async function createShareLink (req, res) {
  const { userId } = req.body

  const filter = {
    userId
  }

  const options = {
    lean: true
  }

  const user = await User.findOne(filter, {}, options)

  const shareId = user.favoriteMovies?.shareId || v4()

  if (!user.favoriteMovies?.shareId) {
    const update = {
      $set: {
        'favoriteMovies.shareId': shareId
      }
    }
  
    await User.updateOne(filter, update)
  }

  const shareLink = `${FRONTEND_URL}/shared/${shareId}`

  res.status(200).json({ shareLink })
}

export async function getShared (req, res) {
  const { shareId } = req.params

  const filter = {
    'favoriteMovies.shareId': shareId
  }

  const options = {
    lean: true
  }

  const user = await User.findOne(filter, {}, options)

  if (!user) {
    return
  }

  const favorites = user.favoriteMovies?.movies

  res.status(200).json(favorites)
}

async function verifyFavoriteMovies ({ movieId, filter }) {
  const options = {
    lean: true
  }

  const user = await User.findOne(filter, {}, options)

  return user.favoriteMovies?.movies?.some(favorite => favorite.tmdbId === movieId)
}