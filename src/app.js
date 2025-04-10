import  sqlite3 from 'sqlite3'//importa o banco 
import express from 'express';
import cors from 'cors';       // Importa o middleware CORS para permitir que o frontend acesse o backend
import {open} from 'sqlite'// abre a conexão com banco de dados 

const app = express();   //// Cria a aplicação Express
const port = 3000;    //// Define a porta onde o servidor irá rodar

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
  