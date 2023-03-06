const express = require('express')
const usuarios = require('./controladores/usuarios')
const login = require('./controladores/login')
const categorias = require('./controladores/categorias')
const verificarToken = require('./Validadores/verificarToken')
const transacoes = require('./controladores/transacoes')
const { validarCampos } = require('./Validadores/validarCampos')


const rotas = express.Router()

rotas.post('/usuario', usuarios.cadastraUsuario)
rotas.post('/login', login.loginUsuario)

rotas.use(verificarToken.verificaToken)

rotas.get('/usuario', usuarios.detalhaUsuario)
rotas.put('/usuario', usuarios.atualizaUsuario)

rotas.get('/categoria', categorias.listaCategorias)

rotas.get('/transacao', transacoes.listarTransacoes)
rotas.post('/transacao', transacoes.cadastrarTransacao)
rotas.get('/transacao/extrato', transacoes.obterExtratoTransacoes)
rotas.get('/transacao/:id', transacoes.detalharTransacao)
rotas.put('/transacao/:id', transacoes.atualizarTransacao)
rotas.delete('/transacao/:id', transacoes.excluirTransacao)

module.exports = rotas