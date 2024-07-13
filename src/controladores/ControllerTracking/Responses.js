const ResponseIpAlterado = {
    status: 603,
    pulo: false,
    VPN: true,
    message: "IP diferente, mudança de dispositivo ou uso de VPN",
    limite: false,
    semRota: false,
}
const ResponseSemRotas = {
    status: 602,
    pulo: false,
    message: "Nenhuma rota localizada",
    limite: false,
    semRota: true,
    VPN: false,
}
const ResponseIpEmUso = {
    status: 603,
    pulo: false,
    VPN: true,
    message: "Esse IP já está em uso!",
    limite: false,
    semRota: false,

}
const ResponseFinalizarLimite = {
    status: 603,
    pulo: false,
    VPN: false,
    message: "Para utilizar um novo IP finalize o limite diário do IP atual!",
    limite: false,
    semRota: false,
    finalizarLimite: true
}
const ResponseIPGerenciador = {
    status: 603,
    pulo: false,
    VPN: false,
    message: "Crie um novo IP no seu gerenciador!",
    limite: false,
    semRota: false,
    finalizarLimite: false,
    gerenciador: true
}

const ResponseLimite = {
    status: 200,
    pulo: false,
    semRota: false,
    limite: true,
    VPN: false,
    message: "Você atingiu o limite diário nesse IP!"
}
const ResponsePulo = {
    status: 200,
    pulo: true,
    semRota: false,
    limite: false,
    VPN: false,
    message: "Você atingiu o limite diário nesse IP!",
}


module.exports = {
    ResponseIpAlterado,
    ResponseSemRotas,
    ResponseIpEmUso,
    ResponseFinalizarLimite,
    ResponseIPGerenciador,
    ResponseLimite,
    ResponsePulo
}