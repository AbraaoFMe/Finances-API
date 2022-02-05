const moment = require('moment')

const conexao = require('../infraestrutura/conexao')

class Despesa {
    adiciona(despesa, res) {
        const descricao = despesa.descricao
        const valor = parseFloat(despesa.valor)
        const data = moment(despesa.data, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const descricaoValida = descricao.length != 0
        const valorValido = !isNaN(valor)

        const validacoes = [
            {
                nome: 'descricao',
                valido: descricaoValida,
                mensagem: 'Descrição não pode estar vazia'
            },
            {
                nome: 'valor',
                valido: valorValido,
                mensagem: 'Valor deve ser um valor válido'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const novaDespesa = { descricao, valor, data }
            const sql = 'INSERT INTO despesas SET ?'

            conexao.query(sql, novaDespesa, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(novaDespesa)
                }
            })
        }

    }

    lista(res) {
        const sql = 'SELECT descricao, valor, data FROM despesas'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erros)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT descricao, valor, data FROM despesas WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(404).json(erro)
            } else {
                const despesa = resultados[0]

                res.status(200).json(despesa)
            }
        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        const sql = 'UPDATE despesas SET ? WHERE id = ?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM despesas WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Despesa