const { pool } = require('../conexao')

const listaCategorias = async (req, res) => {
    try {
        const { rows: categorias } = await pool.query('select * from categorias')

        return res.status(200).json(categorias)
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = {
    listaCategorias
}