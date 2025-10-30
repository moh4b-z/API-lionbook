const express = require('express')
const router = express.Router()
const controllerMovimentacao = require('../controller/controllerMovimentacao')

router.post(
    '',
    controllerMovimentacao.postMovimentacao
)

router.delete(
    '/:id',
    controllerMovimentacao.deleteMovimentacao
)

router.put(
    '/:id',
    controllerMovimentacao.putMovimentacao
)

router.get(
    '',
    controllerMovimentacao.getSearchAllMovimentacao
)

router.get(
    '/:id',
    controllerMovimentacao.getSearchMovimentacao
)

module.exports = router