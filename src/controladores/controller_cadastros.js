const { VerificarLote, VerificarEstoque } = require("../consultas/query_cadastro");
const { CadastroItem, VerificarPessoa, CadastroPessoa, CadastroFornecedor, CadastroCategoriaInsumo, VerificarCategoria, VerificarInsumo, CadastroInsumo, CadastroLote, CadastroEstoque, VerificarEtiqueta, CadastroEtiqueta, CadastroEntradaEstoque, CadastroCompras, CadastroContasPagar, VerificarFornecedor } = require("../consultas/query_cadastros");
const { converterDateParaString } = require("../utilidades/gerador_datas");
const gerarEtiqueta = require("../utilidades/gerador_etiquetas");

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
    if (data && !dados.vincular) {
        return res.json({
            status: 502,
            message: "CPF ou CNPJ já está cadastrado!"
        })
    }

    if (!data) {
        ({ error, data } = await CadastroPessoa(dados_pessoa));

        if (error) {
            return res.json({
                status: 503,
                message: "Falha ao cadastrar a nova pessoa!"
            })
        }

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

    let dados = {
        nome: req.body.nome,
        id_categoria_insumo: req.body.id_categoria_insumo,
        composicao: req.body.composicao,
        unidade: req.body.unidade,
        minimo: req.body.minimo,
        id_item: 0
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
            message: "Falha ao cadastrar o novo insumo!"
        })
    }

    ({ error, data } = await CadastroItem());


    if (error) {
        return res.json({
            status: 502,
            message: "Falha ao cadastrar o novo insumo!"
        })
    }

    dados.id_item = data.id_item;

    ({ error, data } = await CadastroInsumo(dados));

    if (data) {
        return res.json({
            status: 200,
            message: "Insumo cadastrado com sucesso!",
            insumo: {
                id_insumo: data.id_insumo,
                nome: data.nome,
                id_item: data.id_item
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
            lote: {
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

const cadastroEstoque = async (req, res) => {
    const dados = req.body;

    ({ error, data } = await VerificarEstoque(dados.nome));

    if (data) {
        return res.json({
            status: 501,
            message: "O estoque já está cadastrada!"
        })
    }

    if (error) {
        return res.json({
            status: 502,
            message: "Falha ao cadastrar o novo estoque!"
        })
    }

    ({ error, data } = await CadastroEstoque(dados));

    if (data) {
        return res.json({
            status: 200,
            message: "Estoque cadastrado com sucesso!",
            estoque: {
                id_estoque: data.id_estoque,
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

const entradaEstoque = async (req, res) => {

    let [id_compra, id_pessoa] = [null, null]

    //Desestrututação do objeto "req"
    const { tipo_entrada, insumos, data_recebimento, parcelamentos, status_financeiro, forma_pagamento } = req.body

    const id_fornecedor = req.body.insumos[0].id_fornecedor
    //Objeto com os dados para o lançamento da compra | entrada
    const compra = {
        id_fornecedor: id_fornecedor,
        data_emissao: req.body.data_emissao,
        valor: req.body.total_geral,
        prazo_inicial: req.body.prazo_inicial,
        prazo_geral: req.body.prazo_geral,
        parcelamento: req.body.parcelamento,
        documento: req.body.nf
    };

console.log(compra)

    switch (tipo_entrada) {
        case 'Compra':
            ({ error, data } = await CadastroCompras(compra));
            if (error || !data) {
                return res.json({
                    status: 502,
                    message: "Falha ao cadastrar a nova compra!"
                })
            }
            id_compra = data.id_compra || null;
            ({ error, data } = await VerificarFornecedor(id_fornecedor, "id_fornecedor"));

            console.log(error, data)
            if (error || !data) {
                return res.json({
                    status: 502,
                    message: "Falha ao cadastrar a nova entrada!"
                })
            }

            id_pessoa = data.id_pessoa

            for (const parcela of parcelamentos) {
                const compra = {
                    id_compra: id_compra,
                    id_pessoa: id_pessoa,
                    valor_previsto: parcela.valor,
                    valor_compra: parcela.valor,
                    valor_pago: 0,
                    data_vencimento: parcela.vencimento,
                    data_antecipacao: parcela.antecipacao,
                    status: status_financeiro,
                    forma_pagamento: forma_pagamento
                };

                ({ error, data } = await CadastroContasPagar(compra));
            }
            break;
        default:
            console.log("Default")
    }

    for (const insumo of insumos) {

        let cadastrada = true
        let etiqueta = ""

        while (cadastrada) {
            etiqueta = await gerarEtiqueta();
            ({ error, data } = await VerificarEtiqueta(etiqueta));
            if (!data) {
                cadastrada = false
            }
        }
        ({ error, data } = await CadastroEtiqueta(etiqueta));

        const entrada = {
            id_compra: id_compra,
            id_item: insumo.id_item,
            qtde: insumo.qtde_insumo,
            id_estoque: insumo.id_estoque,
            id_fornecedor: insumo.id_fornecedor,
            id_etiqueta: data.id_etiqueta,
            data_entrada: converterDateParaString(data_recebimento),
            valor_unitario: insumo.valor_unitario,
            descontos: insumo.descontos ? insumo.descontos : 0,
            tipo_entrada: insumo.tipo_entrada
        };

        ({ error, data } = await CadastroEntradaEstoque(entrada));
        if (error) {
            return res.json({
                status: 502,
                message: "Falha ao cadastrar a nova entrada!"
            })
        }

    }

    return res.json({
        status: 200,
        message: insumos.length == 1 ? `Entradas cadastradas com sucesso!` : `Entrada cadastrada com sucesso!`
    })
}


module.exports = {
    cadastroPessoa,
    cadastroFornecedor,
    cadastroCategoriaInsumo,
    cadastroInsumo,
    cadastroLote,
    cadastroEstoque,
    entradaEstoque
}