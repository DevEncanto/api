//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação dos Controllers

const ControllerDadosUsuario = require('../src/controlers/ControllerDadosUsuario/app')
const ControllerAutenticacao = require("../src/controlers/ControllerAutenticacao")
const ControllerAdmin = require("../src/controlers/ControllerAdm")

//Rotas

router.post('/dados-usuario', ControllerAutenticacao.VerificarToken, ControllerDadosUsuario.DadosDashboard)
router.post('/atualizar-perfil', ControllerAutenticacao.VerificarToken, ControllerDadosUsuario.AtualizarPerfil)
router.post('/solicitar-token', ControllerDadosUsuario.gerarTokenTrocaSenha)
router.post('/trocar-senha', ControllerDadosUsuario.alterarSenhaUsuario)
router.post('/alterar-status-saque', ControllerAutenticacao.VerificarToken, ControllerAdmin.alterarStatusSaque)
router.post('/codigo-indicacao', ControllerAutenticacao.VerificarToken, ControllerDadosUsuario.validarIndicacao)

//Exportação das Rotas
module.exports = router 