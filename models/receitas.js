const moment = require('moment')

const conexao = require('../infraestrutura/conexao')

class Receita {
    adiciona(receita, res) {
        const descricao = receita.descricao
        const valor = parseFloat(receita.valor)
        const data = moment(receita.data, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const descricaoValida = descricao.length != 0
        const valorValido = !isNaN(valor)

        const validacoes = [
            {
                nome: 'descricao',
                valido: descricaoValida,
                mensagem: 'Descrição não pode estar vazia.'
            },
            {
                nome: 'valor',
                valido: valorValido,
                mensagem: 'Valor deve ser um número válido.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const novaReceita = { descricao, valor, data }
            const sql = 'INSERT INTO receitas SET ?'

            conexao.query(sql, novaReceita, (erro, resultado) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(novaReceita)
                }
            })
        }

    }

    lista(res) {
        const sql = 'SELECT descricao, valor, data FROM receitas'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT descricao, valor, data FROM receitas WHERE id=${id}`
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                const receita = resultados[0]
                res.status(200).json(receita)
            }
        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        const sql = 'UPDATE receitas SET ? WHERE id = ?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM receitas WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Receita