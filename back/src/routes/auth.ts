import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const router = Router()

const JWT_SECRET = 'supersecret'

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

router.post('/login', (req, res) => {
  const result = LoginSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() })
    return
  }

  const { username, password } = result.data

  if (username !== 'soufiane' || password !== '1234') {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

export default router
