const emailCadastro = (dados) => {
    return `<div class="content" style="width: 600px; height: 500px;margin-top: 70px">
    <div class="content-body" style="padding: 5px 20px 10px 20px;">
        <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
        <h3 style="font-family: Arial, Helvetica, sans-serif;">Boas Vindas!</h3>
        <p
            style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify; text-indent: 20px;">
            Primeiramente gostaríamos de desejar as boas vindas ao nosso site.
            Temos o objetivo de entregar uma ótima experiência com nossa plataforma e o mais importante,
            lhe proporcionar uma renda extra realizando tarefas simples e desafios épicos.</p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua confiança e
            preferência!</p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Cherry Social</h4>
    </div>
    <div class="footer">

    </div>
</div>`
}

module.exports = emailCadastro