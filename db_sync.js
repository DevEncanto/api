const { hash } = require('./src/utilidades/criptografia');

(async () => {

    const tabelas = [
        'insumos'
    ]

    const tipos_movimentacoes = [
        'Empréstimo',
        'Compra',
        'Devolução',
        'Bonificação'
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
    const Etiqueta = require("./src/modelos/mysql/Etiquetas")
    const SaidaEstoque = require("./src/modelos/mysql/Saida_Estoque")
    const Entrada_Estoque = require("./src/modelos/mysql/Entrada_Estoque")
    const Compras = require("./src/modelos/mysql/Compras")
    const Contas_Pagar = require("./src/modelos/mysql/Contas_a_Pagar")
    const Tipo_Movimentacoes = require("./src/modelos/mysql/Tipos_Movimentacoes")
    const Emprestimos = require("./src/modelos/mysql/Emprestimos")

    await db.sync({ force: true })

    for (const tabela of tabelas) {
        await Tipo_Estoque.create({
            nome: tabela
        })
    }

    for (const tipo_movimentacao of tipos_movimentacoes) {
        await Tipo_Movimentacoes.create({
            nome: tipo_movimentacao
        })
    }
    await Usuario.create({
        usuario: "gabriel_vogais",
        senha: await hash("megagengar")
    })

    const categoria_insumo = await Categoria_Insumo.create({
        nome: "Fertilizante"
    })

    const lotes = await Lotes.create({
        nome: "Lote 13"
    })

    await Estoque.create({
        nome: "Estoque Insumos",
        id_lote: lotes.id_lote,
        tipo_estoque: "insumos"
    })

    const item = await Itens.create()

    const insumos = Insumos.create({
        nome: "Cloreto de Potássio",
        id_categoria_insumo: categoria_insumo.id_categoria_insumo,
        composicao: "KCL",
        minimo: 5000,
        unidade: "KG",
        id_item: item.id_item
    })

    const pessoa = await Pessoa.create({
        nome: "Teste",
        cpf_cnpj: "Teste",
        email: "Teste",
        data_nascimento: "Teste",
        telefone: "Teste",
        endereco: "Teste",
        cep: "Teste",
        bairro: "Teste",
        estado: "Teste",
        estado_civil: "Teste",
        pix: "Teste",
        agencia: "Teste",
        conta: "Teste",
        banco: "Teste"
    })

    const fornecedor = await Fornecedor.create({
        id_pessoa: pessoa.id_pessoa,
        inscricao: "Teste",
        fantasia: "Teste"
    })

})();