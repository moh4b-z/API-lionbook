/***********************************************************************
 * Objetivo: Arquivo responsável por receber as requisições da API e
 * repassar para a camada de serviços (servicesMovimentacao.js)
 * Data: 30/10/2025
 * Autor: Mohammad Salim
 * Versão: 1.0
 ***********************************************************************/

const servicesMovimentacao = require("../services/servicesMovimentacao")

// Inserir uma nova movimentação
async function postMovimentacao(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await servicesMovimentacao.inserirMovimentacao(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
}

// Atualizar uma movimentação existente
async function putMovimentacao(request, response) {
    let id = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await servicesMovimentacao.atualizarMovimentacao(dadosBody, id, contentType)
    response.status(result.status_code)
    response.json(result)
}

// Excluir uma movimentação pelo ID
async function deleteMovimentacao(request, response) {
    let id = request.params.id

    let result = await servicesMovimentacao.excluirMovimentacao(id)
    response.status(result.status_code)
    response.json(result)
}

// Listar todas as movimentações
async function getSearchAllMovimentacao(request, response) {
    let result = await servicesMovimentacao.listarTodasMovimentacoes()
    response.status(result.status_code)
    response.json(result)
}

// Buscar uma movimentação pelo ID
async function getSearchMovimentacao(request, response) {
    let id = request.params.id

    let result = await servicesMovimentacao.buscarMovimentacao(id)
    response.status(result.status_code)
    response.json(result)
}

module.exports = {
    postMovimentacao,
    putMovimentacao,
    deleteMovimentacao,
    getSearchAllMovimentacao,
    getSearchMovimentacao
}