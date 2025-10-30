const CORRECTION = require("./inputCheck");

function CHECK_tbl_usuario(usuario) {
    return (
        CORRECTION.CHECK_EMAIL(usuario.email) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha, 45)
    );
}

function CHECK_tbl_livro(livro) {
    return (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(livro.titulo, 150) &&
        CORRECTION.CHECK_DATE(livro.data_publicacao) &&
        CORRECTION.verificarNumero(livro.quantidade) &&
        livro.quantidade >= 0 &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(livro.isbn, 150)
    );
}

function CHECK_tbl_tipo_movimentacao(tipo) {
    return (
        CORRECTION.CHECK_VARCHAR_NOT_NULL(tipo.tipo, 100)
    );
}

function CHECK_tbl_movimentacao(movimentacao) {
    return (
        CORRECTION.CHECK_ID(movimentacao.id_livro) &&
        CORRECTION.CHECK_ID(movimentacao.id_usuario) &&
        CORRECTION.CHECK_ID(movimentacao.id_movimentacao) &&
        CORRECTION.verificarNumero(movimentacao.quantidade) &&
        movimentacao.quantidade > 0
    );
}

module.exports = {
    CHECK_tbl_usuario,
    CHECK_tbl_livro,
    CHECK_tbl_tipo_movimentacao,
    CHECK_tbl_movimentacao
};