const { PrismaClient } = require('../../../generated/prisma')
const prismaMySQL = new PrismaClient()

async function insertUsuario(usuario) {
    try {
        let result = await prismaMySQL.tbl_usuario.create({
            data: {
                email: usuario.email,
                senha: usuario.senha
            }
        })
        result = await selectByIdUsuario(result.id)
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao inserir usuário.", error)
        return false
    }
}

async function updateUsuario(usuario) {
    try {
        let result = await prismaMySQL.tbl_usuario.update({
            where: { id: usuario.id },
            data: {
                email: usuario.email,
                senha: usuario.senha
            }
        })
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao atualizar usuário.", error)
        return false
    }
}

async function deleteUsuario(id) {
    try {
        let result = await prismaMySQL.tbl_usuario.delete({ where: { id } })
        return result ? true : false
    } catch (error) {
        console.error("Erro DAO: Erro ao deletar usuário.", error)
        return false
    }
}

async function selectAllUsuario() {
    try {
        let result = await prismaMySQL.tbl_usuario.findMany({ orderBy: { id: 'desc' } })
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar todos os usuários.", error)
        return false
    }
}

async function selectByIdUsuario(id) {
    try {
        let result = await prismaMySQL.tbl_usuario.findUnique({ where: { id } })
        return result || null
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar usuário por ID.", error)
        return false
    }
}

async function loginUsuario(email, senha) {
    try {
        let result = await prismaMySQL.tbl_usuario.findUnique({ where: { email } },{ where: { senha } })
        return result || null
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar usuário por e-mail.", error)
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario,
    loginUsuario
}