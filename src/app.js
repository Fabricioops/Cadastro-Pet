import  sqlite3 from 'sqlite3'//importa o banco 
import {open} from 'sqlite'// abre a conexão com banco de dados 

async function criarEpopularTabelaUsuarios(nome,sobrenome){
    const db = await open({          //só segue a execução se essa função der certo 
        filename:'./Banco.db',        //caminho para o BD
        driver: sqlite3.Database,   // executa BD

    });

    db.run(`CREATE TABLE IF NOT EXISTS  usuarios(id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT)`); //cria tabela caso el
    
    db.run(`INSERT INTO usuarios(nome,sobrenome) VALUES(?,?)`,[nome,sobrenome])

    db.run(` DELETE FROM usuarios`);
    

}
criarEpopularTabelaUsuarios();
