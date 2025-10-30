/***********************************************************************
 * Objetivo: Arquivo responsável por receber as requisições da API e
 * repassar para a camada de serviços (servicesTipoMovimentacao.js)
 * Data: 30/10/2025
 * Autor: Mohammad Salim
 * Versão: 1.0
 ***********************************************************************/

const servicesTipoMovimentacao = require("../services/servicesTipoMovimentacao")

// Inserir um novo tipo de movimentação
async function postTipoMovimentacao(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await servicesTipoMovimentacao.inserirTipoMovimentacao(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
}

// Atualizar um tipo de movimentação existente
async function putTipoMovimentacao(request, response) {
    let id = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await servicesTipoMovimentacao.atualizarTipoMovimentacao(dadosBody, id, contentType)
    response.status(result.status_code)
    response.json(result)
}

// Excluir um tipo de movimentação pelo ID
async function deleteTipoMovimentacao(request, response) {
    let id = request.params.id

    let result = await servicesTipoMovimentacao.excluirTipoMovimentacao(id)
    response.status(result.status_code)
    response.json(result)
}

// Listar todos os tipos de movimentação
async function getSearchAllTipoMovimentacao(request, response) {
    let result = await servicesTipoMovimentacao.listarTodosTiposMovimentacao()
    response.status(result.status_code)
    response.json(result)
}

// Buscar um tipo de movimentação pelo ID
async function getSearchTipoMovimentacao(request, response) {
    let id = request.params.id

    let result = await servicesTipoMovimentacao.buscarTipoMovimentacao(id)
    response.status(result.status_code)
    response.json(result)
}

module.exports = {
    postTipoMovimentacao,
    putTipoMovimentacao,
    deleteTipoMovimentacao,
    getSearchAllTipoMovimentacao,
    getSearchTipoMovimentacao
}