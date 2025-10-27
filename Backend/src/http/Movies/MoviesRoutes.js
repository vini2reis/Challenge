import express from 'express'
import { searchMovie, getMovieDetails } from './MoviesController.js'
import { searchMovieSchema, movieDetailsSchema } from './MoviesSchema.js'
import { validate } from '../../middleware/validate.js'
import { authMiddleware } from '../../middleware/auth.js'

const router = express.Router()

router.get(
  '/search',
  authMiddleware,
  validate(searchMovieSchema, 'query'),
  searchMovie
)

router.get(
  '/details/:movieId',
  authMiddleware,
  validate(movieDetailsSchema, 'params'),
  getMovieDetails
)

export default router