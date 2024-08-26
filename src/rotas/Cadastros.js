//Importação dos Módulos

const express = require('express')
const router = express.Router();

//Importação do Controller

const auth = require('../controladores/controller_autenticacao');
const cadastro = require('../controladores/controller_cadastro_pessoa')

//Rotas

router.post('/novo_usuario', auth.cadastroUsuario)
router.post('/nova_pessoa', cadastro.cadastroPessoa)
router.post('/novo_fornecedor', cadastro.cadastroFornecedor)
router.post('/nova_categoria_insumo', cadastro.cadastroCategoriaInsumo)

//Exportação das Rotas
module.exports = router