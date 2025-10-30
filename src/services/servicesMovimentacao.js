const MENSAGE = require("../modulo/config")
const CORRECTION = require("../utils/inputCheck")
const TableCORRECTION = require("../utils/tablesCheck")
const movimentacaoDAO = require("../model/DAO/movimentacao")

async function inserirMovimentacao(dadosMovimentacao, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_movimentacao(dadosMovimentacao)) {
                let result = await movimentacaoDAO.insertMovimentacao(dadosMovimentacao)
                return result
                    ? { ...MENSAGE.SUCCESS_CEATED_ITEM, movimentacao: result }
                    : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error("Erro em inserirMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function atualizarMovimentacao(dadosMovimentacao, id, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_movimentacao(dadosMovimentacao) && CORRECTION.CHECK_ID(id)) {
                let resultSearch = await buscarMovimentacao(parseInt(id))

                if (resultSearch.status_code == MENSAGE.SUCCESS_REQUEST.status_code) {
                    dadosMovimentacao.id = parseInt(id)
                    let result = await movimentacaoDAO.updateMovimentacao(dadosMovimentacao)
                    return result
                        ? MENSAGE.SUCCESS_UPDATED_ITEM
                        : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else if (resultSearch.status_code == MENSAGE.ERROR_NOT_FOUND.status_code) {
                    return MENSAGE.ERROR_NOT_FOUND
                } else {
                    return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
                }
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error("Erro em atualizarMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function excluirMovimentacao(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let resultSearch = await buscarMovimentacao(parseInt(id))

            if (resultSearch.status_code == MENSAGE.SUCCESS_REQUEST.status_code) {
                let result = await movimentacaoDAO.deleteMovimentacao(parseInt(id))
                return result
                    ? MENSAGE.SUCCESS_DELETE_ITEM
                    : MENSAGE.ERROR_NOT_DELETE
            } else if (resultSearch.status_code == MENSAGE.ERROR_NOT_FOUND.status_code) {
                return MENSAGE.ERROR_NOT_FOUND
            } else {
                return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error("Erro em excluirMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function listarTodasMovimentacoes() {
    try {
        let result = await movimentacaoDAO.selectAllMovimentacoes()
        if (result) {
            return result.length > 0
                ? { ...MENSAGE.SUCCESS_REQUEST, movimentacoes: result }
                : MENSAGE.ERROR_NOT_FOUND
        } else {
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.error("Erro em listarTodasMovimentacoes:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarMovimentacao(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let result = await movimentacaoDAO.selectByIdMovimentacao(parseInt(id))
            return result
                ? { ...MENSAGE.SUCCESS_REQUEST, movimentacao: result }
                : MENSAGE.ERROR_NOT_FOUND
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error("Erro em buscarMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

module.exports = {
    inserirMovimentacao,
    atualizarMovimentacao,
    excluirMovimentacao,
    listarTodasMovimentacoes,
    buscarMovimentacao
}