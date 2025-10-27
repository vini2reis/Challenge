import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../database/models/User.js'
import { v4 } from 'uuid'

const { JWT_SECRET, JWT_EXPIRES } = process.env

export async function register(req, res) {
  const { email, password } = req.body

  const user = await registeredUser ({ email })
  if (user) {
    return res.status(409).json({ message: 'Email já registrado' })
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const newUser = {
    userId: v4(),
    email,
    passwordHash: hash
  }
  
  await new User(newUser).save()

  return res.status(201).json({ message: 'Usuário criado com sucesso' })
}

export async function login(req, res) {
  const { email, password } = req.body

  const user = await registeredUser ({ email })
  if (!user) {
    return res.status(401).json({ message: 'Email e/ou senha incorreto(s)' })
  }

  const match = await bcrypt.compare(password, user.passwordHash || '')
  if (!match) {
    return res.status(401).json({ message: 'Email e/ou senha incorreto(s)' })
  }

  const token = jwt.sign({ userId: user.userId, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES })

  return res.status(200).json({ token, userId: user.userId })
}

async function registeredUser ({ email }) {
  const filter = {
    email
  }

  const options = {
    lean: true
  }

  return await User.findOne(filter, {}, options)
}