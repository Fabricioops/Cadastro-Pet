import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
import { open } from 'sqlite';

const app = express();
const port = 8081;

app.use(express.json());
app.use(cors());

async function criarTabela() {
  const db = await open({
    filename: './Banco.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Pets (
      id INTEGER PRIMARY KEY,
      nomePet VARCHAR,
      especie VARCHAR,
      idade INTEGER,
      nomeDono VARCHAR
    )
  `);
}

criarTabela();

// ✅ ROTA POST - DEIXE ANTES do `static`
app.post('/api/pets', async (req, res) => {
  const { nomePet, especie, idade, nomeDono } = req.body;

  try {
    const db = await open({
      filename: './Banco.db',
      driver: sqlite3.Database
    });

    const result = await db.run(
      'INSERT INTO Pets (nomePet, especie, idade, nomeDono) VALUES (?, ?, ?, ?)',
      [nomePet, especie, idade, nomeDono]
    );

    res.status(201).json({ mensagem: 'Pet cadastrado com sucesso!' });

  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar pet' });
  }
});

//  AQUI você serve os arquivos estáticos
app.use(express.static('public'));

// INICIA O SERVIDOR
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
