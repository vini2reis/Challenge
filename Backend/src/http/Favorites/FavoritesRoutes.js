import express from "express"
import { addFavorite, removeFavorite } from './FavoritesController.js'

const router = express.Router()

router.put("/add-favorite", addFavorite)
router.put("/remove-favorite", removeFavorite)

export default router