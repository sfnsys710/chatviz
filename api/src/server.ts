import express from 'express'
import streamRouter from './routes/stream.js'

const app = express()
const PORT = 3001

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') { res.sendStatus(204); return }
  next()
})

app.use(express.json())

app.use('/stream', streamRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
