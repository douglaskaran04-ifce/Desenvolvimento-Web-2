# API de Astronomia - Desenvolvimento Web 2

Esta é uma API REST construída com Node.js e Express que fornece dados sobre corpos celestes e objetos astronômicos (planetas, estrelas, nebulosas, galáxias e satélites), informando sua categoria, constelação e distância aproximada em anos-luz.

## Como instalar e rodar o projeto

1. Clone este repositório ou baixe os arquivos.
2. No terminal, dentro da pasta do projeto, instale as dependências:
   ```bash
   npm install

## Tabela de Rotas da API

| Rota | Exemplo de Endereço | O que devolve |
| :--- | :--- | :--- |
| `GET /` | `http://localhost:3000/` | Devolve uma mensagem de boas-vindas em JSON citando a API de Astronomia. |
| `GET /astros` | `http://localhost:3000/astros` | Devolve a lista completa em JSON com todos os 8 astros cadastrados. |
| `GET /astros/:id` | `http://localhost:3000/astros/4` | Devolve um único astro correspondente ao ID informado (ou erro `400` se o ID não for número / `404` se não existir). |
| `GET /astros?categoria=...` | `http://localhost:3000/astros?categoria=estrela` | Devolve apenas os astros da categoria pedida (ou uma lista vazia `[]` se a categoria não existir). |
| `GET /astros?distanciaMax=...` | `http://localhost:3000/astros?distanciaMax=1000` | Devolve os astros com distância menor ou igual ao valor em anos-luz (ou erro `400` se não for um número válido). |
| `GET /astros?limite=...` | `http://localhost:3000/astros?limite=3` | Devolve a lista limitada à quantidade de itens informada (ou erro `400` se não for um número válido). |
| `GET /astros?categoria=...&distanciaMax=...` | `http://localhost:3000/astros?categoria=estrela&distanciaMax=100` | **(Requisito próprio)** Combina os filtros para devolver astros de uma categoria específica dentro da distância máxima. |
| `GET /astros/total` | `http://localhost:3000/astros/total` | **(Requisito próprio)** Devolve um JSON informando a quantidade total de astros cadastrados no array. |
| `GET /astros/aleatorio` | `http://localhost:3000/astros/aleatorio` | **(Requisito próprio)** Devolve um único astro sorteado aleatoriamente da lista. |