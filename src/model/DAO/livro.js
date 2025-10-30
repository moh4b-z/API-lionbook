const { PrismaClient } = require("../../../generated/prisma")
const prismaMySQL = new PrismaClient()

async function insertLivro(livro) {
    try {
        let result = await prismaMySQL.tbl_livro.create({
            data: {
                titulo: livro.titulo,
                data_publicacao: new Date(livro.data_publicacao),
                quantidade: livro.quantidade,
                isbn: livro.isbn
            }
        })
        result = await selectByIdLivro(result.id)
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao inserir livro.", error)
        return false
    }
}

async function updateLivro(livro) {
    try {
        let result = await prismaMySQL.tbl_livro.update({
            where: { id: livro.id },
            data: {
                titulo: livro.titulo,
                data_publicacao: new Date(livro.data_publicacao),
                quantidade: livro.quantidade,
                isbn: livro.isbn
            }
        })
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao atualizar livro.", error)
        return false
    }
}

async function deleteLivro(id) {
    try {
        let result = await prismaMySQL.tbl_livro.delete({ where: { id } })
        return result ? true : false
    } catch (error) {
        console.error("Erro DAO: Erro ao deletar livro.", error)
        return false
    }
}

async function selectAllLivro() {
    try {
        let result = await prismaMySQL.tbl_livro.findMany({ orderBy: { id: 'desc' } })
        return result
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar todos os livros.", error)
        return false
    }
}

async function selectByIdLivro(id) {
    try {
        let result = await prismaMySQL.tbl_livro.findUnique({ where: { id } })
        return result || null
    } catch (error) {
        console.error("Erro DAO: Erro ao buscar livro por ID.", error)
        return false
    }
}

module.exports = {
    insertLivro,
    updateLivro,
    deleteLivro,
    selectAllLivro,
    selectByIdLivro
}