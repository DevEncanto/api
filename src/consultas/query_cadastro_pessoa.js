//Importação da conexão com o banco de dados.

const database = require("../configuracoes/banco_dados")

//Importação da model Usuários
const Pessoa = require("../modelos/mysql/Pessoas")
const Fornecedor = require("../modelos/mysql/Fornecedores")
//Importação da função que gera hash da senha.

const TryCatch = require("../utilidades/try")

//Objeto de consultas

const VerificarPessoa = async (cpf_cnpj) => {
  return TryCatch(async () => {
    return await Pessoa.findOne({
      where: {
        cpf_cnpj: cpf_cnpj
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

module.exports = {
  VerificarPessoa,
  CadastroPessoa,
  CadastroFornecedor
}
