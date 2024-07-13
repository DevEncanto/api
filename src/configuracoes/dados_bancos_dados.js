const banco_de_dados = {
    desenvolvimento: {
        db: "NODE_DB_LOCAL",
        host: "NODE_HOST_LOCAL",
        dialect: "mysql",
        pass: "NODE_PASS_LOCAL",
        user: "NODE_USER_LOCAL",
        logging: false
    },
    producao:  {
        db: "NODE_DB_HOSTINGER",
        host: "NODE_HOST_HOSTINGER",
        dialect: "mysql",
        pass: "NODE_PASS_HOSTINGER",
        user: "NODE_USER_HOSTINGER",
        logging: false
    }
}

module.exports = banco_de_dados