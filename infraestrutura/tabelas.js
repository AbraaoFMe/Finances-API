class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarReceitas()
        this.criarDespesas()

        console.log('Tabelas conectadas com sucesso')
    }

    criarReceitas() {
        const sql = 'CREATE TABLE IF NOT EXISTS`receitas` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT,`descricao` varchar(150) NOT NULL,`valor` float NOT NULL,`data` date NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_unique` (`id` ASC) VISIBLE);'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.error(erro)
            } else {
                console.log('Tabela Receitas criada com sucesso')
            }
        })
    }

    criarDespesas() {
        const sql = 'CREATE TABLE IF NOT EXISTS `despesas` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT,`descricao` varchar(150) NOT NULL,`valor` float NOT NULL,`data` date NOT NULL,PRIMARY KEY (`id`),UNIQUE INDEX `id_unique` (`id` ASC) VISIBLE);'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.error(erro)
            } else {
                console.log('Tabela Despesas criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas;