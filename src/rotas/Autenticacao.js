//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const auth = require('../controladores/controller_autenticacao');


//Rotas

router.post('/login_usuario', auth.loginUsuario)
router.get('/validacao_token', auth.ValidarToken)

//Exportação das Rotas
module.exports = router