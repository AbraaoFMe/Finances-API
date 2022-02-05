const Despesa = require('../models/despesas')

module.exports = app => {
    app.get('/despesas', (req, res) => {
        Despesa.lista(res)
    })

    app.post('/despesas', (req, res) => {
        const despesa = req.body

        Despesa.adiciona(despesa, res)
    })

    app.get('/despesas/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Despesa.buscaPorId(id, res)
    })

    app.put('/despesas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Despesa.altera(id, valores, res)
    })

    app.delete('/despesas/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Despesa.deleta(id, res)
    })
}