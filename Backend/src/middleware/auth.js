import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Token não fornecido' })
  }

  const token = authorization.split(' ')[1]
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    req.userId = decoded.userId
    req.userEmail = decoded.email

    next()
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' })
  }
}
