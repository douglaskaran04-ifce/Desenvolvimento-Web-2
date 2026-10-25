/*Crie um array chamado numeros e receba do usuário quantos números ele quiser.
a) Exiba o maior e o menor valor do array (use Math.max(...array) e Math.min(...array)).*/

const prompt = require ('prompt-sync')();
//const numeros = prompt('Digite seu número: ');

let number = [];
let contador = 1;
while (true) {
    //console.log("While: " + contador);
    let numeros = prompt('Digite seu número: ');
    let numeros_validos = parseFloat(numeros);
    if ( numeros_validos == 0 ) {
        break
    };
    number.push(numeros_validos);
    contador++;
};
//console.log(number);
//console.log(Math.max(...number));
//console.log(Math.min(...number));

let var_max = Math.max(...number);
let var_min = Math.min(...number);

console.log("");
console.log(`O valor máximo digitado é: ${var_max}, já o valor mínimo é: ${var_min}`)
console.log("");

//b) Crie um novo array chamado dobro que contenha o dobro de cada número do array original (use map()).

let dobro = number.map(n => n*2);
console.log("A array dobrada é: ");
console.log(dobro);

//c) Filtre e exiba apenas os números maiores que 5 do array original (use filter()).
console.log("");
let cinco_primeiros = number
    .filter(n => n > 5);
console.log("Os números maiores que 5 da array original são: ");
console.log(cinco_primeiros);