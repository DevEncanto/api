const reenvioEmail = (dados) => {
    return `<div class="content" style="width: 600px; height: 500px;margin-top: 70px">
    <div class="content-body" style="padding: 5px 20px 10px 20px;">
        <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;">Recebemos sua solicitação para um novo código de validação de conta. Utilize o código abaixo para validar sua conta:
        </p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 14pt; text-align: center; background: rgb(231, 231, 231);">${dados.codigo}</h4>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social</h4>
    </div>
    <div class="footer">

    </div>
</div>`
}

module.exports = reenvioEmail