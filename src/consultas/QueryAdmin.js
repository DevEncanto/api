//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Usuarios = require("../models/Usuarios")
const Saques = require("../models/Saques")
const Rota = require("../models/Rotas")
const Avatar = require("../models/Avatares")
const Chamado = require("../models/Chamados")
const ContasLinks = require("../models/ContasSuaURL")
const Recebimento = require("../models/Recebimento")
const { QueryMediaBaixa, QuerySaldoUsuarios } = require("./QuerySQL")
const { Op } = require("sequelize")

//Objeto de consultas

const Query = `SELECT
S.idSaque as idSaque,
S.idUsuario AS idUsuario,
S.data AS data,
S.status AS status,
S.valor AS valor,
S.pix AS pix,
S.banco as banco,
S.recebedor as recebedor,
U.nome as nome
FROM saques AS S INNER JOIN usuarios AS U ON U.idUsuario = S.idUsuario
`
const sqlChamados = `SELECT 
c.idChamado as idChamado,
c.motivo as motivo,
c.status as status,
c.idUsuario as idUsuario,
c.createdAt as createdAt,
u.avatar as avatar,
u.nome as nome
FROM chamados as c INNER JOIN usuarios as u ON c.idUsuario = u.idUsuario`
const QueryAdmin = {

    //Consulta que busca o usuário enviado para login.
    ListarUsuarios: async (limit) => {
        try {
            if (limit) {
                return await Usuarios.findAll({
                    limit: 100,
                    attributes: {
                        exclude: [
                            'senha',
                        ]
                    }
                })
            } else {
                return await Usuarios.findAll({
                    attributes: {
                        exclude: [
                            'senha',
                        ]
                    }
                })
            }
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    atualizarStatusChamado: async (idChamado, status) => {
        try {
            return await Chamado.update({
                status: status
            }, {
                where: {
                    idChamado: idChamado
                }
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AlterarStatusConta: async (idUsuario, status) => {
        try {
            return await Usuarios.update({
                statusConta: status
            }, {
                where: {
                    idUsuario: idUsuario
                }
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    ListaSaques: async () => {
        try {
            return await database.query(Query)
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AlterarStatusSaque: async (idSaque, status) => {
        try {
            return await Saques.update({
                status: status
            }, {
                where: {
                    idSaque: idSaque
                }
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AlterarStatusRecebimento: async (idRecebimento, status) => {
        try {
            return await Recebimento.update({
                status: status
            }, {
                where: {
                    idRecebimento: idRecebimento
                }
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    BuscarRotas: async (nRota) => {
        try {
            return await Rota.findOne({
                where: { nRota: nRota }
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    CadastrarRota: async (data) => {
        const { nRota, facil1, medio1, dificil1, facil2, medio2, dificil2, facil3, medio3, dificil3 } = data
        try {
            return await Rota.create({
                nRota: nRota,
                facil1: facil1,
                medio1: medio1,
                dificil1: dificil1,
                facil2: facil2,
                medio2: medio2,
                dificil2: dificil2,
                facil3: facil3,
                medio3: medio3,
                dificil3: dificil3
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    BuscarTodasRotas: async (type = "admin", sync = false) => {
        try {
            if (type == "admin") {
                if (sync) {
                    return await Rota.findAll({
                        where: {
                            nRota: { [Op.gte]: 1 },
                            nRota: { [Op.lte]: 40 }
                        }
                    })
                } else {
                    return await Rota.findAll()
                }
            } else {
                if(sync){
                    return await Rota.findAll({
                        attributes: {
                            exclude: [
                                'idRota',
                                'createdAt',
                                'updatedAt'
                            ]
                        }
                    })
                }else{
                    return await Rota.findAll({
                        attributes: {
                            exclude: [
                                'idRota',
                                'createdAt',
                                'updatedAt'
                            ]
                        },
                        where: {
                            nRota: { [Op.gte]: 1 },
                            nRota: { [Op.lte]: 40 }
                        }
                    })
                }
            }
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    InserirAvatar: async (idUsuario, avatar) => {
        try {
            return await Avatar.create({
                avatar: avatar,
                idUsuario: idUsuario
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    inserirContaSuaURL: async (email, senha) => {
        try {
            return await ContasLinks.create({
                email: email,
                senha: senha
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    inserirRecebimento: async (tipo, origem, valor) => {
        try {
            return await Recebimento.create({
                tipo: tipo,
                valor: valor,
                origem: origem,
                status: "À RECEBER"
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    buscarContasSuaURL: async () => {
        try {
            return await ContasLinks.findAll({
                attributes: {
                    exclude: [
                        'senha'
                    ]
                }
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    buscarChamados: async () => {
        try {
            return await database.query(sqlChamados)
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    somarSaldoUsuarios: async () => {
        try {
            return await database.query(QuerySaldoUsuarios)
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    buscarContasMediaDesafiosBaixa: async () => {
        try {
            return [await database.query(QueryMediaBaixa)]
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    buscarRecebimentos: async (filter = false) => {
        try {
            if (filter) {
                return await Recebimento.findAll({
                    where: {
                        status: "À RECEBER"
                    }
                })
            } else {
                return await Recebimento.findAll()
            }
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },

}



module.exports = QueryAdmin


