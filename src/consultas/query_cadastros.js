//Importação da conexão com o banco de dados.

const database = require("../configuracoes/banco_dados")

//Importação dos modelos de dados
const Pessoa = require("../modelos/mysql/Pessoas")
const Fornecedor = require("../modelos/mysql/Fornecedores")
const Categoria_Insumo = require("../modelos/mysql/Categoria_Insumos")
const Insumos = require("../modelos/mysql/Insumos")

//Importação da função que trata eventuais erros durante as operações
const TryCatch = require("../utilidades/try")

//Objeto de consultas

const VerificarPessoa = async (cpf_cnpj) => {
  return TryCatch(async () => {
    return await Pessoa.findOne({
      where: {
        nome: cpf_cnpj
      }
    })
  })
}
const VerificarCategoria = async (nome) => {
  return TryCatch(async () => {
    return await Categoria_Insumo.findOne({
      where: {
        nome: nome
      }
    })
  })
}
const VerificarInsumo = async (nome) => {
  return TryCatch(async () => {
    return await Insumos.findOne({
      where: {
        nome: nome
      }
    })
  })
}


const CadastroPessoa = async (pessoa) => {
  return TryCatch(async () => {
    return await Pessoa.create(pessoa)
  })
}

const CadastroFornecedor = async (id_pessoa, inscricao, fantasia) => {
  return TryCatch(async () => {
    return await Fornecedor.create({
      id_pessoa: id_pessoa,
      inscricao: inscricao,
      fantasia: fantasia
    })
  })
}

const CadastroCategoriaInsumo = async (categoria) => {
  return TryCatch(async () => {
    return await Categoria_Insumo.create(categoria)
  })
}


const CadastroInsumo = async (insumo) => {
  return TryCatch(async () => {
    return await Insumos.create(insumo)
  })
}

module.exports = {
  VerificarPessoa,
  CadastroPessoa,
  CadastroFornecedor,
  CadastroCategoriaInsumo,
  CadastroInsumo,
  VerificarCategoria,
  VerificarInsumo
}
