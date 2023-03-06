const { pool } = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhajwt = require('../senhajwt')
const { validarCamposObrigatorios } = require('../Validadores/validarCampos')

const cadastraUsuario = async (req, res) => {

    const { nome, email, senha } = req.body

    const validador = validarCamposObrigatorios(nome, email, senha)

    if (validador) {
        return res.status(400).json({ mensagem: validador });
    }

    try {
        const usuario = await pool.query('select * from usuarios where email = $1', [email])

        if (usuario.rowCount > 0) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
    try {
        const senhaCripto = await bcrypt.hash(senha, 10) //excluir a senha do corpo de resposta?

        const { rows } = await pool.query(`insert into usuarios (nome, email, senha) values
        ($1, $2, $3) returning *`,
            [nome, email, senhaCripto])

        const novoUsuario = rows.map((usuario) => {
            return {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email
            }
        })

        return res.status(201).json(novoUsuario[0])

    } catch (error) {
        return res.status(403).json({ mensagem: error.message }) //posso retornar a propriedade mensagem mesmo? //esse status esta ok?
    }
}

const detalhaUsuario = async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const { id } = jwt.verify(token, senhajwt)

    try {

        const buscaUsuario = await pool.query('select * from usuarios where id = $1', [id])

        if (buscaUsuario.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        const { senha: _, ...usuario } = buscaUsuario.rows[0];

        return res.status(200).json(usuario);

    } catch (error) {
        return res.status(404).json({ mensagem: error.message })
    }

}

const atualizaUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const { id } = jwt.verify(token, senhajwt);

    try {
        const perfil = await pool.query('select * from usuarios where id = $1', [id])

        if (perfil.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Usuário não encontrado' })
        }

        const validador = validarCamposObrigatorios(nome, email, senha)

        if (validador) {
            return res.status(400).json({ mensagem: validador });
        }

        const usuario = await pool.query('select * from usuarios where email = $1', [email])

        if (usuario.rowCount > 0 && usuario.rows[0].id !== id) { //deve permitir alterar dados passando o token do usuario mas mantendo o email
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }

        const senhaCripto = await bcrypt.hash(senha, 10)

        const { rows } = await pool.query(`update usuarios set nome = $1, email = $2, senha = $3 where id = $4`,
            [nome, email, senhaCripto, id])

        if (rows.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Não foi possível editar perfil.' })
        }

        return res.status(200).json()

    } catch (error) {
        return res.status(404).json({ mensagem: error.message })
    }
}


module.exports = {
    cadastraUsuario,
    detalhaUsuario,
    atualizaUsuario
}