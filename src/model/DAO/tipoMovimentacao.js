const { PrismaClient } = require('../../../generated/prisma')
const prismaMySQL = new PrismaClient()

async function insertTipoMovimentacao(tipo) {
    try {
        let result = await prismaMySQL.tbl_tipo_movimentacao.create({
            data: { tipo: tipo.tipo }
        })
        return await selectByIdTipoMovimentacao(result.id)
    } catch (error) {
        console.error("Erro DAO: Erro ao inserir tipo de movimentação.", error)
        return false
    }
}

async function updateTipoMovimentacao(tipo) {
    try {
        let result = await prismaMySQL.tbl_tipo_movimentacao.update({
            where: { id: tipo.id },
            data: { tipo: tipo.tipo }
        })
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao atualizar tipo de movimentação.", error)
        return false
    }
}

async function deleteTipoMovimentacao(id) {
    try {
        let result = await prismaMySQL.tbl_tipo_movimentacao.delete({ where: { id } })
        return result ? true : false
    } catch (error) {
        console.error("Erro DAO: Erro ao deletar tipo de movimentação.", error)
        return false
    }
}

async function selectAllTipoMovimentacao() {
    try {
        let result = await prismaMySQL.tbl_tipo_movimentacao.findMany({ orderBy: { id: 'desc' } })
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar todos os tipos de movimentação.", error)
        return false
    }
}

async function selectByIdTipoMovimentacao(id) {
    try {
        let result = await prismaMySQL.tbl_tipo_movimentacao.findUnique({ where: { id } })
        return result || null
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar tipo de movimentação por ID.", error)
        return false
    }
}

module.exports = {
    insertTipoMovimentacao,
    updateTipoMovimentacao,
    deleteTipoMovimentacao,
    selectAllTipoMovimentacao,
    selectByIdTipoMovimentacao
}