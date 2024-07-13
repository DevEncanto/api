const initialize = (req) => {
    return {
        token: req.body.token,
        tracking: req.app.locals.tracking,
        rota: req.headers.referer.split('/confirmacao/')[1]
    }
}




module.exports = { initialize }