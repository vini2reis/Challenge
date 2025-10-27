import express from 'express'
import { login, register } from './AuthController.js'
import { authSchema } from './AuthSchema.js'
import { validate } from '../../middleware/validate.js'

const router = express.Router()

router.post(
  '/login',
  validate(authSchema, 'body'),
  login
)

router.post(
  '/register',
  validate(authSchema, 'body'),
  register
)

export default router