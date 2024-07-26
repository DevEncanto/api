const Config = require("../modelos/mongo_db/model_config")
const { ObjectId } = require("mongodb")

const backupServidor = async (app) => {
    const id = new ObjectId(app.locals.idDocumentBackup)

    const data = {
        reload: app.locals.reload,
        codigosValidacao: app.locals.codigosValidacao,
        codigosTrocaSenha: app.locals.codigosTrocaSenha
    }

    const response = await Config.updateOne({ _id: id }, { $set: { data } })
}

module.exports = backupServidor
