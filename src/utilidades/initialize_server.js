const connection = require("../configuracoes/mongo_db");
const Config = require("../modelos/mongo_db/model_config");

const initializeServer = async (app) => {

    try {
        await connection;
        console.log("Conectado com sucesso ao mongodb")
    } catch (e) {
        console.log("Falha ao se conectar com o mongo db.")
    }



    initializeApp(app)

    const ambiente = process.env.NODE_DB_MODE
    const response = await Config.find().lean()

    if (response) {
        const indexAmbiente = response.findIndex(item => item.ambiente === ambiente)

        if (indexAmbiente !== -1) {
            const { data, _id } = response[indexAmbiente]
            app.locals.codigosValidacao = data.codigosValidacao || []
            app.locals.codigosTrocaSenha = data.codigosTrocaSenha || []
            app.locals.reload = true
            app.locals.idDocumentBackup = _id.toString()
            console.log("Variáveis carregadas.")
        } else {
            await Config.create([
                {
                    ambiente: "producao",
                    data: []
                },
                {
                    ambiente: "desenvolvimento",
                    data: []
                }
            ])

            console.log("Novos valores inicializados.")
        }
    }
};

const initializeApp = (app) => {
    app.locals.codigosValidacao = [];
    app.locals.codigosTrocaSenha = [];
    app.locals.reload = false;
    app.locals.idDocumentBackup = "";

    console.log("Variáveis inicializadas.");
};

module.exports = initializeServer;
