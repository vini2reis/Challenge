import express from "express"
import { addFavorite, removeFavorite, createShareLink, getShared } from './FavoritesController.js'

const router = express.Router()

router.put("/add-favorite", addFavorite)
router.put("/remove-favorite", removeFavorite)
router.post("/share", createShareLink)
router.get("/shared/:shareId", getShared)

export default router