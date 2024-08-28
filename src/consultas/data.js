const Areas = require("../modelos/mysql/Areas");
const Categoria_Insumo = require("../modelos/mysql/Categoria_Insumos");
const Estoque = require("../modelos/mysql/Estoque");
const Fornecedor = require("../modelos/mysql/Fornecedores");
const Insumos = require("../modelos/mysql/Insumos");
const Tipo_Estoque = require("../modelos/mysql/Tipo_Estoque");
const Lotes = require("../modelos/mysql/Lotes")

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
    model: Estoque,
    exclude: [],
    key: "estoques"
  },
  {
    model: Tipo_Estoque,
    exclude: [],
    key: "tipos_estoques"
  },
  {
    model: Lotes,
    exclude: [],
    key: "lotes"
  }
]


module.exports = { buscas }