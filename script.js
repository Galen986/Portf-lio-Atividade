 // 1. Dia da semana
    document.getElementById("form").addEventListener("submit", function(e) {
      e.preventDefault();
      let dia = document.getElementById("day").value.trim().toLowerCase();
      if (!dia) {
        alert("Por favor, digite o dia da semana.");
      } else if (dia === "sábado" || dia === "sabado" || dia === "domingo") {
        alert("Bom fim de semana!");
      } else {
        alert("Boa semana!");
      }
      this.reset();
    });

    // 2. Positivo ou negativo
    document.getElementById("numberForm").addEventListener("submit", function(e){
      e.preventDefault();
      let input = document.getElementById("number");
      let valorDigitado = input.value.trim();

      if (valorDigitado === "") {
        alert("Por favor, digite um número.");
      } else {
        let num = Number(valorDigitado);
        if (num > 0) {
          alert("O número é positivo.");
        } else if (num < 0) {
          alert("O número é negativo.");
        } else {
          alert("O número é zero.");
        }
      }
      this.reset();
    });

    // 3. Jogo de Adivinhação
    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
let jogoEncerrado = false;

function adivinhar() {
  if (jogoEncerrado) {
    document.getElementById('mensagem').textContent = "Clique em Reiniciar para jogar novamente.";
    return;
  }

  let palpiteInput = document.getElementById('palpite');
  let palpite = palpiteInput.value.trim();

  if (palpite === "") {
    document.getElementById('mensagem').textContent = "Por favor, digite um número.";
    return;
  }

  palpite = Number(palpite);
  tentativas++;

  if (isNaN(palpite) || palpite < 1 || palpite > 100) {
    document.getElementById('mensagem').textContent = "Digite um número válido entre 1 e 100.";
  } else if (palpite < numeroSecreto) {
    document.getElementById('mensagem').textContent = `Você digitou: ${palpite}. Tente um número maior.`;
  } else if (palpite > numeroSecreto) {
    document.getElementById('mensagem').textContent = `Você digitou: ${palpite}. Tente um número menor.`;
  } else {
    document.getElementById('mensagem').textContent = 
      `🎉 Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativa(s)!`;
    jogoEncerrado = true;
    document.getElementById('palpite').disabled = true;
    document.getElementById('btnAdivinhar').disabled = true;
  }

  palpiteInput.value = "";
  palpiteInput.focus();
}

function reiniciar() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativas = 0;
  jogoEncerrado = false;

  document.getElementById('mensagem').textContent = "";
  document.getElementById('palpite').value = "";
  document.getElementById('palpite').disabled = false;
  document.getElementById('btnAdivinhar').disabled = false;
  document.getElementById('palpite').focus();
}

    // 4. Saldo
    document.getElementById("balanceForm").addEventListener("submit", function(e){
      e.preventDefault();
      let input = document.getElementById("balance");
      let valorDigitado = input.value.trim();

      if (valorDigitado === "") {
        alert("Por favor, digite o valor do saldo.");
      } else {
        let saldo = Number(valorDigitado);
        let saldoFormatado = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        alert(`Seu saldo atual é: ${saldoFormatado}`);
      }
      this.reset();
    });

    // 5. Boas-vindas com nome
    document.getElementById("nameForm").addEventListener("submit", function(e){
      e.preventDefault();
      let nome = document.getElementById("name").value.trim();
      if (nome === "") {
        alert("Por favor, digite seu nome.");
      } else {
        alert(`Bem-vindo(a), ${nome}!`);
      }
      this.reset();
    });

    // Temas e animações (opcional)
    function setTheme(theme) {
      const body = document.body;
      body.className = theme === 'alternative' ? 'alternative-theme' : 'default-theme';
    }

    function setAnimation(animation) {
      const imagem = document.querySelector('.imagem');
      if (animation === 'alternative') {
        imagem.classList.add('alternative-animation');
      } else {
        imagem.classList.remove('alternative-animation');
      }
    }