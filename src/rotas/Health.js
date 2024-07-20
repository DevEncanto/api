//Importação dos Módulos

const express = require('express')
const Config = require('../modelos/mongo_db/model_config')
const router = express.Router()



router.get('/health', async (req, res) => {
   
    try {
        Config.create([
            {
                ambiente: "desenvolvimento",
                data: {
                    codigosTrocaSenha: [],
                    codigosValidacao: [],
                    reload: false
                }
            },
            {
                ambiente: "producao",
                data: {
                    codigosTrocaSenha: [],
                    codigosValidacao: [],
                    reload: false
                }
            }
        ]
        )

    } catch (e) {
        console.log(e)
    }

    res.status(200).json({
        status: "Tudo OK"
    })
})

//Exportação

module.exports = router