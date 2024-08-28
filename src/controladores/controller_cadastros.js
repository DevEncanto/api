const { VerificarLote } = require("../consultas/query_cadastro");
const { VerificarPessoa, CadastroPessoa, CadastroFornecedor, CadastroCategoriaInsumo, VerificarCategoria, VerificarInsumo, CadastroInsumo, CadastroLote } = require("../consultas/query_cadastros")

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

    ({ error, data } = await CadastroPessoa(dados_pessoa));

    if (error) {
        return res.json({
            status: 503,
            message: "Falha ao cadastrar a nova pessoa!"
        })
    }

    const pessoa = data;

    ({ error, data } = await CadastroFornecedor(pessoa.id_pessoa, dados.inscricao, dados.fantasia))

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

const cadastroInsumo = async (req, res) => {
    console.log(req.body)

    const dados = {
        nome: req.body.nome,
        id_categoria_insumo: req.body.id_categoria_insumo,
        composicao: req.body.composicao,
        unidade: req.body.unidade,
        minimo: req.body.minimo
    };

    ({ error, data } = await VerificarInsumo(dados.nome));

    if (data) {
        return res.json({
            status: 501,
            message: "O insumo já está cadastrado!"
        })
    }

    if (error) {
        return res.json({
            status: 502,
            message: "Falha ao cadastrar a nova categoria!"
        })
    }

    ({ error, data } = await CadastroInsumo(dados));

    if (data) {
        return res.json({
            status: 200,
            message: "Insumo cadastrado com sucesso!",
            insumo: {
                id_insumo: data.id_insumo,
                nome: data.nome
            }
        })
    } else {
        return res.json({
            status: 503,
            message: "Falha ao cadastrar a novo insumo!"
        })
    }
}

const cadastroCategoriaInsumo = async (req, res) => {

    const dados = req.body;

    ({ error, data } = await VerificarCategoria(dados.nome));

    if (data) {
        return res.json({
            status: 501,
            message: "Categoria já está cadastrada!"
        })
    }

    if (error) {
        return res.json({
            status: 502,
            message: "Falha ao cadastrar a nova categoria!"
        })
    }

    ({ error, data } = await CadastroCategoriaInsumo(dados))

    if (data) {
        return res.json({
            status: 200,
            message: "Categoria cadastrada com sucesso!",
            categoria: {
                id_categoria_insumo: data.id_categoria_insumo,
                nome: data.nome
            }
        })
    } else {
        return res.json({
            status: 503,
            message: "Falha ao cadastrar a nova categoria!"
        })
    }

}

const cadastroLote = async (req, res) => {
    const dados = req.body;

    ({ error, data } = await VerificarLote(dados.nome));

    if (data) {
        return res.json({
            status: 501,
            message: "O lote já está cadastrada!"
        })
    }

    if (error) {
        return res.json({
            status: 502,
            message: "Falha ao cadastrar o novo lote!"
        })
    }

    ({ error, data } = await CadastroLote(dados));

    if (data) {
        return res.json({
            status: 200,
            message: "Lote cadastrado com sucesso!",
            categoria: {
                id_lote: data.id_lote,
                nome: data.nome
            }
        })
    } else {
        return res.json({
            status: 503,
            message: "Falha ao cadastrar o novo lote!"
        })
    }
}


module.exports = {
    cadastroPessoa,
    cadastroFornecedor,
    cadastroCategoriaInsumo,
    cadastroInsumo,
    cadastroLote
}