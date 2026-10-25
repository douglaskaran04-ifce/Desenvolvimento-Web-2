/* 
Peça ao usuário que informe uma palavra.
a) Exiba a quantidade de caracteres da palavra.
b) Verifique se a palavra é um palíndromo (ou seja, se ela é igual quando lida de trás para frente). Exiba no console uma mensagem indicando se é ou não um palíndromo.
Dica: Use split(''), reverse() e join('') para inverter a palavra.
*/

//a)
let prompt = require ('prompt-sync')();
let palavra = prompt('Digite uma palavra: ');

console.log(palavra.length);

//b)
let palavra_minuscula = palavra.toLocaleLowerCase();
console.log(palavra_minuscula);

let palavra_ivertida = palavra_minuscula.split(``);
console.log(palavra_ivertida);

let palavra_reversa = palavra_ivertida.reverse(``);
console.log(palavra_reversa);

let palavra_nova = palavra_reversa.join(``);
console.log(palavra_nova);

if (palavra_nova === palavra_minuscula) {
    console.log("É um Palíndromo");
} else {
    console.log("Não é Palíndromo");
}