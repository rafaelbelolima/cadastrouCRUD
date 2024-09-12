const database = require('../database')

module.exports = {

    //Método para pesquisar um cadastrado pelo seu ID
    getcadastroByID: (id) => {
        return new Promise((accepted, rejected) => {
            database.query(`SELECT * FROM cadastro WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })
    },

    //Método para cadastrar um usuario
    createCadastro: (nome, telefone, endereco, login, senha, data, email) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `INSERT INTO cadastro (nome, telefone, endereco,  dt_Nascimento, email) VALUES 
                ('${nome}', '${telefone}', '${endereco}' , '${login}', '${senha}','${data}', ${email})`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })
    },
    
    //Método para atualizar um cadastrado
    updateCadastro: (id, nome, telefone, endereco, login, senha, data, email) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `UPDATE cadastro SET nome = '${nome}', telefone = '${telefone}', endereco = '${endereco}' , login = '${login}', senha = '${senha}', dt_Nascimento = '${data}' ,email = '${email}' WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })
    },

    //Método para deletar um Usuario
    deleteCadastro: (id) => {
        return new Promise((accepted, rejected) => {
            database.query(
                `DELETE FROM cadastro WHERE id = ${id}`,
                (error, results) => {
                    if (error) {
                        rejected(error)
                        return
                    }
                    accepted(results)
                }
            )
        })
    }
}