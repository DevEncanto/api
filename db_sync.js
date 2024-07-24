(async () => {
    const db = require('./src/configuracoes/banco_dados')
    const Avatares = require("./src/modelos/mysql/Avatares")
    const Bilhetes = require("./src/modelos/mysql/Bilhetes")
    const FluxoCaixa = require("./src/modelos/mysql/FluxoCaixa")
    const Historico = require("./src/modelos/mysql/Historico")
    const Recebimento = require("./src/modelos/mysql/Recebimento")
    const Rifas = require("./src/modelos/mysql/Rifas")
    const Saques = require("./src/modelos/mysql/Saques")
    const Usuarios = require("./src/modelos/mysql/Usuarios")
    await db.sync({ force: true })
    console.log("MySQL configurado!")
    process.exit(1);
})();

(async () => {
    const connection = require("./src/configuracoes/mongo_db")

    try {
        await connection;
        console.log("Conectado ao mongodb")
    } catch (e) {
        console.log(e)
    }
})();