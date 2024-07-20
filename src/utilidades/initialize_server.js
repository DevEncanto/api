const Config = require("../modelos/mongo_db/model_config");

const initializeServer = async (app) => {

    initializeApp(app)

    const ambiente = process.env.NODE_DB_MODE
    const response = await Config.find().lean()

    if (response) {
        const indexAmbiente = response.findIndex(item => item.ambiente === ambiente)

        if (indexAmbiente !== -1) {
            const { data, _id } = response[indexAmbiente]
            app.locals.codigosValidacao = data.codigosValidacao
            app.locals.codigosTrocaSenha = data.codigosTrocaSenha
            app.locals.reload = true
            app.locals.idDocumentBackup = _id.toString()
        }
    }
};

const initializeApp = (app) => {
    app.locals.codigosValidacao = [];
    app.locals.codigosTrocaSenha = [];
    app.locals.reload = false;
    app.locals.idDocumentBackup = "";
};

module.exports = initializeServer;
