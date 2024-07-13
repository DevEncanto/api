//Importação dos Módulos

const express = require('express')
const router = express.Router();
const { tokenPayload, validarToken } = require("../src/utils/jwt")
const ControllerAutenticacao = require("../src/controlers/ControllerAutenticacao")
//Rotas

router.get('/modo-dashboard', async (req, res) => {
    try {
        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader.split(" ")[1]

        if (await validarToken(token)) {
            const payload = await tokenPayload(token)
            req.app.locals.banlist.forEach((id, index) => {
                if (id == payload.id) {
                    return res.json({
                        status: 601,
                        message: "Usuário Banido!",
                        mode: "USER"
                    })
                }
            })
            if (payload.mode == "USER") {
                if (req.app.locals.manutencao.emManutencao) {
                    return res.json({
                        status: 702,
                        mode: "USER",
                        motivo: req.app.locals.manutencao.motivo,
                        tempo: req.app.locals.manutencao.tempo
                    })
                } else {
                    return res.json({
                        status: 200,
                        mode: "USER"
                    })
                }
            } else {
                return res.json({
                    status: 200,
                    mode: "ADMIN"
                })
            }
        } else {
            return res.json({
                status: 601,
                message: "Token inválido",
                mode: "USER"
            })
        }
    } catch (error) {
        return res.json({
            status: 601,
            message: "Token inválido",
            mode: "USER"
        })
    }
})

//Exportação das Rotas
module.exports = router