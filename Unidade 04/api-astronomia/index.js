const express = require('express');
const app = express();
const PORTA = 3000;

// 1. Dados da API (Array com 8 astros do universo)
// Campos obrigatórios: id, nome, categoria
// Campos próprios do tema: constelacao e distanciaAnosLuz
const astros = [
  { id: 1, nome: "Sol", categoria: "estrela", constelacao: "Nenhuma (Sistema Solar)", distanciaAnosLuz: 0 },
  { id: 2, nome: "Júpiter", categoria: "planeta", constelacao: "Nenhuma (Sistema Solar)", distanciaAnosLuz: 0 },
  { id: 3, nome: "Saturno", categoria: "planeta", constelacao: "Nenhuma (Sistema Solar)", distanciaAnosLuz: 0 },
  { id: 4, nome: "Sirius", categoria: "estrela", constelacao: "Cao Maior", distanciaAnosLuz: 8 },
  { id: 5, nome: "Betelgeuse", categoria: "estrela", constelacao: "Orion", distanciaAnosLuz: 642 },
  { id: 6, nome: "Nebulosa de Órion", categoria: "nebulosa", constelacao: "Orion", distanciaAnosLuz: 1344 },
  { id: 7, nome: "Galáxia de Andrômeda", categoria: "galaxia", constelacao: "Andromeda", distanciaAnosLuz: 2537000 },
  { id: 8, nome: "Lua", categoria: "satelite", constelacao: "Nenhuma (Sistema Solar)", distanciaAnosLuz: 0 }
];

// 2. Middleware Global de Log (registra horário, método e endereço no terminal)
app.use((req, res, next) => {
  const horario = new Date().toLocaleTimeString();
  console.log(`[${horario}] Método: ${req.method} | Endereço: ${req.url}`);
  next(); // Segue para a rota chamada
});

// 3. Rota Inicial (Boas-vindas)
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: "Bem-vindo à API de Astronomia! Acesse /astros para explorar o catálogo cósmico."
  });
});

// 4. Rota Principal (Lista completa + Filtros na Query String)
// Exemplos: /astros | /astros?categoria=estrela | /astros?distanciaMax=1000 | /astros?limite=4
app.get('/astros', (req, res) => {
  let resultado = astros;

  const categoria = req.query.categoria;
  const distanciaMax = req.query.distanciaMax;
  const limite = req.query.limite;

  // Filtro por categoria (ex: estrela, planeta, nebulosa, galaxia, satelite)
  if (categoria !== undefined) {
    resultado = resultado.filter(
      (astro) => astro.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  // Filtro numérico 1: Distância máxima em anos-luz
  if (distanciaMax !== undefined) {
    const distanciaNumero = parseInt(distanciaMax);
    if (isNaN(distanciaNumero) || distanciaNumero < 0) {
      return res.status(400).json({ erro: "O parâmetro 'distanciaMax' deve ser um número válido maior ou igual a zero." });
    }
    resultado = resultado.filter((astro) => astro.distanciaAnosLuz <= distanciaNumero);
  }

  // Filtro numérico 2: Limite de itens retornados
  if (limite !== undefined) {
    const limiteNumero = parseInt(limite);
    if (isNaN(limiteNumero) || limiteNumero <= 0) {
      return res.status(400).json({ erro: "O parâmetro 'limite' deve ser um número válido maior que zero." });
    }
    resultado = resultado.slice(0, limiteNumero);
  }

  res.status(200).json(resultado);
});

// 5. Requisito Próprio (Opção A): Rota extra para mostrar o total de astros
app.get('/astros/total', (req, res) => {
  res.status(200).json({
    total_astros: astros.length
  });
});

// 6. Requisito Próprio (Opção B): Rota extra para sortear um astro aleatório
app.get('/astros/aleatorio', (req, res) => {
  const indiceSorteado = Math.floor(Math.random() * astros.length);
  const astroSorteado = astros[indiceSorteado];
  res.status(200).json(astroSorteado);
});

// 7. Rota de Busca por ID (Parâmetro de Rota)
app.get('/astros/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Valida se o ID digitado é um número (se digitar /astros/abc dá erro 400)
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
  }

  // Procura o astro no array
  const astroEncontrado = astros.find((astro) => astro.id === id);

  // Se não existir (ex: /astros/9999), devolve erro 404
  if (!astroEncontrado) {
    return res.status(404).json({ erro: "Astro não encontrado." });
  }

  // Se encontrou, devolve o objeto do astro
  res.status(200).json(astroEncontrado);
});

// 8. Inicializa o servidor na porta 3000
app.listen(PORTA, () => {
  console.log(`Servidor de Astronomia rodando em http://localhost:${PORTA}`);
});