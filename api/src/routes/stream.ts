import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  const words = 'This is a fake streaming reply word by word from the backend.'.split(' ')
  let i = 0

  const interval = setInterval(() => {
    res.write(`data: ${words[i]}\n\n`)
    i++

    if (i === words.length) {
      res.write('data: [DONE]\n\n')
      clearInterval(interval)
      res.end()
    }
  }, 150)

  res.on('close', () => clearInterval(interval))
})

export default router
