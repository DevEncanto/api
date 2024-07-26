const connection = require("../configuracoes/mongo_db");
const Config = require("../modelos/mongo_db/model_config");

const initializeApp = (app) => {
    app.locals.codigosValidacao = [];
    app.locals.codigosTrocaSenha = [];
    app.locals.reload = false;
    app.locals.idDocumentBackup = "";

    console.log("Variáveis inicializadas.");
};

const carregarVariaveis = (app, response, ambiente) => {
    const indexAmbiente = response.findIndex(item => item.ambiente === ambiente);

    if (indexAmbiente !== -1) {
        const { data, _id } = response[indexAmbiente];
        app.locals.codigosValidacao = data.codigosValidacao ? data.codigosValidacao : [];
        app.locals.codigosTrocaSenha = data.codigosTrocaSenha || [];
        app.locals.reload = true;
        app.locals.idDocumentBackup = _id.toString();
        console.log("Variáveis carregadas.");
    } else {
        console.log("Ambiente não encontrado nos dados.");
    }
};

const initializeServer = async (app) => {
    try {
        await connection;
        console.log("Conectado com sucesso ao MongoDB");
    } catch (e) {
        console.log("Falha ao se conectar com o MongoDB.");
        return;
    }

    initializeApp(app);

    const ambiente = process.env.NODE_DB_MODE;
    let response = await Config.find().lean();

    if (!response.length) {
        await Config.create([
            {
                ambiente: "producao", data: {
                    reload: true,
                    codigosTrocaSenha: [],
                    codigosValidacao: []
                }
            },
            {
                ambiente: "desenvolvimento", data: {
                    reload: true,
                    codigosTrocaSenha: [],
                    codigosValidacao: []
                }
            }
        ]);

        console.log("Novos valores inicializados.");

        response = await Config.find().lean();
    }

    carregarVariaveis(app, response, ambiente);
};

module.exports = initializeServer;
