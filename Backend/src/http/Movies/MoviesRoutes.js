import express from 'express'
import { searchMovie } from './MoviesController.js'

const router = express.Router()

router.get('/search', searchMovie)

export default router