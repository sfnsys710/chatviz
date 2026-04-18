import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const messages = ['starting...', 'processing...', 'halfway...', 'almost done...', 'complete!']
  let i = 0

  const interval = setInterval(() => {
    res.write(`data: ${messages[i]}\n\n`)
    i++

    if (i === messages.length) {
      res.write('data: [DONE]\n\n')
      clearInterval(interval)
      res.end()
    }
  }, 1000)

  req.on('close', () => clearInterval(interval))
})

export default router
