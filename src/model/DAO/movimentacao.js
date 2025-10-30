const { PrismaClient } = require('../../../generated/prisma')
const prismaMySQL = new PrismaClient()

async function insertMovimentacao(mov) {
    try {
        let result = await prismaMySQL.tbl_movimentacao.create({
            data: {
                id_livro: mov.id_livro,
                id_usuario: mov.id_usuario,
                id_movimentacao: mov.id_movimentacao,
                quantidade: mov.quantidade
            }
        })
        return await selectByIdMovimentacao(result.id)
    } catch (error) {
        console.error("Erro DAO: Erro ao inserir movimentação.", error)
        return false
    }
}

async function updateMovimentacao(mov) {
    try {
        let result = await prismaMySQL.tbl_movimentacao.update({
            where: { id: mov.id },
            data: {
                id_livro: mov.id_livro,
                id_usuario: mov.id_usuario,
                id_movimentacao: mov.id_movimentacao,
                quantidade: mov.quantidade
            }
        })
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao atualizar movimentação.", error)
        return false
    }
}

async function deleteMovimentacao(id) {
    try {
        let result = await prismaMySQL.tbl_movimentacao.delete({ where: { id } })
        return result ? true : false
    } catch (error) {
        console.error("Erro DAO: Erro ao deletar movimentação.", error)
        return false
    }
}

async function selectAllMovimentacao() {
    try {
        let result = await prismaMySQL.tbl_movimentacao.findMany({
            orderBy: { id: 'desc' },
            include: {
                tbl_livro: true,
                tbl_usuario: true,
                tbl_tipo_movimentacao: true
            }
        })
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar todas as movimentações.", error)
        return false
    }
}

async function selectByIdMovimentacao(id) {
    try {
        let result = await prismaMySQL.tbl_movimentacao.findUnique({
            where: { id },
            include: {
                tbl_livro: true,
                tbl_usuario: true,
                tbl_tipo_movimentacao: true
            }
        })
        return result || null
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar movimentação por ID.", error)
        return false
    }
}

module.exports = {
    insertMovimentacao,
    updateMovimentacao,
    deleteMovimentacao,
    selectAllMovimentacao,
    selectByIdMovimentacao
}