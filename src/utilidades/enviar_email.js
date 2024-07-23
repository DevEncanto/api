const nodemailer = require("nodemailer")
const emailCadastro = require("./modelos_emails/cadastro")
const emailSaqueRealizado = require("./modelos_emails/saque-realizado")
const emailSaqueRecusado = require("./modelos_emails/saque-recusado")
const emailTrocaSenha = require("./modelos_emails/troca-senha")
const emailConvite = require("./modelos_emails/convite")
const emailPagamentoRealizado = require("./modelos_emails/pagamento-realizado")
const reenvioEmail = require("./modelos_emails/nova_solicitacao")


const smtp = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,

    auth: {
        user: "cherrysocial@kullesoft.com",
        pass: "Kailly@2311"
    }
})


const renderHTML = (mode, dados) => {
    let html = ""
    switch (mode) {
        case "cadastro": html = emailCadastro(dados); break;
        case "pagamento": html = emailPagamentoRealizado(dados); break;
        case "saque-solicitado": html = emailSaqueRealizado(dados); break;
        case "saque-recusado": html = emailSaqueRecusado(dados); break;
        case "token-troca-senha": html = emailTrocaSenha(dados); break;
        case "convite": html = emailConvite(dados); break;
        case "nova_solicitacao": html = reenvioEmail(dados); break;
    }
    return html
}
const initConfig = (html, destinatario, titulo) => {
    return configEmail = {
        from: "cherrysocial@kullesoft.com",
        to: destinatario,
        subject: titulo,
        html: html,
    }
}

const enviarEmail = async (destinatario, titulo, mode, dados) => {
    const html = renderHTML(mode, dados)
    const config = initConfig(html, destinatario, titulo)
    const response = new Promise((resolve, reject) => {
        smtp.sendMail(config).then(res => {
            smtp.close()
            return resolve(res)
        }).catch(error => {
            smtp.close()
            return reject(error)
        })
    })
    return response
}

module.exports = enviarEmail
