const MENSAGE = require("../modulo/config")
const CORRECTION = require("../utils/inputCheck")
const TableCORRECTION = require("../utils/tablesCheck")
const livroDAO = require("../model/DAO/livro")

// Inserir novo livro
async function inserirLivro(dadosLivro, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_livro(dadosLivro)) {
                let result = await livroDAO.insertLivro(dadosLivro)
                return result
                    ? { ...MENSAGE.SUCCESS_CEATED_ITEM, livro: result }
                    : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error("Erro em inserirLivro:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

// Atualizar livro existente
async function atualizarLivro(dadosLivro, id, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_livro(dadosLivro) && CORRECTION.CHECK_ID(id)) {
                let resultSearch = await buscarLivro(parseInt(id))

                if (resultSearch.status_code == MENSAGE.SUCCESS_REQUEST.status_code) {
                    dadosLivro.id = parseInt(id)
                    let result = await livroDAO.updateLivro(dadosLivro)
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
        console.error("Erro em atualizarLivro:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

// Excluir livro
async function excluirLivro(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let resultSearch = await buscarLivro(parseInt(id))

            if (resultSearch.status_code == MENSAGE.SUCCESS_REQUEST.status_code) {
                let result = await livroDAO.deleteLivro(parseInt(id))
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
        console.error("Erro em excluirLivro:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

// Listar todos os livros
async function listarTodosLivros() {
    try {
        let result = await livroDAO.selectAllLivros()
        if (result) {
            return result.length > 0
                ? { ...MENSAGE.SUCCESS_REQUEST, livros: result }
                : MENSAGE.ERROR_NOT_FOUND
        } else {
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.error("Erro em listarTodosLivros:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

// Buscar livro por ID
async function buscarLivro(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let result = await livroDAO.selectByIdLivro(parseInt(id))
            return result
                ? { ...MENSAGE.SUCCESS_REQUEST, livro: result }
                : MENSAGE.ERROR_NOT_FOUND
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error("Erro em buscarLivro:", error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

module.exports = {
    inserirLivro,
    atualizarLivro,
    excluirLivro,
    listarTodosLivros,
    buscarLivro
}