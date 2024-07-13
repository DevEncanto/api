//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Usuarios = require("../models/Usuarios")
const Contas = require("../models/Contas")
const Saques = require("../models/Saques")
const Historico = require("../models/Historico")
const { hash } = require("../utils/criptografia")
const SubUsuario = require("../models/SubUsuario")

const QueryDadosUsuario = {

    //Consulta que busca o usuário enviado para cadastro.
    DadosUsuario: async (id) => {
        try {
            const data = await Usuarios.findOne(
                {
                    where: { idUsuario: id },
                    attributes: {
                        exclude: ['senha', 'createdAt', 'updatedAt']
                    }
                })
            return data
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    DadosContas: async (idConta) => {
        try {
            const data = await Contas.findAll(
                {
                    where: { idConta: idConta },
                    attributes: {
                        exclude: ['idUsuario', 'createdAt', 'updatedAt']
                    }
                })
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    DadosSaques: async (idUsuario) => {
        const QuerySaque = `
            SELECT
	            S.idSaque as idSaque,
                S.data AS data,
                S.status AS status,
                S.valor AS valor,
                S.pix AS pix,
                S.banco as banco,
                S.recebedor as recebedor,
                U.nome as nome,
                U.idUsuario as idUsuario
            FROM saques AS S INNER JOIN usuarios AS U ON U.idUsuario = S.idUsuario
            WHERE U.idUsuario = ${idUsuario}`
        try {
            const [result] = await database.query(QuerySaque)
            return result
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarSaldo: async (idUsuario, valor, operation = "menos", desafio = false) => {
        try {
            const data = await Usuarios.increment({
                saldo: operation == "menos" ? parseFloat(-valor) : parseFloat(valor),
                totalDesafios: desafio ? 1 : 0
            }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados - Atualizar Saldo!"
        }
    },
    AtualizarSaques: async (idUsuario, mode = "mais") => {
        try {
            const data = await Usuarios.increment({
                totalSaques: mode == "mais" ? 1 : -1
            }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados - Atualizar Saldo!"
        }
    },
    AtualizarStatusConta: async (idUsuario) => {
        try {
            const data = await Usuarios.update({ statusConta: "BANIDA" }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarPerfil: async (idUsuario, avatar, nomeCompleto, pix, banco, recebedor) => {
        try {
            const data = await Usuarios.update({
                avatar: avatar,
                nomeCompleto: nomeCompleto,
                pix: pix,
                banco: banco,
                recebedor: recebedor
            }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarDadosBancarios: async (idUsuario, pix, banco, recebedor) => {
        try {
            const data = await Usuarios.update({
                pix: pix,
                banco: banco,
                recebedor: recebedor
            }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    BuscarAvatares: async (idUsuario) => {
        const QueryAvatares = `select avatar from avatares where idUsuario = ${idUsuario}`
        try {
            const [result] = await database.query(QueryAvatares)
            return result
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarSenha: async (idUsuario, senha) => {
        try {
            const data = await Usuarios.update({ senha: await hash(senha) }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarCodigo: async (idUsuario, token) => {
        try {
            const data = await Usuarios.update({ codigoResgatado: token }, {
                where: {
                    idUsuario: idUsuario,
                },
            });
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    buscarHistorico: async (idUsuario) => {
        try {
            const data = Historico.findAll({
                where: {
                    idUsuario: idUsuario
                }
            })
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    buscarEmail: async (idUsuario) => {
        try {
            const data = Usuarios.findOne({
                where: {
                    idUsuario: idUsuario
                }
            })
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    inserirHistorico: async (idUsuario, desafio, valor) => {
        try {
            return await Historico.create({
                idUsuario: idUsuario,
                desafio: desafio,
                valor: valor
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    buscarSubUsuarios: async (idUsuario) => {
        try {
            const data = SubUsuario.findAll({
                where: {
                    idUsuario: idUsuario
                }
            })
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    },
    buscarTokenIndicacao: async (token) => {
        try {
            const data = Usuarios.findOne({
                where: {
                    codigoIndicacao: token
                }
            })
            return data
        } catch (error) {
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QueryDadosUsuario
