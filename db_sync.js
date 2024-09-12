(async () => {

    const tabelas = [
        'insumos'
    ]

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
    const Tipo_Estoque = require("./src/modelos/mysql/Tipo_Estoque")
    const Estoque = require("./src/modelos/mysql/Estoque")
    const Itens = require("./src/modelos/mysql/Itens")
    const SaidaEstoque = require("./src/modelos/mysql/Saida_Estoque")
    const Entrada_Estoque = require("./src/modelos/mysql/Entrada_Estoque")

    await db.sync({ force: true })

    for (const tabela of tabelas) {
        await Tipo_Estoque.create({
            nome: tabela
        })
    }
})();