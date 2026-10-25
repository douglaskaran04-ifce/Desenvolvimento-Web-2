//Avaliação de Risco de Crédito

const prompt = require ('prompt-sync')();
const rendaMensal = prompt('Digite sua Renda Mensal: ');
const dividaAtual = prompt('Digite sua Renda Mensal: ');
//console.log(`Você digitou a Renda ${rendaMensal} e a Divida ${dividaAtual}`)

function avaliarRiscoDeCredito(rendaMensal,dividaAtual) {
    return parseFloat(((dividaAtual/rendaMensal) * 100.0));
}
//console.log(avaliarRiscoDeCredito(15000,10000));
const TE = avaliarRiscoDeCredito(rendaMensal,dividaAtual);
console.log(TE);

if (TE < 10.0) {
    console.log(`Com a Taxa de endividamento: ${TE}%, temos Risco Baixo.`);
}
if (10.0 <= TE && TE < 30.0) {
    console.log(`Com a Taxa de endividamento: ${TE}%, temos Risco Moderado.`);
}
if (TE > 30.0){
    console.log(`Com a Taxa de endividamento: ${TE}%, temos Risco Alto.`);
}