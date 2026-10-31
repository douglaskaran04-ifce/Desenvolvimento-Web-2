// Variáveis globais para guardar a lista e o orçamento
let gastos = [];
let orcamento = 0;

// Carregar os dados que estão salvos no navegador ao abrir a página
let gastosSalvos = localStorage.getItem("gastos");
if (gastosSalvos != null) {
  gastos = JSON.parse(gastosSalvos);
}

let orcamentoSalvo = localStorage.getItem("orcamento");
if (orcamentoSalvo != null) {
  orcamento = Number(orcamentoSalvo);
  document.getElementById("orcamento").value = orcamento;
}

// --------------------------------------------------------
// CADASTRAR GASTO
// --------------------------------------------------------
let formulario = document.getElementById("formGasto");

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault(); // Não deixa a página recarregar

  // Pegando os valores digitados
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;
  let categoria = document.getElementById("categoria").value;
  let mensagem = document.getElementById("mensagem");

  // Tirando espaços em branco do texto
  descricao = descricao.trim();

  // Validações (Requisito 2)
  if (descricao == "") {
    mensagem.textContent = "A descrição não pode estar vazia.";
    mensagem.className = "mensagem erro";
  } else if (valor == "") {
    mensagem.textContent = "Você precisa digitar o valor.";
    mensagem.className = "mensagem erro";
  } else if (Number(valor) <= 0) {
    mensagem.textContent = "O valor tem que ser maior que zero.";
    mensagem.className = "mensagem erro";
  } else if (categoria == "") {
    mensagem.textContent = "Escolha uma categoria.";
    mensagem.className = "mensagem erro";
  } else {
    // Se não entrou em nenhum erro, cadastra o gasto
    let novoGasto = {
      id: Date.now(),
      descricao: descricao,
      valor: Number(valor),
      categoria: categoria
    };

    gastos.push(novoGasto); // Coloca no array

    // Salva no navegador
    localStorage.setItem("gastos", JSON.stringify(gastos));

    // Mensagem de sucesso e limpar form (Requisito 3 e 11)
    mensagem.textContent = "Gasto adicionado com sucesso!";
    mensagem.className = "mensagem sucesso";
    
    document.getElementById("formGasto").reset();
    document.getElementById("descricao").focus();

    // Atualiza a tela
    desenharTela();
  }
});

// --------------------------------------------------------
// DESENHAR TABELA E TOTAIS (Requisito 4, 6 e 7)
// --------------------------------------------------------
function desenharTela() {
  let corpoTabela = document.getElementById("listaGastos");
  corpoTabela.textContent = ""; // Limpa a tabela antes de desenhar de novo

  let filtro = document.getElementById("filtroCategoria").value;
  let listaParaMostrar = [];

  // Bônus: Filtro por categoria com if/else
  if (filtro == "") {
    listaParaMostrar = gastos;
  } else {
    for (let i = 0; i < gastos.length; i++) {
      if (gastos[i].categoria == filtro) {
        listaParaMostrar.push(gastos[i]);
      }
    }
  }

  // Verifica se tem gastos para esconder ou mostrar a mensagem de vazio (Requisito 9)
  let paragrafoVazio = document.getElementById("vazio");
  if (listaParaMostrar.length == 0) {
    paragrafoVazio.classList.remove("oculto");
  } else {
    paragrafoVazio.classList.add("oculto");
  }

  // Desenhando cada linha da tabela com laço for tradicional
  for (let i = 0; i < listaParaMostrar.length; i++) {
    let gastoAtual = listaParaMostrar[i];

    let tr = document.createElement("tr");
    tr.dataset.id = gastoAtual.id;

    let tdDescricao = document.createElement("td");
    tdDescricao.textContent = gastoAtual.descricao;

    let tdCategoria = document.createElement("td");
    let spanCategoria = document.createElement("span");
    spanCategoria.classList.add("badge");
    spanCategoria.classList.add(gastoAtual.categoria);
    
    // Descobrindo o nome bonito da categoria com if/else
    if (gastoAtual.categoria == "alimentacao") {
      spanCategoria.textContent = "Alimentação";
    } else if (gastoAtual.categoria == "transporte") {
      spanCategoria.textContent = "Transporte";
    } else if (gastoAtual.categoria == "lazer") {
      spanCategoria.textContent = "Lazer";
    } else if (gastoAtual.categoria == "estudos") {
      spanCategoria.textContent = "Estudos";
    } else if (gastoAtual.categoria == "outros") {
      spanCategoria.textContent = "Outros";
    }
    tdCategoria.appendChild(spanCategoria);

    let tdValor = document.createElement("td");
    tdValor.classList.add("valor");
    tdValor.textContent = gastoAtual.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    let tdBotao = document.createElement("td");
    let botaoRemover = document.createElement("button");
    botaoRemover.classList.add("remover");
    botaoRemover.textContent = "Remover";
    tdBotao.appendChild(botaoRemover);

    // Junta tudo na linha
    tr.appendChild(tdDescricao);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdValor);
    tr.appendChild(tdBotao);

    // Coloca a linha na tabela
    corpoTabela.appendChild(tr);
  }

  calcularTotais();
}

// --------------------------------------------------------
// CALCULAR TOTAIS E ORÇAMENTO
// --------------------------------------------------------
function calcularTotais() {
  let somaGeral = 0;
  let somaAlimentacao = 0;
  let somaTransporte = 0;
  let somaLazer = 0;
  let somaEstudos = 0;
  let somaOutros = 0;

  // Passa por todos os gastos para somar
  for (let i = 0; i < gastos.length; i++) {
    somaGeral = somaGeral + gastos[i].valor;

    if (gastos[i].categoria == "alimentacao") {
      somaAlimentacao = somaAlimentacao + gastos[i].valor;
    } else if (gastos[i].categoria == "transporte") {
      somaTransporte = somaTransporte + gastos[i].valor;
    } else if (gastos[i].categoria == "lazer") {
      somaLazer = somaLazer + gastos[i].valor;
    } else if (gastos[i].categoria == "estudos") {
      somaEstudos = somaEstudos + gastos[i].valor;
    } else if (gastos[i].categoria == "outros") {
      somaOutros = somaOutros + gastos[i].valor;
    }
  }

  // Escreve os totais na tela
  document.getElementById("totalGeral").textContent = somaGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  document.getElementById("total-alimentacao").textContent = somaAlimentacao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  document.getElementById("total-transporte").textContent = somaTransporte.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  document.getElementById("total-lazer").textContent = somaLazer.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  document.getElementById("total-estudos").textContent = somaEstudos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  document.getElementById("total-outros").textContent = somaOutros.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Regra do alerta de orçamento estourado
  let pTotalGeral = document.querySelector(".total-geral");
  let aviso = document.getElementById("avisoOrcamento");
  
  if (orcamento > 0 && somaGeral > orcamento) {
    pTotalGeral.classList.add("estourou");
    let valorPassou = somaGeral - orcamento;
    aviso.textContent = "Orçamento ultrapassado em " + valorPassou.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } else {
    pTotalGeral.classList.remove("estourou");
    aviso.textContent = "";
  }
}

// --------------------------------------------------------
// REMOVER GASTO (Requisito 8)
// --------------------------------------------------------
document.getElementById("listaGastos").addEventListener("click", function(evento) {
  if (evento.target.classList.contains("remover")) {
    let linha = evento.target.closest("tr");
    let idClicado = Number(linha.dataset.id);

    // Cria uma lista nova só com os itens que não vão ser apagados
    let novaListaDeGastos = [];
    for (let i = 0; i < gastos.length; i++) {
      if (gastos[i].id !== idClicado) {
        novaListaDeGastos.push(gastos[i]);
      }
    }
    
    gastos = novaListaDeGastos; // Substitui a lista velha pela nova

    localStorage.setItem("gastos", JSON.stringify(gastos));
    desenharTela();
  }
});

// --------------------------------------------------------
// EVENTOS EXTRAS DO BÔNUS
// --------------------------------------------------------
document.getElementById("orcamento").addEventListener("input", function() {
  let campoOrcamento = document.getElementById("orcamento").value;
  if (campoOrcamento == "") {
    orcamento = 0;
  } else {
    orcamento = Number(campoOrcamento);
  }
  localStorage.setItem("orcamento", orcamento);
  calcularTotais();
});

document.getElementById("filtroCategoria").addEventListener("change", function() {
  desenharTela();
});

// --------------------------------------------------------
// INICIAR A PÁGINA
// --------------------------------------------------------
desenharTela();