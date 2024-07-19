const emailSaqueRecusado = (dados) => {
    return `
        <div class="content" style="width: 600px; height: 500px;margin-top: 70px">
        <div class="content-body" style="padding: 5px 20px 10px 20px;">
            <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
            <h3 style="font-family: Arial, Helvetica, sans-serif;">O seu saque foi recusado!</h3>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
                Você solicitou um saque no valor de R$ ${dados.valor}. No entanto, nossa equipe recusou o mesmo pelo motivo a abaixo:
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;text-align: justify;">
                Foram encontradas divergências nos dados bancários fornecidos, sugerimos solicitar novamente o saque e conferir os dados fornecidos.
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;text-align: justify;">
                O valor sacado será creditado na sua conta novamente para um novo saque.
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
                Em caso de dúvidas, abra um chamado em nosso painel na aba de suporte e informe o número do saque: .
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua compreensão</p>
            <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social</h4>
        </div>
    </div>
    `
}
module.exports = emailSaqueRecusado