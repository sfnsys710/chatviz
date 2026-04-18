import { Router } from 'express'
import redis from '../redis.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const key = req.query.key as string

  if (!key) {
    res.status(400).json({ error: 'Missing ?key= parameter' })
    return
  }

  const value = await redis.get(key)

  if (value === null) {
    res.status(404).json({ error: `Key "${key}" not found` })
    return
  }

  res.json({ key, value, requestedBy: req.user })
})

export default router
