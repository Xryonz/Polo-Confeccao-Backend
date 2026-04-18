// backend/src/index.ts
// Servidor Express — ponto de entrada do backend

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import candidaturaRouter from './routes/candidatura'

dotenv.config()

const app = express()

// Permite chamadas do React (localhost:5173) para a API (localhost:3001)
// Em produção, troque pela URL real: cors({ origin: 'https://seusite.com' })
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/candidaturas', candidaturaRouter)

// Rota de health check — útil para testar se a API está no ar
app.get('/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`)
})
