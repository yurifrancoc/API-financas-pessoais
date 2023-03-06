const { pool } = require('../conexao')
const jwt = require('jsonwebtoken')
const senhajwt = require('../senhajwt')

const verificaToken = async (req, res, next) => {
    const { authorization } = req.headers

    try {
        const token = authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
        }

        const { id } = jwt.verify(token, senhajwt)

        const buscaUsuario = await pool.query('select * from usuarios where id = $1', [id])

        if (buscaUsuario.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        const { senha: _, ...usuario } = buscaUsuario.rows[0];

        req.usuario = usuario

        next()


    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    verificaToken
}