(async () => {
    const db = require('./src/configuracoes/banco_dados')
    const Pessoa = require("./src/modelos/mysql/Pessoas")
    const Usuario = require("./src/modelos/mysql/Usuarios")
    const Permissoes = require("./src/modelos/mysql/Permissoes")
    const Permissao_Usuario = require("./src/modelos/mysql/Permissoes_Usuarios")
    const Fornecedor = require("./src/modelos/mysql/Fornecedores")
    const Lotes = require("./src/modelos/mysql/Lotes")
    const Areas = require("./src/modelos/mysql/Areas")
    const PontosMapa = require("./src/modelos/mysql/PontosMapa")
    const Categoria_Insumo = require("./src/modelos/mysql/Categoria_Insumos")
    const Insumos = require("./src/modelos/mysql/Insumos")
    
    await db.sync({ force: true })
})();