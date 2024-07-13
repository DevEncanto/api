const { VerificarEmail, VerificarUsuario, CadastroUsuario, VerificarCodigo } = require("../../consultas/QueryCadastro")
const geradorCodigo = require("../../utilidades/stringAleatoria")

const cadastroUsuario = async (req, res) => {

    const { email, usuario, senha } = req.body

    let error, data, result = true, codigoIndicacao

    ({ error, data } = await VerificarEmail(email))

    console.log(error)

    if (error) { return res.json({ status: 404 }) }
    if (data) {
        return res.json({
            status: 504,
            message: "E-mail já está em uso!"
        })
    }

    ({ error, data } = await VerificarUsuario(usuario))

    console.log(error)

    if (error) { return res.json({ status: 404 }) }
    if (data) {
        return res.json({
            status: 504,
            message: "Usuário já está em uso!"
        })
    }

    data = true
    
    while (data) {
        codigoIndicacao = await geradorCodigo(12);
        ({ error, data } = await VerificarCodigo(codigoIndicacao))
    }


    ({ error, data } = await CadastroUsuario(usuario, email, senha, codigoIndicacao))

    console.log(error)

    if (error) { return res.json({ status: 404 }) }
    if (data) {
        return res.json({
            status: 200,
            message: "Usuário cadastrado com sucesso!"
        })
    } else {
        return res.json({
            status: 504,
            message: "Falha ao cadastrar o usuário!"
        })
    }

}


module.exports = { cadastroUsuario }