import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
import { open } from 'sqlite';

const app = express();
const port = 5500;

app.use(express.json());
app.use(cors());

app.use(express.static('public')); // Serve os arquivos HTML, CSS e JS do frontend 


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

// ROTA POST
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
    
    // AQUI pegamos o ID do novo pet:
    const petId = result.lastID;
    
    res.status(201).json({ mensagem: 'Pet cadastrado com sucesso!', id: petId });
    
  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar pet' });
  }
});

// INICIA O SERVIDOR
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/api/pets`);
});
