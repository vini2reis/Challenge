import express from "express"
import { addFavorite } from './FavoritesController.js'

const router = express.Router()

router.post("/add-favorite", addFavorite)

export default router