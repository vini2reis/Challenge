import express from 'express'
import { searchMovie, movieDetails } from './MoviesController.js'

const router = express.Router()

router.get('/search', searchMovie)
router.get('/details/:movie_id', movieDetails)

export default router