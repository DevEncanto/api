const emailConvite = (dados)=>{
    return (
        `
        <div class="content-body" style="padding: 5px 20px 10px 20px;">
            <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
            <h3 style="font-family: Arial, Helvetica, sans-serif;">Conta inativa!</h3>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
                Notamos que sua conta quase não tem desafios realizados!
            </p>
            <p
                style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;text-align: justify;">
                Venha, vamos realizar os desafios para ganhar aquela grana extra!
            </p>

            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
                Lembra do limite diário? Ele sumiu! Agora quem faz o limite é você!
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 13pt; font-weight: 600;text-align: justify;">
                Fizemos um reajuste nos valores dos desafios!
            </p>
            <p
                style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;font-weight: 600; color:rgb(2, 173, 2)">
                Fácil: R$ 0,008 >> R$ 0,010
            </p>
            <p
                style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;font-weight: 600; color:rgb(248, 112, 0)">
                Médio: R$ 0,010 >> R$ 0,015
            </p>
            <p
                style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;font-weight: 600; color:rgb(226, 0, 0)">
                Difícil: R$ 0,019 >> R$ 0,020
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 13pt; font-weight: 600;text-align: justify;">
                Venha lucrar com a gente!!!
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua compreensão.</p>
            <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social.</h4>
        </div>`
    )
}

module.exports = emailConvite