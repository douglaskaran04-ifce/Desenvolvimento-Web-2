# Atividade de Casa: Consumindo uma API Pública

**Nome do Aluno:** Douglas Karan

## Sobre a API
Eu escolhi usar a API **Dog CEO**.
- **Nome da API:** Dog CEO
- **Link da documentação:** https://dog.ceo/dog-api/
- **Endereço (endpoint) que usei:** `https://dog.ceo/api/breeds/image/random`

## O que a minha página faz
A página é um sorteador de fotos de cachorros. Toda vez que você abre a página ou clica no botão "Buscar Outro Cachorro", ela faz uma requisição (fetch) na API. 

Eu peguei os dados e coloquei 4 informações na tela:
1. O título com o nome da raça (eu fiz um `split` na URL da imagem para pegar a raça).
2. A imagem do cachorro.
3. O status (sucesso) que a API devolve.
4. O link original de onde a imagem veio.

Usei o tema escuro no CSS como foi pedido e tratei os erros com `try...catch`. Se a internet cair, aparece uma mensagem de erro vermelha na tela em vez de quebrar a página.

## Como abrir
É só baixar os arquivos (`index.html`, `style.css` e `script.js`), deixar os 3 na mesma pasta e dar dois cliques no `index.html` para abrir no Google Chrome ou no Firefox. Precisa de internet para as fotos carregarem!
