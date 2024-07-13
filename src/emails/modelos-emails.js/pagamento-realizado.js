const emailPagamentoRealizado = (dados) => {
    return (
        `
        <div class="content" style="width: 600px; height: 500px;margin-top: 70px">
        <div class="content-body" style="padding: 5px 20px 10px 20px;">
            <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
            <h3 style="font-family: Arial, Helvetica, sans-serif;">O seu pagamento foi realizado!</h3>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
                Você solicitou um saque no valor de R$ ${dados.valor}.
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;text-align: justify;">
                Temos o prazer de lhe informar ele já foi depositado na sua conta bancária!.
            </p>
           
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
                Em caso de dúvidas ou divergências, entre em contato com nosso suporte, acesse a aba de suporte e escolha um dos nossos canais de comunicação.
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua atenção.</p>
            <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social</h4>
        </div>
    </div>
        `
    )
}

module.exports = emailPagamentoRealizado