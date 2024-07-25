const emailTrocaSenha = (dados) => {
    return `
    <div class="content" style="width: 600px; height: 500px;margin-top: 70px">
    <div class="content-body" style="padding: 5px 20px 10px 20px;">
        <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
        <h3 style="font-family: Arial, Helvetica, sans-serif;">Recuperação de senha</h3>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
            Você solicitou a recuperação da sua senha cadastrada em nossa plataforma.
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;">Utilize o seguinte token para
            confirmar a alteração da sua senha:
        </p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 14pt; text-align: center; background: rgb(231, 231, 231);">${dados.codigo}</h4>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
        O token é válido por apenas 24 horas ou a primeira alteração!.
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua compreensão</p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social</h4>
    </div>
</div>`
}

module.exports = emailTrocaSenha