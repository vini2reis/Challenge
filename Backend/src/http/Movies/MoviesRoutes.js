import express from 'express'
import { searchMovie, getMovieDetails } from './MoviesController.js'

const router = express.Router()

router.get('/search', searchMovie)
router.get('/details/:movieId', getMovieDetails)

export default router