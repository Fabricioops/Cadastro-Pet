import  sqlite3 from 'sqlite3'//importa o banco 
import express from 'express';
import cors from 'cors';       // Importa o middleware CORS para permitir que o frontend acesse o backend
import {open} from 'sqlite'// abre a conexão com banco de dados 

const app = express();   //// Cria a aplicação Express
const port = 5500;    //// Define a porta onde o servidor irá rodar

app.use(express.json());  //// Permite que o servidor entenda requisições com JSON no corpo
app.use(cors());  //// Permite que o frontend acesse esse backend mesmo se estiver em outra porta
//-----------------------------------------------------------------------------BD----

async function criarTabela() {
    const db = await open({            // Abre conexão com o banco
      filename: './Banco.db',
      driver: sqlite3.Database
    });
  
    await db.exec(`                   // Executa o comando SQL
      CREATE TABLE IF NOT EXISTS Pets (
        id INTEGER PRIMARY KEY, -- ID único
        nomePet VARCHAR,                         -- Nome do pet
        especie VARCHAR,                         -- Espécie
        idade INTEGER,                        -- Idade
        nomeDono VARCHAR                         -- Nome do dono
      )
    `);

    

  }

  criarTabela();


  app.post('/api/pets', async (req, res) => {
    // Desestrutura os dados recebidos no corpo da requisição
    const { nomePet, especie, idade, nomeDono } = req.body;
  
    try {
      const db = await open({             // Abre a conexão com o banco
        filename: './Banco.db',
        driver: sqlite3.Database
      });
        
  
      // Insere os dados na tabela usando placeholders seguros contra SQL Injection
      await db.run(
        'INSERT INTO Pets (nomePet, especie, idade, nomeDono) VALUES (?, ?, ?, ?)',
        [nomePet, especie, idade, nomeDono]
      );
  
      // Retorna uma resposta de sucesso
      res.status(201).json({ mensagem: 'Pet cadastrado com sucesso!' });
    } catch (error) {
      // Se ocorrer erro, mostra no console e envia erro para o cliente
      console.error('Erro ao salvar no banco:', error);
      res.status(500).json({ erro: 'Erro ao cadastrar pet' });
    }
  });
  
  
  // --------------------------- INICIAR SERVIDOR ---------------------------
  
  // Inicia o servidor na porta definida e exibe mensagem no terminal
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  