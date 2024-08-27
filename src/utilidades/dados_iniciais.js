const { buscas } = require("../consultas/data")
const { BuscarModelos } = require("../consultas/query_buscar_dados")
const { BuscarPermissoes } = require("../consultas/QueryLogin")

const DadosIniciais = async (id_usuario) => {

    let response = null
    let auxiliar = []
    let dados = {
        permissoes: []
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
    dados.tipos_estoques.forEach((tipo) => {
        auxiliar.push(tipo.nome)
    })
    dados.tipos_estoques = auxiliar


    return dados
}

module.exports = DadosIniciais