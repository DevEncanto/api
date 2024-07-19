const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("db.json")
const db = low(adapter)

const defaultData = {
    codigosCadastro: [],
    codigosTrocaSenha: [],
    reload: false
}

db.defaults(defaultData).write()

const backupServidor = async (app) => {
    try {
        db.set("codigosCadastro", app.locals.codigosCadastro).value()
        db.set("codigosTrocaSenha", app.locals.codigosTrocaSenha).value()
        db.set("reload", app.locals.reload).value()
        db.write()
    } catch (error) {
    }
}

const loadBackup = async () => {
    try {
        const data = {
            codigosCadastro: db.get("codigosCadastro").value(),
            reload: db.get("reload").value(),
            codigosTrocaSenha: db.get("codigosTrocaSenha").value(),
        }
        return {
            data: data,
            status: 200,
            error: ""
        }
    } catch (error) {
        return {
            data: {},
            status: 400,
            error: error
        }
    }
}

module.exports = { backupServidor, loadBackup }