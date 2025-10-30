const MENSAGE = require("../modulo/config")
const CORRECTION = require("../utils/inputCheck")
const TableCORRECTION = require("../utils/tablesCheck")
const tipoMovimentacaoDAO = require("../model/DAO/tipoMovimentacao")

async function inserirTipoMovimentacao(dadosTipoMovimentacao, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_tipo_movimentacao(dadosTipoMovimentacao)) {
                let result = await tipoMovimentacaoDAO.insertTipoMovimentacao(dadosTipoMovimentacao)
                return result
                    ? { ...MENSAGE.SUCCESS_CEATED_ITEM, tipo_movimentacao: result }
                    : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error("Erro em inserirTipoMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function atualizarTipoMovimentacao(dadosTipoMovimentacao, id, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_tipo_movimentacao(dadosTipoMovimentacao) && CORRECTION.CHECK_ID(id)) {
                let resultSearch = await buscarTipoMovimentacao(parseInt(id))

                if (resultSearch.status_code == MENSAGE.SUCCESS_REQUEST.status_code) {
                    dadosTipoMovimentacao.id = parseInt(id)
                    let result = await tipoMovimentacaoDAO.updateTipoMovimentacao(dadosTipoMovimentacao)
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
        console.error("Erro em atualizarTipoMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function excluirTipoMovimentacao(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let resultSearch = await buscarTipoMovimentacao(parseInt(id))

            if (resultSearch.status_code == MENSAGE.SUCCESS_REQUEST.status_code) {
                let result = await tipoMovimentacaoDAO.deleteTipoMovimentacao(parseInt(id))
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
        console.error("Erro em excluirTipoMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function listarTodosTiposMovimentacao() {
    try {
        let result = await tipoMovimentacaoDAO.selectAllTipoMovimentacao()
        if (result) {
            return result.length > 0
                ? { ...MENSAGE.SUCCESS_REQUEST, tipos_movimentacao: result }
                : MENSAGE.ERROR_NOT_FOUND
        } else {
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.error("Erro em listarTodosTiposMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarTipoMovimentacao(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let result = await tipoMovimentacaoDAO.selectByIdTipoMovimentacao(parseInt(id))
            return result
                ? { ...MENSAGE.SUCCESS_REQUEST, tipo_movimentacao: result }
                : MENSAGE.ERROR_NOT_FOUND
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error("Erro em buscarTipoMovimentacao:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

module.exports = {
    inserirTipoMovimentacao,
    atualizarTipoMovimentacao,
    excluirTipoMovimentacao,
    listarTodosTiposMovimentacao,
    buscarTipoMovimentacao
}