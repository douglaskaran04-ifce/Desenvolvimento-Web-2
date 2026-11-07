// Pegando os elementos do HTML
let botaoBuscar = document.getElementById("botao-buscar");
let mensagemTela = document.getElementById("mensagem-tela");
let divResultado = document.getElementById("resultado");

// Função para limpar a tela e mostrar os dados
function mostrarDadosNaTela(dados) {
    // Limpa a div antes de colocar o cachorro novo
    divResultado.innerHTML = ""; 

    // A URL que vem da API é tipo: https://images.dog.ceo/breeds/hound-afghan/n02088537_3840.jpg
    // Eu corto a URL nas barras e pego a posição 4 que é onde fica a raça
    let partesDaUrl = dados.message.split("/");
    let nomeDaRaca = partesDaUrl[4];

    // Informação 1: A foto do cachorro
    let imagem = document.createElement("img");
    imagem.src = dados.message;

    // Informação 2: A raça do cachorro
    let tituloRaca = document.createElement("h2");
    tituloRaca.textContent = "Raça: " + nomeDaRaca;

    // Informação 3: O status da API
    let textoStatus = document.createElement("p");
    textoStatus.className = "info-pequena";
    textoStatus.textContent = "Status da API: " + dados.status;

    // Informação 4: O link original da foto
    let textoLink = document.createElement("p");
    textoLink.className = "info-pequena";
    textoLink.textContent = "Link da foto: " + dados.message;

    // Colocando tudo dentro da div de resultado usando appendChild
    divResultado.appendChild(tituloRaca);
    divResultado.appendChild(imagem);
    divResultado.appendChild(textoStatus);
    divResultado.appendChild(textoLink);
}

// Função principal que faz o fetch
async function buscarCachorro() {
    try {
        // Mostra carregando e esconde as fotos antigas
        mensagemTela.textContent = "Carregando...";
        mensagemTela.className = ""; // Tira a cor vermelha de erro se tiver
        divResultado.innerHTML = "";

        // Faz a requisição
        let resposta = await fetch("https://dog.ceo/api/breeds/image/random");

        // Verifica se deu ok
        if (resposta.ok == false) {
            throw new Error("Erro de rede. A resposta não foi OK.");
        }

        // Transforma em JSON
        let dados = await resposta.json();

        // Tira o texto de carregando
        mensagemTela.textContent = "";

        // Chama a função que cria os elementos
        mostrarDadosNaTela(dados);

    } catch (erro) {
        // Se der erro, mostra na tela para o usuário (sem usar alert)
        mensagemTela.textContent = "Ops, deu um erro: " + erro.message;
        mensagemTela.className = "texto-erro";
    }
}

// Quando clicar no botão, chama a função de buscar
botaoBuscar.addEventListener("click", buscarCachorro);

// Chama a função logo que a página abre para não ficar vazio
buscarCachorro();