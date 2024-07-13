//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const ControllerTracking = require("../src/controlers/ControllerTracking/app")
const ControllerAutenticacao = require("../src/controlers/ControllerAutenticacao")
//Rotas

router.post('/desafios', ControllerAutenticacao.VerificarToken, ControllerTracking.ControladorDeRotas)

//Exportação das Rotas

module.exports = router