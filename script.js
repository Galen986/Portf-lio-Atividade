// =======================================================================
// Lógica de Tema (Claro/Escuro)
// =======================================================================

const body = document.getElementById('body-principal');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeColorMeta = document.getElementById('theme-color-meta');
const DARK_THEME_CLASS = 'dark-theme';
const LIGHT_THEME_COLOR = '#ffffff'; // Cor para a barra do navegador no tema claro
const DARK_THEME_COLOR = '#1a1a1a'; // Cor para a barra do navegador no tema escuro

// Função para aplicar o tema
function applyTheme(isDark) {
    if (isDark) {
        body.classList.add(DARK_THEME_CLASS);
        themeToggleBtn.textContent = '🌙'; // Ícone de lua para indicar que o tema escuro está ativo
        themeToggleBtn.setAttribute('aria-pressed', 'true');
        themeColorMeta.setAttribute('content', DARK_THEME_COLOR);
    } else {
        body.classList.remove(DARK_THEME_CLASS);
        themeToggleBtn.textContent = '☀️'; // Ícone de sol para indicar que o tema claro está ativo
        themeToggleBtn.setAttribute('aria-pressed', 'false');
        themeColorMeta.setAttribute('content', LIGHT_THEME_COLOR);
    }
    // Salva a preferência do usuário
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Carrega o tema ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    // Tenta carregar a preferência salva
    const savedTheme = localStorage.getItem('theme');
    
    // Verifica a preferência salva OU a preferência do sistema do usuário
    const prefersDark = savedTheme 
        ? savedTheme === 'dark' 
        : window.matchMedia('(prefers-color-scheme: dark)').matches;

    applyTheme(prefersDark);
});

// Event Listener para o botão de alternância
themeToggleBtn.addEventListener('click', () => {
    const isDark = body.classList.contains(DARK_THEME_CLASS);
    applyTheme(!isDark);
});


// =======================================================================
// Lógica dos Formulários e Jogos (Melhorias e Correções)
// =======================================================================

// 1. Dia da semana
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  let dia = document.getElementById("day").value.trim().toLowerCase();
  if (!dia) {
    alert("Por favor, digite o dia da semana.");
  } else if (dia === "sábado" || dia === "sabado" || dia === "domingo") {
    alert("Bom fim de semana! 🎉");
  } else {
    alert("Boa semana! 💼");
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
      alert("O número é positivo. ✅");
    } else if (num < 0) {
      alert("O número é negativo. ❌");
    } else {
      alert("O número é zero. 0️⃣");
    }
  }
  this.reset();
});

// 3. Jogo de Adivinhação
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
let jogoEncerrado = false;

// CORREÇÃO: As funções 'adivinhar' e 'reiniciar' precisam ser globais (ou anexadas à janela) 
// pois são chamadas diretamente no HTML via 'onclick'.
window.adivinhar = function() {
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
    document.getElementById('mensagem').textContent = `Você digitou: ${palpite}. Tente um número maior. ⬆️`;
  } else if (palpite > numeroSecreto) {
    document.getElementById('mensagem').textContent = `Você digitou: ${palpite}. Tente um número menor. ⬇️`;
  } else {
    document.getElementById('mensagem').textContent = 
      `🎉 Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativa(s)!`;
    jogoEncerrado = true;
    // Habilita/Desabilita corretamente
    document.getElementById('palpite').disabled = true;
    document.getElementById('btnAdivinhar').disabled = true;
  }

  palpiteInput.value = "";
  palpiteInput.focus();
}

window.reiniciar = function() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativas = 0;
  jogoEncerrado = false;

  document.getElementById('mensagem').textContent = "";
  document.getElementById('palpite').value = "";
  document.getElementById('palpite').disabled = false;
  document.getElementById('btnAdivinhar').disabled = false; // Corrigido o ID do botão
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
    // Uso de Intl.NumberFormat para formatação mais robusta e nativa
    let formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    let saldoFormatado = formatter.format(saldo);
    alert(`Seu saldo atual é: ${saldoFormatado} 💰`);
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
    alert(`Bem-vindo(a), ${nome}! 👋`);
  }
  this.reset();
});

// As funções setTheme e setAnimation do seu código original foram removidas 
// e substituídas pela lógica de tema centralizada acima.
