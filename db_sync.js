(async () => {
    const db = require('./src/configuracoes/banco_dados')
    const Avatares = require("./src/modelos/Avatares")
    const Bilhetes = require("./src/modelos/Bilhetes")
    const FluxoCaixa = require("./src/modelos/FluxoCaixa")
    const Historico = require("./src/modelos/Historico")
    const Recebimento = require("./src/modelos/Recebimento")
    const Rifas = require("./src/modelos/Rifas")
    const Saques = require("./src/modelos/Saques")
    const Usuarios = require("./src/modelos/Usuarios")
    await db.sync({ force: true })
})()