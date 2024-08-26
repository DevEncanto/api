const Areas = require("../modelos/mysql/Areas");
const Categoria_Insumo = require("../modelos/mysql/Categoria_Insumos");
const Fornecedor = require("../modelos/mysql/Fornecedores");
const Insumos = require("../modelos/mysql/Insumos");

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
  }
]


module.exports = { buscas }