const servicesUsuario = require("../services/servicesUsuario")

async function postUsuario (request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let result = await servicesUsuario.inserirUsuario(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
}

async function putUsuario(request, response){
    let id = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let result = await servicesUsuario.atualizarUsuario(dadosBody, id, contentType)
    response.status(result.status_code)
    response.json(result)
}

async function deleteUsuario(request, response){
    let id = request.params.id
    let result = await servicesUsuario.excluirUsuario(id)
    response.status(result.status_code)
    response.json(result)
}

async function getSearchAllUsuario(request, response){
    let result = await servicesUsuario.listarTodosUsuarios()
    response.status(result.status_code)
    response.json(result)
}

async function getSearchUsuario(request, response){
    let id = request.params.id
    let result = await servicesUsuario.buscarUsuario(id)
    response.status(result.status_code)
    response.json(result)
}

async function postLoginUsuario(request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let result = await servicesUsuario.loginUsuario(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
}

module.exports = {
    postUsuario,
    putUsuario,
    deleteUsuario,
    getSearchAllUsuario,
    getSearchUsuario,
    postLoginUsuario
}