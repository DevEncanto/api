require('dotenv').config()

const mongoose = require('mongoose');
const dados_bancos = require("./dados_bancos_dados")

const user = process.env[dados_bancos['mongo'].user]
const pass = process.env[dados_bancos['mongo'].pass]
const db = process.env[dados_bancos['mongo'].db]
const url = `mongodb+srv://${user}:${pass}@cherrysocial.nbtjxqy.mongodb.net/?retryWrites=true&w=majority&appName=${db}`

const connection = mongoose.connect(url)

module.exports = connection