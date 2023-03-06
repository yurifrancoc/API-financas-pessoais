const { pool } = require('../conexao')
const jwt = require('jsonwebtoken')
const senhajwt = require('../senhajwt')
const bcrypt = require('bcrypt')

const loginUsuario = async (req, res) => {

    const { email, senha } = req.body

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório!' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório!' });
    }

    try {
        const usuario = await pool.query('select * from usuarios where email = $1', [email])
        if (usuario.rowCount < 1) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }
        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)
        if (!senhaValida) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

        const token = jwt.sign({ id: usuario.rows[0].id }, senhajwt, { expiresIn: '8h' })

        const { senha: _, ...usuarioLogado } = usuario.rows[0]

        return res.status(200).json({ usuario: usuarioLogado, token })

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = {
    loginUsuario
}