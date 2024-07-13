//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const ControllerDesafio = require("../src/controlers/ControllerDesafios")
const ControllerTrap = require("../src/controlers/ControllerHost")
const ControlerConfirmacao = require("../src/controlers/ControllerConfirmacao/app")
const { MiddlewareRotas } = require("../src/middlewares/MiddlewareRotas/app")
//Importação da Configuração das Rotas

const routes = require("../utilidades/routes")

//Rotas

routes.forEach((route) => {
    router.get(`/confirmacao/${route}`, ControllerTrap.VerificarHost, ControllerDesafio.RenderDesafioVerificacao)
})
router.post("/confirmar-tarefa", MiddlewareRotas, ControlerConfirmacao.ConfirmarTarefa)

//Exportação das Rotas
module.exports = router