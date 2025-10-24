import express from 'express'
import { searchMovie, getMovieDetails } from './MoviesController.js'
import { searchMovieSchema, movieDetailsSchema } from './MoviesSchema.js'
import { validate } from '../../middleware/validate.js'

const router = express.Router()

router.get(
  '/search',
  validate(searchMovieSchema, 'query'),
  searchMovie
)

router.get(
  '/details/:movieId',
  validate(movieDetailsSchema, 'params'),
  getMovieDetails)

export default router