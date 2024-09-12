const cadastroService = require("../services/cadasatroService");

module.exports = {


    readyCadastroByID: async (request, response) => {
        let json = { error: "", result: [] }

        let id = request.params.codigo

        let cadastro = await cadastroService.getcadastroByID(id)

        for (let i in cadastro) {
            json.result.push({
                id: cadastro[i].id,
                nome: cadastro[i].nome,
                telefone: cadastro[i].telefone,
                endereco: cadastro[i].endereco,
                login: cadastro[i].login,
                senha: cadastro[i].senha,
                dt_Nascimento: cadastro[i].dt_Nascimento,
                email: cadastro[i].email

            })
        }
        response.header("Access-Control-Allow-Origin", "*")
        if (json.result.length == 0) {

            response.status(200).json({
                message: "Nenhuma instância de Usuario foi cadastrado!"
            })
        } else {
            response.json(json)
        }

    },

    createCadastro: async (request, response) => {

        let json = { error: "", result: {} }

        let nome = request.body.nome
        let telefone = request.body.descricao
        let endereco = request.body.endereco
        let login = request.body.login
        let senha = request.body.senha
        let dt_Nascimento = request.body.dt_Nascimento
        let email = request.body.email

        if (nome && telefone && endereco && login && senha && dt_Nascimento && email) {
            let turma = await cadastroService.createCadastro(
                nome,
                telefone,
                endereco,
                login,
                senha,
                dt_Nascimento,
                email
            )

            json.result = {
                id: turma.insertId,
                nome,
                endereco,
                login,
                senha,
                dt_Nascimento,
                email
            }
        }
        else {
            json.error = "Campos Incompletos!"
        }

        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    },


    updateCadastro: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.codigo
        let nome = request.body.nome
        let telefone = request.body.telefone
        let data = request.body.data
        let endereco = request.body.endereco

        if (id) {
            let aluno = await cadastroService.getCadastroByID(id)
            if (aluno.length == 0) {
                json.error = "Usuario não foi encontrado!"
                response.header("Access-Control-Allow-Origin", "*")
                    .status(200).json(json)

            }
            await cadastroService.updateCadastro(
                id,
                nome,
                telefone,
                endereco,
                data,
                email
            )

            json.result = {
                id,
                nome,
                telefone,
                endereco,
                data,
                email
            }
        }
        else {
            json.error = "Error ID!"
            response.header("Access-Control-Allow-Origin", "*")
            response.status(400).json(json)
        }

        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    },


    deleteCadastro: async (request, response) => {
        let json = { error: "", result: "" }

        let id = request.params.codigo

        if (id) {
            let cadastro = await cadastroService.getCadastroByID(id)

            if (cadastro.length == 0) {
                json.error = "Usuario não foi encontrado!"
                response.header("Access-Control-Allow-Origin", "*")
                response.status(400).json(json)

            } else {
                await AlunoService.deleteAluno(id)
                await turmaService.delAlunos(aluno[0].fk_turma)
                json.result = `Usuario ${id} deletado com sucesso!!!`
                response.header("Access-Control-Allow-Origin", "*")
                response.status(200).json(json)
            }

        } else {
            json.error = "Error ID!"
            response.header("Access-Control-Allow-Origin", "*")
                .status(400).json(json)
        }
    }

}