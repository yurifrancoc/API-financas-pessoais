# API de Finanças Pessoais

Desafio-Back-end-Cubos-Final

## Descrição

Este projeto se trata de um desafio da Cubos Academy que envolve a construção de uma API REST, em Node.js com banco de dados Postgres.

## Installation

1. Clonar este repositorio no VSCode: `git clone git@github.com:yurifrancoc/API-financas-pessoais.git`
2. Navegar até o diretório: `cd API-financas-pessoais`
3. Instalar bibliotecas/dependencias: `npm install`
4. Run the project: `npm init`

## How to Use

To use the API, simply send HTTP requests to the available endpoints.

### Endpoints

Aqui estão apresentadas as rotas e suas respectivas funções:

- `POST '/usuario': Cadastra um novo usuário ao banco de dados a partir do preenchimento do campo body (nome, email e senha).

- `POST '/login': Efetua login com o usuário cadastrado a partir do preenchimento do campo body (nome e email), gerando um token de acesso com validade para este usuário.

- `GET '/usuario': Retorna o detalhamento de informações sobre o usuário a partir do envio do token equivalente ao usuário.

- `PUT '/usuario': Atualiza informações do usuário a partir do preenchimento do campo body (nome, email e senha) e envio do token equivalente ao usuário.

- `GET '/categoria': Retorna a lista de categorias cadastradas a partir do envio do token equivalente ao usuário.

- 'POST /transacao': Cadastra uma nova transação para o usuário a partir do preenchimento do campo body 

- 'GET '/transacao': Retorna a lista de transações realizadas pelo usuario a partir do envio do token equivalente ao usuário.

- 'GET '/transacao/extrato': Retorna a lista com o extrato das transações cadastradas para o usuário a partir do envio do token equivalente ao usuário.

- 'GET '/transacao/:id': Retorna detalhes da transação para o usuário a partir do envio de seu 'id' como parâmetro de rota do endpoint e envio do token equivalente ao usuário.

- 'PUT '/transacao/:id': Atualiza informações da transação a partir do preenchimento do campo body (nome, email e senha) e envio do 'id' como parâmetro de rota do endpoint e envio do token equivalente ao usuário.

- 'DELETE '/transacao/:id': Exclui uma transação cadastrada para o usuário logado, a partir do 'id' enviado como parâmetro de rota e envio do token equivalente ao usuário.

As requisições devem ser enviadas a partir de algum framework para desenvolvimento de testes de API, tal como: Postman e Insomnia.


## Contributing

We welcome contributions to this project! To contribute, follow these steps:

1. Fork this repository
2. Create a branch with your feature: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'My new feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a Pull Request

## Idealizadores do Projeto

Yuri Franco (github: https://github.com/yurifrancoc) e Alexandre Pacheco (github: https://github.com/Alexandrekpr)


Alexandre Pacheco



| [<img src="https://avatars.githubusercontent.com/u/112022201?v=4" width=115><br><sub>Yuri Franco</sub>](https://github.com/yurifrancoc) | [<img src="https://avatars.githubusercontent.com/u/112038333?v=4" width=115><br><sub>Alexandre Pacheco</sub>](https://github.com/Alexandrekpr) | 
| :---------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |

