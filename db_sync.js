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

})();

(async () => {
    const connection = require("./src/configuracoes/mongo_db");
    const Config = require("./src/modelos/mongo_db/model_config");
    try {
        await connection;
        console.log("Conectado ao mongodb")
        let response = await Config.deleteOne({ ambiente: "producao" })
        console.log(response)
        response = await Config.deleteOne({ ambiente: "desenvolvimento" })
        console.log(response)
    } catch (e) {
        console.log(e)
    }
})();