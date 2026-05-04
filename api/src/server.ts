import express from 'express'
import authRouter from './routes/auth.js'
import queryRouter from './routes/query.js'
import streamRouter from './routes/stream.js'

const app = express()
const PORT = 3001

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  if (req.method === 'OPTIONS') { res.sendStatus(204); return }
  next()
})

app.use(express.json())        // parse JSON request bodies

app.use('/auth', authRouter)   // POST /auth/login
app.use('/query', queryRouter) // GET  /query?key=foo
app.use('/stream', streamRouter) // GET /stream

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
