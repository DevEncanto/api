const emailSaqueRealizado = (dados) => {
    return `<div class="content" style="width: 600px; height: 500px;margin-top: 70px">
    <div class="content-body" style="padding: 5px 20px 10px 20px;">
        <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
        <h3 style="font-family: Arial, Helvetica, sans-serif;">O seu saque foi solicitado!</h3>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
            Você solicitou um saque no valor de R$ ${dados.valor} em ${dados.data} e se encontra PENDENTE, aguardando para ser processado!
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;">Caso você não
            tenha efetuado a solicitação deste saque, altere a sua senha em nosso site e cancele o saque na aba
            Histórico de Saques.
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
            Em caso de dúvidas, abra um chamado em nosso painel na aba de suporte.
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua compreensão</p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social</h4>
    </div>
</div>`
}
module.exports = emailSaqueRealizado