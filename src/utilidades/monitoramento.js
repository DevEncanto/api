const { backupServidor } = require("./backup")

const monitoramento = async (app) => {
  await backupServidor(app)
}

module.exports = monitoramento