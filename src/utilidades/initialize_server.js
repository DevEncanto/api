const { loadBackup } = require("./backup")

const initializeServer = async (app) => {

    const { data = {}, status, error } = await loadBackup()

    switch (status) {
        case 200:
            app.locals.codigosCadastro = data.codigosCadastro
            app.locals.codigosTrocaSenha = data.codigosTrocaSenha
            app.locals.reload = true
            break;
        case 400:

            break;
    }
    console.log("Variáveis de Ambiente carregadas!")
}

module.exports = initializeServer