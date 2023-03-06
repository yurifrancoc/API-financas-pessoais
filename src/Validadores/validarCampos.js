const validarCamposObrigatorios = (nome, email, senha) => {

    if (!nome) {
        return 'O campo nome é obrigatório!';
    }

    if (!email) {
        return 'O campo email é obrigatório!';
    }

    if (!senha) {
        return 'O campo senha é obrigatório!';
    }

    return false
}

module.exports = {
    validarCamposObrigatorios
}