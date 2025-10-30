const express = require('express')
const router = express.Router()
const controllerLivro = require('../controller/controllerLivro')

router.post(
    '',
    controllerLivro.postLivro
)

router.delete(
    '/:id',
    controllerLivro.deleteLivro
)

router.put(
    '/:id',
    controllerLivro.putLivro
)

router.get(
    '',
    controllerLivro.getSearchAllLivro
)

router.get(
    '/:id',
    controllerLivro.getSearchLivro
)

module.exports = router