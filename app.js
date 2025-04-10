import  sqlite3 from 'sqlite3'//importa o banco 
import {open} from 'sqlite'// abre a conexão com banco de dados 

async function criarEpopularTabelaUsuarios(nome,sobrenome){
    const db = await open({          //só segue a execução se essa função der certo 
        filename:'./Banco.db',        //caminho para o BD
        driver: sqlite3.Database,   // executa BD

    });

await db.run(`CREATE TABLE IF NOT EXISTS  Pets (id INTEGER PRIMARY KEY, petName TEXT, idade INTEGER, especie TEXT,nomeDono TEXT )`); //cria tabela caso el
    
    

    

}
criarEpopularTabelaUsuarios();
