//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const auth = require('../controladores/controller_autenticacao');


//Rotas

router.post('/novo_usuario', auth.cadastroUsuario)
router.post('/login_usuario', auth.loginUsuario)

//Exportação das Rotas
module.exports = router