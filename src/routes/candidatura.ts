// backend/src/routes/candidatura.ts
// Rota POST /api/candidaturas — recebe os dados do formulário e salva no banco

import { Router, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import pool from '../db'

const router = Router()

// Garante que a pasta uploads/ exista antes de salvar arquivos
const uploadsDir = path.resolve('uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)

// Configuração do multer: onde e como salvar o arquivo enviado
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `curriculo_${Date.now()}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.includes(ext)) cb(null, true)
    else cb(new Error('Formato de arquivo inválido. Use PDF, DOC ou DOCX.'))
  },
})

// POST /api/candidaturas
router.post('/', upload.single('curriculo'), async (req: Request, res: Response) => {
  try {
    const {
      nome, email, telefone, cidade, nascimento, linkedin,
      vaga, modalidade, experiencia, pretensao,
      historico, portfolio, observacoes,
    } = req.body

    const curriculo = req.file ? req.file.path : null

    // Prepared statement — previne SQL Injection
    await pool.execute(
      `INSERT INTO candidaturas
        (nome, email, telefone, cidade, nascimento, linkedin, vaga,
         modalidade, experiencia, pretensao, historico, curriculo, portfolio, observacoes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        email,
        telefone,
        cidade,
        nascimento  || null,
        linkedin    || null,
        vaga,
        modalidade,
        experiencia,
        pretensao   || null,
        historico,
        curriculo,
        portfolio   || null,
        observacoes || null,
      ]
    )

    res.status(201).json({ ok: true, message: 'Candidatura recebida com sucesso!' })
  } catch (err) {
    console.error('[ERRO /api/candidaturas]', err)
    res.status(500).json({ ok: false, message: 'Erro interno. Tente novamente.' })
  }
})

export default router
