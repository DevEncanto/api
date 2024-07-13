//Carregando Módulos

const express = require("express");
const app = express();

const cors = require('cors');
const rotas = require("./src/configuracoes/rotas")

//Configuração das politícas de acesso (todos os IP's)

app.options('*', cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors)
    next();
})

//Configurações

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT || 4000;


//Carregamento e Configuração das Rotas

rotas.forEach((route) => {
    app.use('/api', route)
})

//Iniciando os servidores


app.listen(PORT, () => {
    console.log("Rodando o API na porta " + PORT);
})



