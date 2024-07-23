//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const auth = require('../controladores/controller_autenticacao');


//Rotas

router.post('/novo_usuario', auth.cadastroUsuario)
router.post('/validar_conta', auth.validarCodigoVerificacao)
router.post('/login_usuario', auth.loginUsuario)
router.post('/validar_token', auth.validacaoToken)
router.post('/reenviar_codigo', auth.reenviarCodigoValidacao)

//Exportação das Rotas
module.exports = router