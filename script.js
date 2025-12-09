// =======================================================================
// Lógica de Tema (Claro/Escuro)
// =======================================================================

const body = document.getElementById('body-principal');
const themeToggleBtn = document.getElementById('theme-toggle'); 
const themeColorMeta = document.getElementById('theme-color-meta');
const DARK_THEME_CLASS = 'dark-theme';
const LIGHT_THEME_COLOR = '#ffffff'; 
const DARK_THEME_COLOR = '#1a1a1a'; 

// Função para aplicar o tema (Ícones ajustados para UX)
function applyTheme(isDark) {
    if (isDark) {
        body.classList.add(DARK_THEME_CLASS);
        themeToggleBtn.textContent = '☀️'; // Mostrar Sol (clique para Claro)
        themeToggleBtn.setAttribute('aria-pressed', 'true');
        themeColorMeta.setAttribute('content', DARK_THEME_COLOR);
    } else {
        body.classList.remove(DARK_THEME_CLASS);
        themeToggleBtn.textContent = '🌙'; // Mostrar Lua (clique para Escuro)
        themeToggleBtn.setAttribute('aria-pressed', 'false');
        themeColorMeta.setAttribute('content', LIGHT_THEME_COLOR);
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Carrega o tema ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme 
        ? savedTheme === 'dark' 
        : window.matchMedia('(prefers-color-scheme: dark)').matches;

    applyTheme(prefersDark);
});

// Event Listener para o botão de alternância
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = body.classList.contains(DARK_THEME_CLASS);
        applyTheme(!isDark);
    });
}


// =======================================================================
// Lógica dos Formulários e Jogos
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

// Funções globais para o onclick no HTML
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
    document.getElementById('palpite').disabled = true;
    document.getElementById('btnAdivinhar').disabled = true;
    alert(`VITÓRIA! Você acertou o número secreto!`);
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

// =======================================================================
// 6. Cálculo de IMC (Novo)
// =======================================================================

document.getElementById("imcForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");
    const resultadoDiv = document.getElementById("imcResultado");

    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    // 1. Validação
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        resultadoDiv.innerHTML = "⚠️ Por favor, insira valores válidos e positivos para peso e altura.";
        return;
    }

    // 2. Cálculo
    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2);

    // 3. Classificação e Cores
    let classificacao = '';
    let emoji = '';
    let cor = '';
    
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        emoji = '⬇️';
        cor = 'var(--color-text-secondary)';
    } else if (imc >= 18.5 && imc < 24.9) {
        classificacao = 'Peso normal';
        emoji = '✅';
        cor = 'var(--color-primary)';
    } else if (imc >= 25.0 && imc < 29.9) {
        classificacao = 'Sobrepeso';
        emoji = '🟠';
        cor = '#ffc107'; 
    } else if (imc >= 30.0 && imc < 34.9) {
        classificacao = 'Obesidade Grau I';
        emoji = '🛑';
        cor = '#dc3545';
    } else if (imc >= 35.0 && imc < 39.9) {
        classificacao = 'Obesidade Grau II (Severa)';
        emoji = '🚨';
        cor = '#dc3545';
    } else {
        classificacao = 'Obesidade Grau III (Mórbida)';
        emoji = '⚠️';
        cor = '#dc3545';
    }

    // 4. Exibição do Resultado
    resultadoDiv.innerHTML = `
        Seu IMC é: <strong style="color: ${cor};">${imcFormatado}</strong><br>
        Classificação: <strong style="color: ${cor};">${emoji} ${classificacao}</strong>
    `;
});
