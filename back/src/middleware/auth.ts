import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'supersecret'

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers['authorization']
  const queryToken = req.query.token as string | undefined

  const token = queryToken ?? (header?.startsWith('Bearer ') ? header.split(' ')[1] : null)

  if (!token) {
    res.status(401).json({ error: 'Missing token' })
    return
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { username: string }
    req.user = payload.username
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
