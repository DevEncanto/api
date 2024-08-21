(async () => {
    const db = require('./src/configuracoes/banco_dados')
    const Usuarios = require("./src/modelos/mysql/Usuarios")
    const Pessoa = require("./src/modelos/mysql/Pessoas")
    const Permissoes = require("./src/modelos/mysql/Permissoes")
    const Permissao_Usuario = require("./src/modelos/mysql/Permissoes_Usuarios")
    await db.sync({ force: true })
})();
