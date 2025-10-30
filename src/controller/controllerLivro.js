const servicesLivro = require("../services/servicesLivro")

async function postLivro(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await servicesLivro.inserirLivro(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
}

async function putLivro(request, response) {
    let id = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await servicesLivro.atualizarLivro(dadosBody, id, contentType)
    response.status(result.status_code)
    response.json(result)
}

async function deleteLivro(request, response) {
    let id = request.params.id

    let result = await servicesLivro.excluirLivro(id)
    response.status(result.status_code)
    response.json(result)
}

async function getSearchAllLivro(request, response) {
    let result = await servicesLivro.listarTodosLivros()
    response.status(result.status_code)
    response.json(result)
}

async function getSearchLivro(request, response) {
    let id = request.params.id

    let result = await servicesLivro.buscarLivro(id)
    response.status(result.status_code)
    response.json(result)
}

module.exports = {
    postLivro,
    putLivro,
    deleteLivro,
    getSearchAllLivro,
    getSearchLivro
}