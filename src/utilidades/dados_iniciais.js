const { buscas } = require("../consultas/data")
const { BuscarModelos } = require("../consultas/query_buscar_dados")
const { BuscarPermissoes, BuscarEstoques, BuscarItensEstoqueInsumos, BuscarEntradasEstoqueInsumos } = require("../consultas/QueryLogin")

const DadosIniciais = async (id_usuario) => {

    let response = null
    let auxiliar = []
    let dados = {
        permissoes: [],
        estoques: [],
        estoque_insumos: [],
        entradas_insumos: []
    }

    for (const busca of buscas) {
        response = await BuscarModelos(busca.model, busca.exclude)
        dados[busca.key] = response.error ? [] : response.data
    }

    response = await BuscarPermissoes(id_usuario)

    if (response.data) {
        response.data.forEach((permissao) => {
            dados.permissoes.push(permissao.nome)
        })
    }

    response = await BuscarItensEstoqueInsumos()

    dados.estoque_insumos = response.data ? response.data : []

    response = await BuscarEstoques()

    dados.estoques = response.data ? response.data : []


    dados.tipos_estoques.forEach((tipo) => {
        auxiliar.push(tipo.nome)
    })
    dados.tipos_estoques = auxiliar
    auxiliar = []
    dados.tipos_movimentacoes.forEach((tipo) => {
        auxiliar.push(tipo.nome)
    })
    dados.tipos_movimentacoes = auxiliar
    auxiliar = []

    response = await BuscarEntradasEstoqueInsumos()
    dados.entradas_insumos = response.data ? response.data : []

    dados.entradas_insumos.forEach((entrada, index) => {
        entrada.id_item = index + 1
    })

    return dados
}

module.exports = DadosIniciais