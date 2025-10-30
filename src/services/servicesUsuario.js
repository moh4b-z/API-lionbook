const MENSAGE = require("../modulo/config")
const CORRECTION = require("../utils/inputCheck")
const TableCORRECTION = require("../utils/tablesCheck")
const usuarioDAO = require("../model/DAO/usuario")

async function inserirUsuario(dadosUsuario, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_usuario(dadosUsuario)) {
                let result = await usuarioDAO.insertUsuario(dadosUsuario)
                return result ? { ...MENSAGE.SUCCESS_CEATED_ITEM, usuario: result } : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function atualizarUsuario(dadosUsuario, id, contentType) {
    try {
        if (contentType == "application/json") {
            if (TableCORRECTION.CHECK_tbl_usuario(dadosUsuario) && CORRECTION.CHECK_ID(id)) {
                let resultSearch = await buscarUsuario(parseInt(id))

                if (resultSearch.status_code == MENSAGE.SUCCESS_REQUEST.status_code) {
                    dadosUsuario.id = parseInt(id)
                    let result = await usuarioDAO.updateUsuario(dadosUsuario)
                    return result ? MENSAGE.SUCCESS_UPDATED_ITEM : MENSAGE.ERROR_INTERNAL_SERVER_MODEL
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
        console.error(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function excluirUsuario(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let resultSearch = await buscarUsuario(parseInt(id))

            if (resultSearch.status_code == MENSAGE.SUCCESS_REQUEST.status_code) {
                let result = await usuarioDAO.deleteUsuario(parseInt(id))
                return result ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
            } else if (resultSearch.status_code == MENSAGE.ERROR_NOT_FOUND.status_code) {
                return MENSAGE.ERROR_NOT_FOUND
            } else {
                return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
            }
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function listarTodosUsuarios() {
    try {
        let result = await usuarioDAO.selectAllUsuario()
        if (result) {
            return result.length > 0 ? { ...MENSAGE.SUCCESS_REQUEST, usuarios: result } : MENSAGE.ERROR_NOT_FOUND
        } else {
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.error(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarUsuario(id) {
    try {
        if (CORRECTION.CHECK_ID(id)) {
            let result = await usuarioDAO.selectByIdUsuario(parseInt(id))
            return result ? { 
                ...MENSAGE.SUCCESS_REQUEST, 
                usuario: result 
            } : 
            MENSAGE.ERROR_NOT_FOUND
        } else {
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function loginUsuario(dadosLogin, contentType) {
    try {
        if (contentType == "application/json") {
            const { email, senha } = dadosLogin

            if (!email || !senha) {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }

            let result = await usuarioDAO.loginUsuario(email, senha)

            if (result) {
                return { 
                    ...MENSAGE.SUCCESS_REQUEST, 
                    usuario: result }
            } else {
                return MENSAGE.ERROR_INVALID_CREDENTIALS || { status_code: 401, message: "Credenciais inválidas" }
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarTodosUsuarios,
    buscarUsuario,
    loginUsuario
}