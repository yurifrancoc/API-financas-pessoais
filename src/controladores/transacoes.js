const { pool } = require('../conexao')
const { validarCamposTransacoes } = require('../Validadores/verificadoresTransacoes')

const listarTransacoes = async (req, res) => {
    try {
        const id = req.usuario.id;
        const { rows } = await pool.query('select t.id, t.descricao, valor, "data", categoria_id, usuario_id, tipo, categorias.descricao as categoria_nome from transacoes t join categorias on t.categoria_id = categorias.id where usuario_id = $1', [id]);
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(400).json({ Mensagem: error.message })
    }
}

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    const validacao = validarCamposTransacoes(descricao, valor, data, categoria_id, tipo)
    if (validacao) {
        return res.status(400).json({ mensagem: validacao });
    }
    const { rowCount } = await pool.query(`select * from categorias`);
    if (categoria_id > rowCount) {
        return res.status(400).json({ Mensagem: "A categoria nao existe!" })
    }
    try {
        const { rows } = await pool.query(`insert into transacoes (descricao, valor, data, categoria_id, tipo, usuario_id)
        values ($1, $2, $3, $4, $5, $6) returning * `, [descricao, valor, data, categoria_id, tipo, req.usuario.id])
        return res.status(201).json(rows);
    } catch (error) {
        return res.status(400).json({ Mensagem: `Erro: ${error.message}` })
    }
}

const detalharTransacao = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ Mensagem: "Informe o id" })
    }
    try {
        const { rows, rowCount } = await pool.query(`select * from transacoes where usuario_id = $1 and id = $2`, [req.usuario.id, id])
        if (rowCount < 1) {
            return res.status(404).json({ Mensagem: "Transação não encontrada." })
        }
        return res.status(200).json(rows[0])
    } catch (error) {
        return res.status(400).json({ Mensagem: `Erro:  ${error.message}` })
    }
}

const atualizarTransacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const validacao = validarCamposTransacoes(descricao, valor, data, categoria_id, tipo)
    if (validacao) {
        return res.status(400).json({ mensagem: validacao });
    }
    const { rowCount } = await pool.query(`select * from categorias`);
    if (categoria_id > rowCount) {
        return res.status(400).json({ Mensagem: "A categoria nao existe!" })
    }
    try {
        const { rows, rowCount } = await pool.query(`select * from transacoes where id = $1`, [id])
        const idUsuario = req.usuario.id;
        if (rowCount < 1) {
            return res.status(400).json({ Mensagem: "Não há transações com esse id." })
        }
        if (rows[0].usuario_id != idUsuario) {
            return res.status(403).json({ Mensagem: "O usuario não tem acesso a essa transacao." })
        }
        rows[0] = await pool.query(`update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5`, [descricao, valor, data, categoria_id, tipo]);
        return res.status(204).json();
    } catch (error) {
        return res.status(400).json({ Mensagem: `Erro: ${error.message}` })
    }
}

const excluirTransacao = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows, rowCount } = await pool.query(`select * from transacoes where id = $1`, [id])
        if (rowCount < 1) {
            return res.status(400).json({ Mensagem: "Não há transacao com esse id." })
        }
        if (rows[0].usuario_id != req.usuario.id) {
            return res.status(400).json({ Mensagem: "O usuario nao tem acesso a essa transacao." })
        }

        const campoDeletado = await pool.query(`delete from transacoes where id = $1`, [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(400).json({ Mensagem: error.message })
    }
}

const obterExtratoTransacoes = async (req, res) => {
    const id = req.usuario.id
    try {
        const { rows, rowCount } = pool.query('select * from transacoes where usuario_id = $1', [id])
        if (rowCount > 1) {
            return res.status(400).json({ Mensagem: "Não existem transacoes para esse usuario" })
        }
        let somaEntrada = await pool.query(`select sum(valor) from transacoes where tipo = 'entrada' and usuario_id = $1;`, [id])
        let somaSaida = await pool.query(`select sum(valor) from transacoes where tipo = 'saida' and usuario_id = $1;`, [id])
        somaEntrada = somaEntrada.rows[0].sum
        somaSaida = somaSaida.rows[0].sum
        if (!somaEntrada) {
            somaEntrada = 0
        }
        if (!somaSaida) {
            somaSaida = 0
        }
        return res.status(200).json({
            "entrada": somaEntrada,
            "saida": somaSaida
        })
    } catch (error) {
        return res.status(400).json({ Mensagem: error.message })
    }
}

module.exports = {
    listarTransacoes,
    cadastrarTransacao,
    detalharTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtratoTransacoes
}