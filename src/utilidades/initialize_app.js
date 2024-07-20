const initializeApp = async (app) => {
  app.locals.codigosCadastro = []
  app.locals.codigosTrocaSenha = []
  app.locals.reload = false
  app.locals.idDocumentBackup = ""
}

module.exports = initializeApp