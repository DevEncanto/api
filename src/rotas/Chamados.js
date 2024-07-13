//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação dos Controllers

const ControllerAutenticacao = require("../src/controlers/ControllerAutenticacao")
const ControllerChamados = require("../src/controlers/ControllerChamados")
//Rotas

router.post('/abrir-chamado', ControllerChamados.AbrirChamado)
router.post('/enviar-mensagem', ControllerChamados.EnviarMesagem)
router.post('/buscar-mensagens', ControllerChamados.BuscarMensagens)
//Exportação das Rotas
module.exports = router 