//Importação dos Módulos

const express = require('express')
const router = express.Router()

//Rota de Verificação da AWS para saber se aplicação está online.

router.get('/health', (req, res) => {
    res.status(200).json({
        status: "Tudo OK"
    })
})

//Exportação

module.exports = router