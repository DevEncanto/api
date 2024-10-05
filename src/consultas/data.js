const Areas = require("../modelos/mysql/Areas");
const Categoria_Insumo = require("../modelos/mysql/Categoria_Insumos");
const Estoque = require("../modelos/mysql/Estoque");
const Fornecedor = require("../modelos/mysql/Fornecedores");
const Insumos = require("../modelos/mysql/Insumos");
const Tipo_Estoque = require("../modelos/mysql/Tipo_Estoque");
const Lotes = require("../modelos/mysql/Lotes");
const Tipo_Movimentacoes = require("../modelos/mysql/Tipos_Movimentacoes");
const Tipo_Saida = require("../modelos/mysql/Tipos_Saida");

const buscas = [
  {
    model: Fornecedor,
    exclude: ['inscricao', 'id_pessoa'],
    key: "fornecedores"
  },
  {
    model: Areas,
    exclude: ['hectares'],
    key: "areas"
  },
  {
    model: Insumos,
    exclude: [],
    key: "insumos"
  },
  {
    model: Categoria_Insumo,
    exclude: ['descricao'],
    key: "categorias_insumos"
  },
  {
    model: Tipo_Estoque,
    exclude: [],
    key: "tipos_estoques"
  },
  {
    model: Tipo_Saida,
    exclude: [],
    key: "tipos_saidas"
  },
  {
    model: Tipo_Movimentacoes,
    exclude: [],
    key: "tipos_movimentacoes"
  },
  {
    model: Lotes,
    exclude: [],
    key: "lotes"
  }
]


module.exports = { buscas }