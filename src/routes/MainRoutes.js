const express = require('express')
const router = express.Router()

const routesUsuario = require('./routesUsuario')
const routesMovimentacao = require('./routesMovimentacao')
const routesTipoMovimentacao = require('./routesTipoMovimentacao')
const routesLivro = require('./routesLivro')

router.use('/usuarios', routesUsuario)
router.use('/movimentacao', routesMovimentacao)
router.use('/tipo-movimentacao', routesTipoMovimentacao)
router.use('/livro', routesLivro)

module.exports = router