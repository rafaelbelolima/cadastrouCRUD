const express = require('express');
const routes = express.Router();
const cadastroController = require("./controllers/cadastroController");
const cors = require("cors");

routes.options("*", cors)

//endpints - cadastro
routes.get('/cadastro/:codigo', cadastroController.readyCadastroByID); //READY
routes.post('/cadastro', cadastroController.createCadastro); //CREATE
routes.put('/cadastro/:codigo', cadastroController.updateCadastro); //UPDATE
routes.delete('/cadastro/:codigo', cadastroController.deleteCadastro); //DELETE

module.exports = routes;