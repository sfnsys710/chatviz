import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'supersecret'

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers['authorization']

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing token' })
    return
  }

  const token = header.split(' ')[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { username: string }
    req.user = payload.username
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
