const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'nodejs-api-rest',
    password: 'NodeJS-API-REST',
    database: 'finances-db'
})

module.exports = conexao