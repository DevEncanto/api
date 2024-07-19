const initializeApp = async (app) => {
  app.locals.codigosCadastro = []
  app.locals.codigosTrocaSenha = []
  app.locals.reload = false
}

module.exports = initializeApp