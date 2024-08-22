const { BuscarFornecedores, BuscarAreas } = require("../consultas/query_buscar_dados")
const { BuscarPermissoes } = require("../consultas/QueryLogin")

const DadosIniciais = async (id_usuario) => {
    
    let response = null
    let dados = {
        permissoes: []
    }
    
    //Fornecedores
    response = await BuscarFornecedores()
    dados.fornecedores = response.error ? [] : response.data

    //Permissões

    response = await BuscarPermissoes(id_usuario)

    if (response.data) {
        response.data.forEach((permissao) => {
            dados.permissoes.push(permissao.nome)
        })
    }

    //Áreas

    response = await BuscarAreas()
    dados.areas = response.error ? [] : response.data

    return dados
}

module.exports = DadosIniciais