//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const ControllerLogin = require('../controladores/ControllerLogin/app')

//Rotas

router.post('/login', ControllerLogin.loginUsuario)

//Exportação das Rotas

module.exports = router