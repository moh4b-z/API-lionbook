const express = require('express')
const router = express.Router()
const controllerTipoMovimentacao = require('../controller/controllerTipoMovimentacao')

router.post(
    '',
    controllerTipoMovimentacao.postTipoMovimentacao
)

router.delete(
    '/:id',
    controllerTipoMovimentacao.deleteTipoMovimentacao
)

router.put(
    '/:id',
    controllerTipoMovimentacao.putTipoMovimentacao
)

router.get(
    '',
    controllerTipoMovimentacao.getSearchAllTipoMovimentacao
)

router.get(
    '/:id',
    controllerTipoMovimentacao.getSearchTipoMovimentacao
)

module.exports = router