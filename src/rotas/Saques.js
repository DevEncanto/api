//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação dos Controllers

const ControllerSaques = require("../src/controlers/ControllerSaques")
const ControllerAutenticacao = require("../src/controlers/ControllerAutenticacao")

//Rotas

router.post('/solicitar-saque',  ControllerSaques.SolicitacaoSaque)

//Exportação das Rotas

module.exports = router