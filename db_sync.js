(async () => {
    const db = require('./src/configuracoes/banco_dados')
    const Usuarios = require("./src/modelos/mysql/Usuarios")
    const Pessoa = require("./src/modelos/mysql/Pessoas")
    await db.sync({ force: true })
})();
