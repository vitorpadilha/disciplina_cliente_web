var leitor = require ("prompt-sync")();

var nome = leitor("Digite seu nome:");

var idade = leitor("Digite a idade:");

console.log(`Nome: ${nome}`);

console.log("Idade: " + idade);

