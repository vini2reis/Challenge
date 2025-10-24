import express from 'express'
import { addFavorite, removeFavorite, createShareLink, getShared } from './FavoritesController.js'
import { addFavoriteSchema, removeFavoriteSchema, createShareLinkSchema, getSharedSchema } from './FavoritesSchema.js'
import { validate } from '../../middleware/validate.js'

const router = express.Router()

router.put(
  '/add-favorite',
  validate(addFavoriteSchema, 'body'),
  addFavorite
)

router.put(
  '/remove-favorite',
  validate(removeFavoriteSchema, 'body'),
  removeFavorite
)

router.post(
  '/share',
  validate(createShareLinkSchema, 'body'),
  createShareLink
)

router.get(
  '/shared/:shareId',
  validate(getSharedSchema, 'param'),
  getShared
)

export default router