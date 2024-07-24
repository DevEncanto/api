const { VerificarEmail, VerificarUsuario, CadastroUsuario, VerificarCodigo, VerificadorCodigoNumerico, AtualizarStatusConta } = require("../consultas/QueryCadastro")
const { geradorCodigo, geradorCodigoNumerico } = require("../utilidades/stringAleatoria")
const enviarEmail = require("../utilidades/enviar_email")
const { BuscarUsuario } = require("../consultas/QueryLogin")
const { compare } = require("../utilidades/criptografia")
const { gerarToken } = require("../utilidades/jwt")
const backupServidor = require("../utilidades/backup")

const cadastroUsuario = async (req, res) => {
    const { email, usuario, senha, nomeCompleto } = req.body

    let error, data, result = true, codigoIndicacao, codigoValidacao

    ({ error, data } = await VerificarEmail(email))

    if (error) { return res.json({ status: 401, message: "Falha ao cadastrar o usuário!" }) }

    if (data) {
        return res.json({
            status: 504,
            message: "E-mail já está em uso!"
        })
    }

    ({ error, data } = await VerificarUsuario(usuario))

    if (error) { return res.json({ status: 402, message: "Falha ao cadastrar o usuário!" }) }
    if (data) {
        return res.json({
            status: 505,
            message: "Usuário já está em uso!"
        })
    }

    data = true

    while (data) {
        codigoIndicacao = await geradorCodigo(12);
        ({ error, data } = await VerificarCodigo(codigoIndicacao))
    }
    data = true
    while (data) {
        codigoValidacao = await geradorCodigoNumerico();
        data = await VerificadorCodigoNumerico(codigoValidacao, req.app.locals.codigosCadastro)
    }

    ({ error, data } = await CadastroUsuario(usuario, email, senha, codigoIndicacao, nomeCompleto))

    if (error) { return res.json({ status: 403, message: "Falha ao cadastrar o usuário!" }) }
    
    console.log(JSON.stringify(`Array 1: ${req.app.locals.codigosValidacao}`))
    console.log(JSON.stringify(`Array 2: ${req.app.locals.codigosTrocaSenha}`))
    
    req.app.locals.codigosValidacao.push({
        idUsuario: data.idUsuario,
        codigo: codigoValidacao,
        email: email,
        usuario: usuario
    })
    const sendEmail = await enviarEmail(email, "Cadastro Realizado", "cadastro", {
        usuario: usuario,
        codigo: codigoValidacao
    })
    if (data) {
        await backupServidor(req.app)
        return res.json({
            status: 200,
            message: "Usuário cadastrado com sucesso!"
        })
    } else {
        return res.json({
            status: 404,
            message: "Falha ao cadastrar o usuário!"
        })
    }

}
const validarCodigoVerificacao = async (req, res) => {
    const codigo = req.body.codigo
    let result = false, indexCodigo, error, data, idUsuario
    let codigos = req.app.locals.codigosValidacao

    codigos.forEach((item, index) => {
        if (item.codigo == codigo) {
            result = true
            indexCodigo = index
            idUsuario = item.idUsuario
            return
        }
    })
    if (result) {

        ({ error, data } = await AtualizarStatusConta(idUsuario, "ATIVA"));

        if (error || data == undefined) {
            return res.json({
                status: 401,
                message: "Falha ao ativar a sua conta!"
            })
        } else {
            req.app.locals.codigosValidacao = codigos.filter(
                (item, index) => index != indexCodigo
            );
            await backupServidor(req.app)
            return res.json({
                status: 200,
                message: "Sua conta foi ativada com sucesso!"
            })
        }

    } else {
        return res.json({
            status: 402,
            message: "Código incorreto!"
        })
    }
}


const loginUsuario = async (req, res) => {
    const { acesso, senha } = req.body;
    let codigoValidacao, result, indexCodigo;
    const codigos = req.app.locals.codigosValidacao;

    const { error, data } = await BuscarUsuario(acesso);

    if (error) {
        return res.json({
            status: 401,
            message: "Falha ao realizar o login!"
        });
    }

    const usuario = data;

    switch (usuario.statusConta) {
        case "BANIDA":
            return res.json({
                status: 402,
                message: "A sua conta foi banida por violar nossos termos de uso!"
            });

        case "SUSPENSA":
            return res.json({
                status: 403,
                message: "A sua conta foi suspensa por suspeita de violação de nossos termos de uso!"
            });

        case "VALIDAÇÃO":
            result = codigos.some((item, index) => {
                if (item.idUsuario === usuario.idUsuario) {
                    indexCodigo = index;
                    return true;
                }
                return false;
            });

            if (result) {
                codigoValidacao = codigos[indexCodigo].codigo;
            } else {
                let dataValido = true;
                while (dataValido) {
                    codigoValidacao = await geradorCodigoNumerico();
                    dataValido = await VerificadorCodigoNumerico(codigoValidacao, codigos);
                }
                req.app.locals.codigosValidacao.push({
                    idUsuario: usuario.idUsuario,
                    codigo: codigoValidacao
                });
            }

            await enviarEmail(usuario.email, "Ativação da Conta", "cadastro", {
                usuario: usuario.usuario,
                codigo: codigoValidacao
            });

            await backupServidor(req.app)
            return res.json({
                status: 404,
                message: "A sua conta ainda não foi ativada, um código será enviado para o seu e-mail para ativação!"
            });
    }

    const isSenhaCorreta = await compare(senha, usuario.senha);

    if (isSenhaCorreta) {
        const token = await gerarToken(usuario.idUsuario);
        return res.json({
            status: 200,
            message: "Login realizado com sucesso",
            token,
            idUsuario: usuario.idUsuario
        });
    } else {
        return res.json({
            status: 405,
            message: "Os dados fornecidos estão incorretos!"
        });
    }
};

const reenviarCodigoValidacao = async (req, res) => {
    try {
        const codigos = req.app.locals.codigosValidacao
        const acesso = req.body.acesso

        result = codigos.some((item, index) => {
            if (item.email === acesso || item.usuario == acesso) {
                indexCodigo = index;
                return true;
            }
            return false;
        });

        if (result) {
            codigoValidacao = codigos[indexCodigo].codigo;
        } else {
            let dataValido = true;
            while (dataValido) {
                codigoValidacao = await geradorCodigoNumerico();
                dataValido = await VerificadorCodigoNumerico(codigoValidacao, codigos);
            }
            req.app.locals.codigosValidacao.push({
                idUsuario: usuario.idUsuario,
                codigo: codigoValidacao
            });
        }

        await enviarEmail(codigos[indexCodigo].email, "Ativação da Conta", "nova_solicitacao", {
            usuario: codigos[indexCodigo].usuario,
            codigo: codigoValidacao
        });

        await backupServidor(req.app)
        return res.json({
            status: 200,
            message: "Enviamos o seu código de validação, verifique o seu e-mail"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 401,
            message: "Não foi possível enviar o seu código de validação."
        })
    }
}


const validacaoToken = async (req, res) => {

}
module.exports = {
    cadastroUsuario,
    validarCodigoVerificacao,
    loginUsuario,
    validacaoToken,
    reenviarCodigoValidacao
}