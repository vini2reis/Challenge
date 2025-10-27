import express from 'express'
import { addFavorite, getFavorite, removeFavorite, createShareLink, getShared } from './FavoritesController.js'
import { addFavoriteSchema, removeFavoriteSchema, createShareLinkSchema, getSharedSchema } from './FavoritesSchema.js'
import { validate } from '../../middleware/validate.js'
import { authMiddleware } from '../../middleware/auth.js'

const router = express.Router()

router.get(
  '/:userId',
  authMiddleware,
  validate(createShareLinkSchema, 'params'),
  getFavorite
)

router.put(
  '/add-favorite',
  authMiddleware,
  validate(addFavoriteSchema, 'body'),
  addFavorite
)

router.put(
  '/remove-favorite',
  authMiddleware,
  validate(removeFavoriteSchema, 'body'),
  removeFavorite
)

router.post(
  '/share',
  authMiddleware,
  validate(createShareLinkSchema, 'body'),
  createShareLink
)

router.get(
  '/shared/:shareId',
  validate(getSharedSchema, 'params'),
  getShared
)

export default router