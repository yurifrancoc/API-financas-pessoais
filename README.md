# API de Finanças Pessoais

Desafio-Back-end-Cubos-Modulo-3

## Descrição

Este projeto se trata de um desafio da Cubos Academy que envolve a construção de uma API REST, em Node.js com banco de dados Postgres.

## Instalação

1. Clonar este repositorio no VSCode: `git clone git@github.com:yurifrancoc/API-financas-pessoais.git`
2. Navegar até o diretório: `cd API-financas-pessoais`
3. Instalar bibliotecas/dependencias: `npm install`
4. Run the project: `npm init`

### Endpoints

Aqui estão apresentadas as rotas e suas respectivas funções:

- `POST '/usuario`: Cadastra um novo usuário ao banco de dados a partir do preenchimento do campo body (nome, email e senha).

![image](https://user-images.githubusercontent.com/112022201/222852123-de9f8025-1555-47bd-b520-c8bb1a557e2b.png)

- `POST '/login`: Efetua login com o usuário cadastrado a partir do preenchimento do campo body (nome e email), gerando um token de acesso com validade para este usuário.

![image](https://user-images.githubusercontent.com/112022201/222852180-6f2ad322-cdba-423d-b8f8-f1078ece7ee7.png)

- `GET '/usuario`: Retorna o detalhamento de informações sobre o usuário a partir do envio do token equivalente ao usuário.

![image](https://user-images.githubusercontent.com/112022201/222852255-1e4d669a-181a-4d29-96fe-05cff31800c0.png)

- `PUT '/usuario`: Atualiza informações do usuário a partir do preenchimento do campo body (nome, email e senha) e envio do token equivalente ao usuário.

![image](https://user-images.githubusercontent.com/112022201/222852366-2a324931-d316-4631-b5ac-30c83cd89053.png)
![image](https://user-images.githubusercontent.com/112022201/222852387-d858e6c8-9acb-401c-a9be-0bf8e219fefd.png)

- `GET '/categoria`: Retorna a lista de categorias cadastradas a partir do envio do token equivalente ao usuário.

![image](https://user-images.githubusercontent.com/112022201/222852456-aec6e095-d4c6-483e-ab63-c92c9d3df76c.png)

- `POST /transacao`: Cadastra uma nova transação para o usuário a partir do preenchimento do campo body.

![image](https://user-images.githubusercontent.com/112022201/222852710-6286590f-9e69-4746-95bb-d2be91613859.png)

- `GET '/transacao`: Retorna a lista de transações realizadas pelo usuario a partir do envio do token equivalente ao usuário.

![image](https://user-images.githubusercontent.com/112022201/222852757-e86c615b-05c4-4aae-aeb9-f42729e13890.png)

- `GET '/transacao/extrato`: Retorna a lista com o extrato das transações cadastradas para o usuário a partir do envio do token equivalente ao usuário.

![image](https://user-images.githubusercontent.com/112022201/222852853-a7eead9b-30dc-4a11-9270-a2c5df430bc3.png)

- `GET '/transacao/:id`: Retorna detalhes da transação para o usuário a partir do envio de seu 'id' como parâmetro de rota do endpoint e envio do token equivalente ao usuário.

![image](https://user-images.githubusercontent.com/112022201/222853314-9751d8fd-f307-417f-9452-81ddf731aeb9.png)

- `PUT '/transacao/:id`: Atualiza informações da transação a partir do preenchimento do campo body e envio do 'id' como parâmetro de rota do endpoint e envio do token equivalente ao usuário.

![image](https://user-images.githubusercontent.com/112022201/222853451-e8f00e30-f4af-4235-aba8-4211bdcaa4cc.png)

- `DELETE '/transacao/:id`: Exclui uma transação cadastrada para o usuário logado, a partir do 'id' enviado como parâmetro de rota e envio do token equivalente ao usuário.

![image](https://user-images.githubusercontent.com/112022201/222853574-851f9823-2c2a-449a-be47-bf4731beffb9.png)

## Como testar

As requisições devem ser enviadas a partir de algum framework para desenvolvimento de testes de API, tal como: Postman e Insomnia.

## Idealizadores do Projeto

[<img src="https://avatars.githubusercontent.com/u/112022201?v=4" width=115><br><sub>Yuri Franco</sub>](https://github.com/yurifrancoc)



[<img src="https://avatars.githubusercontent.com/u/112038333?v=4" width=115><br><sub>Alexandre Pacheco</sub>](https://github.com/Alexandrekpr)




![image](https://user-images.githubusercontent.com/112022201/222851832-b58683da-9592-474e-b1bd-91c49f187e83.png)
