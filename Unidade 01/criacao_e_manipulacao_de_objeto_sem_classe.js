/* 
Crie um objeto literal chamado carro com as seguintes propriedades:
– marca
– modelo
– ano
– exibirInfo (um método que exibe no console as informações do carro no formato: "Marca: X | Modelo: Y | Ano: Z")
Depois:
a) Chame o método exibirInfo().
b) Adicione dinamicamente uma nova propriedade chamada cor com o valor "Preto".
c) Atualize o valor de ano para o ano atual (2025).
d) Exiba o objeto completo no console para verificar as alterações.
*/

//a)
let carro = {
    marca: "Volkswagen",
    modelo: "Gol",
    ano: 1990,
    exibirInfo: function() {
        console.log(`Marca: ${this.marca} | Modelo: ${this.modelo} | Ano: ${this.ano}`);
    }
};
carro.exibirInfo();
console.log("");

//b)
carro.cor = "Preto";
console.log(carro);
console.log("");

//c) e d)
carro.ano = 2025;
console.log(carro);
