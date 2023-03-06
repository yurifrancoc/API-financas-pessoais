const { pool } = require('../conexao')

const validarCamposTransacoes = (descricao, valor, data, categoria_id, tipo) => {
    if (!descricao) {
        return 'O campo descricao é obrigatório!';
    }

    if (!valor) {
        return 'O campo valor é obrigatório!';
    }

    if (!data) {
        return 'O campo data é obrigatório!';
    }

    if (!categoria_id) {
        return 'O campo categoria_id é obrigatório!';
    }

    if (!tipo) {
        return 'O campo tipo é obrigatório!';
    }
    if (tipo != "entrada" & tipo != "saida") {
        return 'O tipo deve ser Entrada ou Saida'
    }

    return false
}

module.exports = {
    validarCamposTransacoes
}