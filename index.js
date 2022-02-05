const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.error(erro)
    } else {
        console.log('Servidor mySQL conectado com sucesso')

        Tabelas.init(conexao)
        const app = customExpress()

        app.listen(3000, () => console.log('Finances API Running on port 3000.'))
    }
})


