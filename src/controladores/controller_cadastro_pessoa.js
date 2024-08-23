const { VerificarPessoa, CadastroPessoa, CadastroFornecedor } = require("../consultas/query_cadastro_pessoa")

const cadastroPessoa = async (req, res) => {

    const dados = req.body;

    ({ error, data } = await VerificarPessoa(dados.cpf_cnpj));

    if (error) {
        return res.json({
            status: 501,
            message: "Falha ao cadastrar a nova pessoa!"
        })
    }

    if (data) {
        return res.json({
            status: 502,
            message: "Já existe uma pessoa cadastrada com esse CPF ou CNPJ!"
        })
    }

    ({ error, data } = await CadastroPessoa(dados))

    if (error) {
        return res.json({
            status: 503,
            message: "Falha ao cadastrar a nova pessoa!"
        })
    }

    if (data) {
        return res.json({
            status: 200,
            message: "A nova pessoa foi cadastrada com sucesso!"
        })
    } else {
        return res.json({
            status: 504,
            message: "Falha ao cadastrar a nova pessoa!"
        })
    }
}

const cadastroFornecedor = async (req, res) => {
    
    const dados = req.body;

    const dados_pessoa = {
        nome: dados.nome,
        cpf_cnpj: dados.cpf_cnpj,
        data_nascimento: "",
        endereco: dados.endereco,
        telefone: dados.telefone,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado_civil: "",
        cep: dados.cep,
        estado: dados.estado,
        email: dados.email,
        pix: dados.pix,
        agencia: dados.agencia,
        conta: dados.conta,
        banco: dados.banco
    };


    ({ error, data } = await VerificarPessoa(dados.cpf_cnpj));
    
    if (error) {
        return res.json({
            status: 501,
            message: "Falha ao cadastrar a nova pessoa!"
        })
    }

    if (data) {
        return res.json({
            status: 502,
            message: "CPF ou CNPJ já está cadastrado!"
        })
    }

    ({ error, data } = await CadastroPessoa(dados_pessoa))

    if (error) {
        return res.json({
            status: 503,
            message: "Falha ao cadastrar a nova pessoa!"
        })
    }

    const pessoa = data;

    ({ error, data } = await CadastroFornecedor(pessoa.id_pessoa, dados.inscricao, dados.fantasia))

    console.log(data)

    if (data) {
        return res.json({
            status: 200,
            message: "Fornecedor cadastrado com sucesso!",
            fornecedor: {
                id_fornecedor: data.id_fornecedor,
                fantasia: data.fantasia
            }
        })
    } else {
        return res.json({
            status: 504,
            message: "Falha ao cadastrar o fornecedor!"
        })
    }

}






module.exports = { cadastroPessoa, cadastroFornecedor }