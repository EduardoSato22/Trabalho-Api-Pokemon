# Trabalho API Pokémon

Este projeto foi desenvolvido como parte do curso/finalidade acadêmica do usuário Eduardo Sato. O objetivo principal é criar uma API relacionada ao universo Pokémon, permitindo consultas, manipulação e visualização de dados dos Pokémons.

## Tecnologias Utilizadas

- **Node.js** (ou a linguagem utilizada no projeto)
- **Express** (se aplicável)
- **Axios** (para requisições HTTP à API de Pokémons)
- **Outras bibliotecas** conforme necessário

## Funcionalidades

- Listagem de Pokémons
- Consulta de detalhes de um Pokémon específico
- Filtros por tipo, habilidades, etc.
- Adição, remoção e atualização de Pokémons (se implementado)
- Integração com a [PokéAPI](https://pokeapi.co/) (ou outra fonte de dados)

## Como executar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/EduardoSato22/Trabalho-Api-Pokemon.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   npm start
   ```
   Ou conforme o comando configurado no seu `package.json`.

4. **Acesse a aplicação:**
   Normalmente em [http://localhost:3000](http://localhost:3000) ou porta configurada.

## Estrutura de Pastas

```
src/
├── controllers/
├── routes/
├── services/
├── models/
└── index.js
```
*(Adapte conforme a organização do seu projeto)*

## Exemplos de Endpoints

- `GET /pokemons` — Lista todos os Pokémons
- `GET /pokemons/:id` — Detalhes de um Pokémon específico
- `POST /pokemons` — Adiciona um novo Pokémon (se implementado)
- `PUT /pokemons/:id` — Atualiza um Pokémon (se implementado)
- `DELETE /pokemons/:id` — Remove um Pokémon (se implementado)

## Referências

- [PokéAPI](https://pokeapi.co/)
- [Documentação Node.js](https://nodejs.org/)
- [Documentação Express](https://expressjs.com/pt-br/)

## Autor

- [Eduardo Sato](https://github.com/EduardoSato22)

---

Se tiver dúvidas, sugestões ou encontrar algum problema, fique à vontade para abrir uma issue ou contribuir com o projeto!
