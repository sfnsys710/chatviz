import express from 'express'
import authRouter from './routes/auth.js'
import queryRouter from './routes/query.js'
import streamRouter from './routes/stream.js'

const app = express()
const PORT = 3000

app.use(express.json())        // parse JSON request bodies

app.use('/auth', authRouter)   // POST /auth/login
app.use('/query', queryRouter) // GET  /query?key=foo
app.use('/stream', streamRouter) // GET /stream

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
