//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const { cadastroUsuario } = require('../controladores/ControllerCadastro/app');


//Rotas

router.post('/novo_usuario', cadastroUsuario)

//Exportação das Rotas
module.exports = router