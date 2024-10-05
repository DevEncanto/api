//Importação da conexão com o banco de dados.

const database = require("../configuracoes/banco_dados")

//Importação dos modelos de dados
const Pessoa = require("../modelos/mysql/Pessoas")
const Fornecedor = require("../modelos/mysql/Fornecedores")
const Categoria_Insumo = require("../modelos/mysql/Categoria_Insumos")
const Insumos = require("../modelos/mysql/Insumos")
const Item = require("../modelos/mysql/Itens")
const Entrada_Estoque = require("../modelos/mysql/Entrada_Estoque")
const Etiqueta = require("../modelos/mysql/Etiquetas")

//Importação da função que trata eventuais erros durante as operações
const TryCatch = require("../utilidades/try")
const Lotes = require("../modelos/mysql/Lotes")
const Estoque = require("../modelos/mysql/Estoque")
const Compras = require("../modelos/mysql/Compras")
const Contas_Pagar = require("../modelos/mysql/Contas_a_Pagar")

//Objeto de consultas

const VerificarPessoa = async (cpf_cnpj, prop) => {
  return TryCatch(async () => {
    return await Pessoa.findOne({
      where: {
        nome: cpf_cnpj
      }
    })
  })
}

const VerificarFornecedor = (value, prop) => {
  return TryCatch(async () => {
    return await Fornecedor.findOne({
      where: {
        [prop]: value
      }
    })
  })
}

const VerificarEtiqueta = async (etiqueta) => {
  return TryCatch(async () => {
    return await Etiqueta.findOne({
      where: {
        etiqueta: etiqueta
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

const CadastroEstoque = async (estoque) => {
  return TryCatch(async () => {
    return await Estoque.create(estoque)
  })
}

const CadastroEtiqueta = async (etiqueta) => {
  return TryCatch(async () => {
    return await Etiqueta.create({
      etiqueta: etiqueta
    })
  })
}


const CadastroPessoa = async (pessoa) => {
  return TryCatch(async () => {
    return await Pessoa.create(pessoa)
  })
}

const CadastroLote = async (lote) => {
  return TryCatch(async () => {
    return await Lotes.create(lote)
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

const CadastroItem = async () => {
  return TryCatch(async () => {
    return await Item.create()
  })
}

const CadastroEntradaEstoque = async (entrada) => {
  return TryCatch(async () => {
    return await Entrada_Estoque.create(entrada)
  })
}

const CadastroCompras = async (compra) => {
  return TryCatch(async () => {
    return await Compras.create(compra)
  })
}

const CadastroContasPagar = async (compra) => {
  return TryCatch(async () => {
    return await Contas_Pagar.create(compra)
  })
}

module.exports = {
  VerificarPessoa,
  CadastroPessoa,
  CadastroFornecedor,
  CadastroCategoriaInsumo,
  CadastroInsumo,
  VerificarCategoria,
  VerificarInsumo,
  CadastroLote,
  CadastroEstoque,
  CadastroItem,
  CadastroEntradaEstoque,
  VerificarEtiqueta,
  CadastroEtiqueta,
  CadastroCompras,
  CadastroContasPagar,
  VerificarFornecedor
}
