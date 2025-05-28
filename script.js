// 1. Dia da semana
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    let dia = document.getElementById("day").value.trim().toLowerCase();
    if (dia === "sábado" || dia === "sabado" || dia === "domingo") {
        alert("Bom fim de semana!");
    } else if (dia) {
        alert("Boa semana!");
    } else {
        alert("Por favor, digite o dia da semana.");
    }
    this.reset();
});

// 2. Positivo ou negativo
document.getElementById("numberForm").addEventListener("submit", function(e){
    e.preventDefault();
    let num = Number(document.getElementById("number").value);
    if (isNaN(num)) {
        alert("Digite um número válido.");
    } else if (num > 0) {
        alert("O número é positivo.");
    } else if (num < 0) {
        alert("O número é negativo.");
    } else {
        alert("O número é zero.");
    }
    this.reset();
});

// 3. Jogo de Adivinhação
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

function adivinhar() {
  let palpiteInput = document.getElementById('palpite');
  let palpite = Number(palpiteInput.value);
  tentativas++;

  if (palpite < 1 || palpite > 100 || isNaN(palpite)) {
    document.getElementById('mensagem').textContent = "Digite um número válido entre 1 a 100.";
  } else if (palpite < numeroSecreto) {
    document.getElementById('mensagem').textContent = 
      `Você digitou: ${palpite}. Tente um número maior.`;
  } else if (palpite > numeroSecreto) {
    document.getElementById('mensagem').textContent = 
      `Você digitou: ${palpite}. Tente um número menor.`;
  } else {
    document.getElementById('mensagem').textContent = 
      `Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativa(s)! Seu último palpite foi: ${palpite}.`;
  }

  palpiteInput.value = "";
  palpiteInput.focus();
}

function reiniciar() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativas = 0;
  document.getElementById('mensagem').textContent = "";
  document.getElementById('palpite').value = "";
  document.getElementById('palpite').focus();
}


// 4. Mensagem com saldo
document.getElementById("balanceForm").addEventListener("submit", function(e){
    e.preventDefault();
    let saldo = Number(document.getElementById("balance").value);
    if (isNaN(saldo)) {
        alert("Digite um saldo válido.");
    } else {
        alert(`Seu saldo atual é: R$ ${saldo.toFixed(2)}`);
    }
    this.reset();
});

// 5. Boas-vindas com nome
document.getElementById("nameForm").addEventListener("submit", function(e){
    e.preventDefault();
    let nome = document.getElementById("name").value.trim();
    if (nome.length > 0) {
        alert(`Bem-vindo(a), ${nome}!`);
    } else {
        alert("Digite seu nome.");
    }
    this.reset();
});

function setTheme(theme) {
    const body = document.body;
    if (theme === 'default') {
        body.classList.remove('alternative-theme');
        body.classList.add('default-theme');
    } else if (theme === 'alternative') {
        body.classList.remove('default-theme');
        body.classList.add('alternative-theme');
    }
 }
 
 function setAnimation(animation) {
    const imagem = document.querySelector('.imagem');
    if (animation === 'default') {
        imagem.classList.remove('alternative-animation');
    } else if (animation === 'alternative') {
        imagem.classList.add('alternative-animation');
    }
 }