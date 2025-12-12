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

// Função de formatação de moeda para reutilização
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};


// =======================================================================
// Lógica Principal (Executada após o carregamento completo do DOM)
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Carrega o tema ao iniciar
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme 
        ? savedTheme === 'dark' 
        : window.matchMedia('(prefers-color-scheme: dark)').matches;

    applyTheme(prefersDark);

    // Event Listener para o botão de alternância
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = body.classList.contains(DARK_THEME_CLASS);
            applyTheme(!isDark);
        });
    }

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

    // 4. Saldo
    document.getElementById("balanceForm").addEventListener("submit", function(e){
      e.preventDefault();
      let input = document.getElementById("balance");
      let valorDigitado = input.value.trim();

      if (valorDigitado === "") {
        alert("Por favor, digite o valor do saldo.");
      } else {
        let saldo = Number(valorDigitado);
        let saldoFormatado = formatCurrency(saldo);
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

    // 6. Cálculo de IMC (COM BLOQUEIO)
    document.getElementById("imcForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const pesoInput = document.getElementById("peso");
        const alturaInput = document.getElementById("altura");
        const resultadoDiv = document.getElementById("imcResultado");
        const btnCalcular = document.getElementById("btnCalcularImc"); 

        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);

        if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
            resultadoDiv.innerHTML = "⚠️ Por favor, insira valores válidos e positivos para peso e altura.";
            return; 
        }

        const imc = peso / (altura * altura);
        const imcFormatado = imc.toFixed(2);

        let classificacao = '';
        let emoji = '';
        let cor = '';
        let corVerde = 'var(--color-primary)';
        let corLaranja = '#ffc107'; 
        let corVermelho = '#dc3545';

        if (imc < 18.5) {
            classificacao = 'Abaixo do peso';
            emoji = '⬇️';
            cor = 'var(--color-text-secondary)';
        } else if (imc >= 18.5 && imc < 24.9) {
            classificacao = 'Peso normal';
            emoji = '✅';
            cor = corVerde;
        } else if (imc >= 25.0 && imc < 29.9) {
            classificacao = 'Sobrepeso';
            emoji = '🟠';
            cor = corLaranja;
        } else if (imc >= 30.0 && imc < 34.9) {
            classificacao = 'Obesidade Grau I';
            emoji = '🛑';
            cor = corVermelho;
        } else if (imc >= 35.0 && imc < 39.9) {
            classificacao = 'Obesidade Grau II (Severa)';
            emoji = '🚨';
            cor = corVermelho;
        } else {
            classificacao = 'Obesidade Grau III (Mórbida)';
            emoji = '⚠️';
            cor = corVermelho;
        }

        resultadoDiv.innerHTML = `
            Seu IMC é: <strong style="color: ${cor};">${imcFormatado}</strong><br>
            Classificação: <strong style="color: ${cor};">${emoji} ${classificacao}</strong>
        `;

        pesoInput.disabled = true;
        alturaInput.disabled = true;
        btnCalcular.disabled = true;
        alert(`Cálculo de IMC concluído: ${imcFormatado} (${classificacao})`);
    });

    // 7. Conversor de Temperatura (Celsius para Fahrenheit)
    document.getElementById("tempForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const celsiusInput = document.getElementById("celsius");
        const resultadoDiv = document.getElementById("tempResultado");

        const celsius = parseFloat(celsiusInput.value);

        if (isNaN(celsius)) {
            resultadoDiv.innerHTML = "⚠️ Por favor, insira um valor numérico válido.";
            return;
        }

        // Fórmula: F = C * 9/5 + 32
        const fahrenheit = (celsius * 9/5) + 32;
        const fahrenheitFormatado = fahrenheit.toFixed(1);

        resultadoDiv.innerHTML = `
            ${celsius}°C é igual a: <strong style="color: var(--color-primary);">${fahrenheitFormatado}°F</strong> 🔥
        `;
        celsiusInput.focus();
        this.reset();
    });


    // 8. Contador de Cliques
    let contador = 0;
    const contadorElement = document.getElementById("contadorCliques");
    const btnContador = document.getElementById("btnContador");
    const btnReset = document.getElementById("btnResetContador");

    // Verifica se os elementos foram encontrados antes de adicionar o listener
    if (btnContador && contadorElement && btnReset) {
        btnContador.addEventListener('click', function() {
            contador++;
            contadorElement.textContent = contador;
        });

        btnReset.addEventListener('click', function() {
            contador = 0;
            contadorElement.textContent = contador;
            alert("Contador zerado!");
        });
    }


    // 9. Criador de Lista de Tarefas (To-Do List)
    document.getElementById("todoForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const todoInput = document.getElementById("todoInput");
        const todoList = document.getElementById("todoList");
        const taskText = todoInput.value.trim();

        if (taskText === "") {
            alert("Por favor, digite uma tarefa.");
            return;
        }

        const li = document.createElement('li');
        li.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px dashed var(--color-border);
            font-size: 1.1rem;
        `;

        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.style.cssText = `
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            padding: 5px;
            margin-left: 10px;
            transition: transform 0.1s;
        `;

        deleteButton.addEventListener('click', function() {
            todoList.removeChild(li);
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);

        todoInput.value = '';
        todoInput.focus();
    });

    // =======================================================================
    // NOVAS IDEIAS JS (10 a 14)
    // =======================================================================
    
    // 10. Contador Regressivo (Timer)
    let timerInterval;
    let tempoTotalSegundos = 0;
    const timerDisplay = document.getElementById('timerDisplay');
    const btnIniciarTimer = document.getElementById('btnIniciarTimer');
    const btnPararTimer = document.getElementById('btnPararTimer');
    const btnResetTimer = document.getElementById('btnResetTimer');
    const inputMinutos = document.getElementById('minutos');
    const inputSegundos = document.getElementById('segundos');

    function atualizarDisplay() {
        const min = Math.floor(tempoTotalSegundos / 60);
        const seg = tempoTotalSegundos % 60;
        timerDisplay.textContent = `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
    }

    function iniciarTimer() {
        if (timerInterval) return; // Já está rodando

        tempoTotalSegundos = (Number(inputMinutos.value) * 60) + Number(inputSegundos.value);

        if (tempoTotalSegundos <= 0) {
            alert("Por favor, defina um tempo válido.");
            return;
        }

        btnIniciarTimer.disabled = true;
        btnPararTimer.disabled = false;
        inputMinutos.disabled = true;
        inputSegundos.disabled = true;

        timerInterval = setInterval(() => {
            tempoTotalSegundos--;
            atualizarDisplay();

            if (tempoTotalSegundos <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                timerDisplay.textContent = "TEMPO ESGOTADO! 🔔";
                alert("O tempo acabou!");
                btnIniciarTimer.disabled = false;
                btnPararTimer.disabled = true;
                inputMinutos.disabled = false;
                inputSegundos.disabled = false;
            }
        }, 1000);
    }

    function pararTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        btnIniciarTimer.disabled = false;
        btnPararTimer.disabled = true;
    }

    function resetarTimer() {
        pararTimer();
        // Recarrega o tempo dos inputs para o reset
        const minutosValor = inputMinutos.value.padStart(2, '0');
        const segundosValor = inputSegundos.value.padStart(2, '0');
        tempoTotalSegundos = (Number(minutosValor) * 60) + Number(segundosValor);
        atualizarDisplay();
        btnIniciarTimer.disabled = false;
        btnPararTimer.disabled = true;
        inputMinutos.disabled = false;
        inputSegundos.disabled = false;
        timerDisplay.textContent = `${minutosValor}:${segundosValor}`;
    }

    if (btnIniciarTimer) btnIniciarTimer.addEventListener('click', iniciarTimer);
    if (btnPararTimer) btnPararTimer.addEventListener('click', pararTimer);
    if (btnResetTimer) btnResetTimer.addEventListener('click', resetarTimer);
    
    // Configuração inicial do display
    if (timerDisplay && inputMinutos && inputSegundos) {
         timerDisplay.textContent = `${inputMinutos.value.padStart(2, '0')}:${inputSegundos.value.padStart(2, '0')}`;
    }

    // 11. Gerador de Senhas Aleatórias
    const btnGerarSenha = document.getElementById('btnGerarSenha');
    const btnCopiarSenha = document.getElementById('btnCopiarSenha');
    const senhaGeradaInput = document.getElementById('senhaGerada');

    function gerarSenha() {
        const tamanho = Number(document.getElementById('tamanhoSenha').value);
        const incluirMaiusculas = document.getElementById('incluirMaiusculas').checked;
        const incluirNumeros = document.getElementById('incluirNumeros').checked;
        const incluirSimbolos = document.getElementById('incluirSimbolos').checked;

        const caracteresMinusculos = 'abcdefghijklmnopqrstuvwxyz';
        const caracteresMaiusculos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const caracteresNumeros = '0123456789';
        const caracteresSimbolos = '!@#$%^&*()_+[]{}|;:,.<>?';

        let pool = caracteresMinusculos; // Minúsculas sempre incluídas
        if (incluirMaiusculas) pool += caracteresMaiusculos;
        if (incluirNumeros) pool += caracteresNumeros;
        if (incluirSimbolos) pool += caracteresSimbolos;

        if (pool.length === 0 || tamanho < 4) {
            alert("Defina um tamanho mínimo de 4 e selecione pelo menos um tipo de caractere.");
            return;
        }

        let senha = '';
        for (let i = 0; i < tamanho; i++) {
            const indiceAleatorio = Math.floor(Math.random() * pool.length);
            senha += pool[indiceAleatorio];
        }

        senhaGeradaInput.value = senha;
    }

    function copiarSenha() {
        if (senhaGeradaInput.value) {
            // Usa a API do Clipboard
            navigator.clipboard.writeText(senhaGeradaInput.value)
                .then(() => {
                    alert("Senha copiada para a área de transferência!");
                })
                .catch(err => {
                    console.error('Erro ao copiar: ', err);
                    alert("Falha ao copiar a senha. Tente novamente.");
                });
        }
    }

    if (btnGerarSenha) btnGerarSenha.addEventListener('click', gerarSenha);
    if (btnCopiarSenha) btnCopiarSenha.addEventListener('click', copiarSenha);

    // 12. Calculadora de Gorjeta
    const gorjetaResultadoDiv = document.getElementById('gorjetaResultado');
    const contaValorInput = document.getElementById('contaValor');
    const gorjetaPorcentagemInput = document.getElementById('gorjetaPorcentagem');
    const numPessoasInput = document.getElementById('numPessoas');

    window.calcularGorjeta = function() { // Tornada global para o oninput no HTML
        const contaValor = parseFloat(contaValorInput.value);
        const gorjetaPorcentagem = parseFloat(gorjetaPorcentagemInput.value);
        const numPessoas = parseInt(numPessoasInput.value);

        if (isNaN(contaValor) || contaValor <= 0 || isNaN(gorjetaPorcentagem) || isNaN(numPessoas) || numPessoas <= 0) {
            gorjetaResultadoDiv.innerHTML = "⚠️ Por favor, insira valores válidos e positivos.";
            return;
        }

        const gorjetaTotal = contaValor * (gorjetaPorcentagem / 100);
        const totalComGorjeta = contaValor + gorjetaTotal;
        const totalPorPessoa = totalComGorjeta / numPessoas;

        gorjetaResultadoDiv.innerHTML = `
            Gorjeta (${gorjetaPorcentagem}%): <strong>${formatCurrency(gorjetaTotal)}</strong><br>
            Total da Conta: <strong>${formatCurrency(totalComGorjeta)}</strong><br>
            Total por Pessoa (${numPessoas}x): <strong>${formatCurrency(totalPorPessoa)}</strong> 💵
        `;
    }

    // Chamada inicial (se os campos tiverem valores) e evento do botão 'Calcular'
    if (contaValorInput) {
        calcularGorjeta();
        document.getElementById('btnCalcularGorjeta').addEventListener('click', calcularGorjeta);
    }


    // 13. Mudança de Estilos Dinâmica (Editor de Estilos)
    const corTextoInput = document.getElementById('corTexto');
    const tamanhoFonteInput = document.getElementById('tamanhoFonte');
    const blocoExemplo = document.getElementById('blocoExemplo');

    function atualizarEstilos() {
        if (blocoExemplo) {
            blocoExemplo.style.color = corTextoInput.value;
            blocoExemplo.style.fontSize = `${tamanhoFonteInput.value}px`;
        }
    }

    if (corTextoInput) corTextoInput.addEventListener('input', atualizarEstilos);
    if (tamanhoFonteInput) tamanhoFonteInput.addEventListener('input', atualizarEstilos);

    // 14. Validador de Formulário Simples
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const senhaInput = document.getElementById('loginSenha');
    const emailError = document.getElementById('emailError');
    const senhaError = document.getElementById('senhaError');

    function validarEmail(email) {
        // Regex simples para validação de formato de e-mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarFormulario(e) {
        e.preventDefault(); 

        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        let formValido = true;

        // Limpar mensagens de erro
        emailError.textContent = '';
        senhaError.textContent = '';

        // Validação de Email
        if (email === '') {
            emailError.textContent = 'O email é obrigatório.';
            formValido = false;
        } else if (!validarEmail(email)) {
            emailError.textContent = 'Por favor, insira um formato de email válido.';
            formValido = false;
        }

        // Validação de Senha
        if (senha === '') {
            senhaError.textContent = 'A senha é obrigatória.';
            formValido = false;
        } else if (senha.length < 6) {
            senhaError.textContent = 'A senha deve ter no mínimo 6 caracteres.';
            formValido = false;
        }

        if (formValido) {
            alert(`Login bem-sucedido! Email: ${email}`);
            loginForm.reset();
        }
    }

    if (loginForm) loginForm.addEventListener('submit', validarFormulario);

}); // Fim do DOMContentLoaded


// 3. Jogo de Adivinhação (Funções globais)
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
let jogoEncerrado = false;

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

/**
 * Limpa os campos de input, o resultado do Cálculo de IMC e reabilita os elementos.
 */
window.limparImc = function() {
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const btnCalcular = document.getElementById('btnCalcularImc'); 

    pesoInput.value = '';
    alturaInput.value = '';
    document.getElementById('imcResultado').innerHTML = '';

    pesoInput.disabled = false;
    alturaInput.disabled = false;
    if (btnCalcular) {
      btnCalcular.disabled = false;
    }

    pesoInput.focus(); 
}
