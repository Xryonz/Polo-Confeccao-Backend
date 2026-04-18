-- backend/banco.sql
-- Execute este arquivo no MySQL Workbench ou via terminal:
--   mysql -u root -p < banco.sql

CREATE DATABASE IF NOT EXISTS polo_confeccao
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE polo_confeccao;

CREATE TABLE IF NOT EXISTS candidaturas (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(150)  NOT NULL,
  email       VARCHAR(150)  NOT NULL,
  telefone    VARCHAR(20)   NOT NULL,
  cidade      VARCHAR(100)  NOT NULL,
  nascimento  DATE,
  linkedin    VARCHAR(200),
  vaga        VARCHAR(100)  NOT NULL,
  modalidade  VARCHAR(50)   NOT NULL,
  experiencia VARCHAR(50)   NOT NULL,
  pretensao   VARCHAR(50),
  historico   TEXT          NOT NULL,
  curriculo   VARCHAR(300),
  portfolio   VARCHAR(200),
  observacoes TEXT,
  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
