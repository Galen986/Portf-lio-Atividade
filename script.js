// =======================================================================
// Lógica de Tema (Claro/Escuro) - CORRIGIDO
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
        themeToggleBtn.textContent = '☀️'; 
        themeToggleBtn.setAttribute('aria-pressed', 'true');
        themeColorMeta.setAttribute('content', DARK_THEME_COLOR);
    } else {
        // CORREÇÃO: Usando a constante correta (DARK_THEME_CLASS) para remoção
        body.classList.remove(DARK_THEME_CLASS);
        themeToggleBtn.textContent = '🌙'; 
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
// Funções Globais (Necessárias para chamadas 'onclick' no HTML)
// =======================================================================

// 3. Jogo de Adivinhação
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
 * Esta função precisa ser global (window.) pois é chamada via onclick no HTML.
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

    // =======================================================================
    // BUSCA GERAL DE CARDS (Filtro da Página)
    // =======================================================================
    const buscaListasInput = document.getElementById('busca-listas');
    const cards = document.querySelectorAll('.card');

    function filtrarCardsGeral() {
        const termo = buscaListasInput.value.toLowerCase().trim();

        cards.forEach(card => {
            const tituloElement = card.querySelector('h3');

            if (tituloElement) {
                const titulo = tituloElement.textContent.toLowerCase();

                if (titulo.includes(termo)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    if (buscaListasInput) {
        buscaListasInput.addEventListener('input', filtrarCardsGeral);
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

    // 6. Cálculo de IMC
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


    // 9. Lista de Tarefas Filtrável (Lógica de Renderização e Filtro Aprimorada)
    let tarefas = []; // Array que armazenará todas as tarefas como strings
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const filtroTodoInput = document.getElementById("filtroTodo");

    function renderizarTarefas() {
        if (!todoList) return;

        todoList.innerHTML = ''; // Limpa a lista na tela
        const termo = filtroTodoInput ? filtroTodoInput.value.toLowerCase().trim() : '';

        // Usamos map para criar um novo array de tarefas com seus índices originais
        const tarefasRenderizadas = tarefas.map((taskText, index) => ({ taskText, index }));

        // Filtra as tarefas que devem ser mostradas
        const tarefasFiltradas = tarefasRenderizadas.filter(item => {
            if (termo === '') return true;
            return item.taskText.toLowerCase().includes(termo);
        });

        if (tarefasFiltradas.length === 0) {
            todoList.innerHTML = '<li>Nenhuma tarefa para mostrar.</li>';
        }

        tarefasFiltradas.forEach(item => {
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
            span.textContent = item.taskText;
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

            // O listener remove a tarefa do array 'tarefas' usando o índice original
            deleteButton.addEventListener('click', function() {
                tarefas.splice(item.index, 1);
                // Re-renderiza tudo para atualizar os listeners de exclusão (que dependem dos índices)
                renderizarTarefas(); 
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }


    if (document.getElementById("todoForm")) {
        document.getElementById("todoForm").addEventListener("submit", function(e) {
            e.preventDefault();

            const taskText = todoInput.value.trim();

            if (taskText === "") {
                alert("Por favor, digite uma tarefa.");
                return;
            }

            tarefas.push(taskText);

            todoInput.value = '';
            todoInput.focus();

            renderizarTarefas();
        });
    }

    if (filtroTodoInput) {
        filtroTodoInput.addEventListener('input', renderizarTarefas);
        renderizarTarefas();
    }


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
        if (timerInterval) return;

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
        // Garante que o display volte ao valor inicial dos inputs
        const minutosValor = inputMinutos.value.padStart(2, '0');
        const segundosValor = inputSegundos.value.padStart(2, '0');
        tempoTotalSegundos = (Number(inputMinutos.value) * 60) + Number(inputSegundos.value);
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

        let pool = caracteresMinusculos;
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
            navigator.clipboard.writeText(senhaGeradaInput.value)
                .then(() => {
                    alert("Senha copiada para a área de transferência!");
                })
                .catch(err => {
                    console.error('Erro ao copiar: ', err);
                    // Uso de fallback para navegadores sem HTTPS ou permissões (Embora pouco comum hoje)
                    senhaGeradaInput.select();
                    document.execCommand('copy');
                    alert("Senha copiada (Fallback).");
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

    window.calcularGorjeta = function() {
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

    if (contaValorInput) {
        calcularGorjeta();
        const btnCalcularGorjeta = document.getElementById('btnCalcularGorjeta');
        if (btnCalcularGorjeta) btnCalcularGorjeta.addEventListener('click', calcularGorjeta);
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarFormulario(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        let formValido = true;

        emailError.textContent = '';
        senhaError.textContent = '';

        if (email === '') {
            emailError.textContent = 'O email é obrigatório.';
            formValido = false;
        } else if (!validarEmail(email)) {
            emailError.textContent = 'Por favor, insira um formato de email válido.';
            formValido = false;
        }

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


    // 15. Lista de Produtos Filtrável
    const filtroProdutoInput = document.getElementById('filtroProduto');
    const listaProdutosUL = document.getElementById('listaProdutos');

    const produtos = [
        { id: 1, nome: "Notebook Gamer", categoria: "Eletrônicos" },
        { id: 2, nome: "Mouse Óptico", categoria: "Acessórios" },
        { id: 3, nome: "Monitor 24 polegadas", categoria: "Eletrônicos" },
        { id: 4, nome: "Teclado Mecânico", categoria: "Acessórios" },
        { id: 5, nome: "Headset Pro", categoria: "Áudio" },
        { id: 6, nome: "Webcam HD", categoria: "Acessórios" }
    ];

    function renderizarProdutos(lista) {
        if (!listaProdutosUL) return;

        listaProdutosUL.innerHTML = '';

        if (lista.length === 0) {
            listaProdutosUL.innerHTML = '<li>Nenhum produto encontrado.</li>';
            return;
        }

        lista.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} (${produto.categoria})`;
            listaProdutosUL.appendChild(li);
        });
    }

    function filtrarProdutos() {
        if (!filtroProdutoInput) return;
        const termo = filtroProdutoInput.value.toLowerCase().trim();

        const produtosFiltrados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(termo)
        );

        renderizarProdutos(produtosFiltrados);
    }

    if (filtroProdutoInput) {
        filtroProdutoInput.addEventListener('input', filtrarProdutos);
        renderizarProdutos(produtos);
    }


    // 16. Calculadora de Média (Lógica de Renderização e Remoção Aprimorada)
    let notas = [];
    const notaForm = document.getElementById('notaForm');
    const notaInput = document.getElementById('notaInput');
    const listaNotasUL = document.getElementById('listaNotas');
    const mediaResultadoStrong = document.getElementById('mediaResultado');

    function calcularMedia() {
        if (!mediaResultadoStrong) return;
        if (notas.length === 0) {
            mediaResultadoStrong.textContent = '0.0';
            return;
        }
        const soma = notas.reduce((acc, nota) => acc + nota, 0);
        const media = (soma / notas.length).toFixed(1);
        mediaResultadoStrong.textContent = media;
    }

    function renderizarNotas() {
        if (!listaNotasUL) return;

        listaNotasUL.innerHTML = '';
        // Usamos forEach no array de notas para garantir que os índices correspondam ao array
        notas.forEach((nota, index) => { 
            const li = document.createElement('li');
            li.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 0;
                border-bottom: 1px dotted var(--color-border);
            `;
            li.textContent = `Nota: ${nota}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.style.cssText = `
                background-color: #dc3545;
                color: white;
                border: none;
                padding: 3px 8px;
                cursor: pointer;
                border-radius: 3px;
                font-size: 0.8rem;
            `;

            // O listener remove a nota do array 'notas' pelo ÍNDICE
            removeButton.addEventListener('click', () => {
                notas.splice(index, 1); 
                renderizarNotas(); // Re-renderiza a lista (os índices serão recalculados)
            });

            li.appendChild(removeButton);
            listaNotasUL.appendChild(li);
        });
        calcularMedia();
    }

    if (notaForm) {
        notaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nota = parseFloat(notaInput.value);

            if (isNaN(nota) || nota < 0 || nota > 10) {
                alert("Por favor, insira uma nota válida entre 0 e 10.");
                return;
            }

            notas.push(nota);
            notaInput.value = '';
            notaInput.focus();

            renderizarNotas();
        });
    }
    // Renderiza a lista inicial
    renderizarNotas();


    // 17. Gerador de Cores Aleatórias (RGB)
    const btnGerarCor = document.getElementById('btnGerarCor');
    const corBox = document.getElementById('corBox');
    const codigoCorP = document.getElementById('codigoCor');

    function gerarCorAleatoria() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        const corRGB = `rgb(${r}, ${g}, ${b})`;

        // Cálculo de Luminância para garantir contraste de texto (0.299R + 0.587G + 0.114B)
        const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const corTexto = (luminancia > 0.5) ? '#333333' : '#ffffff';

        if (corBox && codigoCorP) {
            corBox.style.backgroundColor = corRGB;
            codigoCorP.textContent = corRGB.toUpperCase();
            codigoCorP.style.color = corTexto;
        }
    }

    if (btnGerarCor) {
        btnGerarCor.addEventListener('click', gerarCorAleatoria);
        gerarCorAleatoria(); // Gera uma cor inicial
    }


    // 18. Conversor de Unidades (Dropdown/Select)
    const btnConverterUnidade = document.getElementById('btnConverterUnidade');
    const tipoConversaoSelect = document.getElementById('tipoConversao');
    const valorOriginalInput = document.getElementById('valorOriginal');
    const conversaoResultadoDiv = document.getElementById('conversaoResultado');

    function converterUnidade() {
        if (!tipoConversaoSelect || !valorOriginalInput) return;
        const tipo = tipoConversaoSelect.value;
        const valor = parseFloat(valorOriginalInput.value);

        if (isNaN(valor)) {
            conversaoResultadoDiv.innerHTML = "⚠️ Por favor, insira um valor numérico válido.";
            return;
        }

        let resultado;
        let unidadeOriginal;
        let unidadeConvertida;
        const fatorKmMi = 0.621371;
        const fatorLGal = 0.264172;

        switch(tipo) {
            case 'km_mi':
                resultado = (valor * fatorKmMi).toFixed(3);
                unidadeOriginal = 'Km';
                unidadeConvertida = 'Milhas';
                break;
            case 'l_gal':
                resultado = (valor * fatorLGal).toFixed(3);
                unidadeOriginal = 'Litros';
                unidadeConvertida = 'Galões (EUA)';
                break;
            default:
                conversaoResultadoDiv.innerHTML = "Erro na seleção de conversão.";
                return;
        }

        conversaoResultadoDiv.innerHTML = `
            ${valor} ${unidadeOriginal} é igual a: <strong style="color: var(--color-primary);">${resultado} ${unidadeConvertida}</strong>.
        `;
    }

    if (btnConverterUnidade) {
        btnConverterUnidade.addEventListener('click', converterUnidade);
        tipoConversaoSelect.addEventListener('change', converterUnidade);
        valorOriginalInput.addEventListener('input', converterUnidade);

        converterUnidade();
    }


    // 19. Contador de Caracteres e Palavras
    const textoInput = document.getElementById('textoInput');
    const contadorCaracteresStrong = document.getElementById('contadorCaracteres');
    const contadorPalavrasStrong = document.getElementById('contadorPalavras');

    function contarTexto() {
        if (!textoInput) return;

        const texto = textoInput.value;

        contadorCaracteresStrong.textContent = texto.length;

        // Divide o texto por um ou mais espaços/quebras de linha e remove entradas vazias (filter)
        const palavras = texto.trim().split(/\s+/).filter(word => word.length > 0);

        if (texto.trim() === "") {
            contadorPalavrasStrong.textContent = 0;
        } else {
            contadorPalavrasStrong.textContent = palavras.length;
        }
    }

    if (textoInput) {
        textoInput.addEventListener('input', contarTexto);
        contarTexto(); // Conta ao carregar (se houver texto inicial)
    }

// 20. Calculadora de Mercado
    let itensMercado = [];
    const mercadoForm = document.getElementById('mercadoForm');
    const produtoNome = document.getElementById('produtoNome');
    const produtoQtd = document.getElementById('produtoQtd');
    const produtoValor = document.getElementById('produtoValor');
    const listaMercado = document.getElementById('listaMercado');
    const descontoMercado = document.getElementById('descontoMercado');
    const totalMercadoDiv = document.getElementById('totalMercado');

    function renderizarMercado() {
        if (!listaMercado) return;
        listaMercado.innerHTML = '';
        let subtotal = 0;

        if(itensMercado.length === 0){
            listaMercado.innerHTML = '<li>Nenhum item adicionado.</li>';
        }

        itensMercado.forEach((item, index) => {
            const itemTotal = item.qtd * item.valor;
            subtotal += itemTotal;

            const li = document.createElement('li');
            li.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px dashed var(--color-border);
            `;
            li.innerHTML = `
                <span>${item.nome} - ${item.qtd}x ${formatCurrency(item.valor)} = <strong>${formatCurrency(itemTotal)}</strong></span>
                <button style="background-color: #dc3545; padding: 4px 8px; font-size: 0.8rem;" onclick="removerItemMercado(${index})">Remover</button>
            `;
            listaMercado.appendChild(li);
        });

        calcularTotalMercado(subtotal);
    }

    window.removerItemMercado = function(index) {
        itensMercado.splice(index, 1);
        renderizarMercado();
    }

    window.calcularTotalMercado = function(subtotal = 0) {
        if(itensMercado.length > 0 && subtotal === 0){
            subtotal = itensMercado.reduce((acc, item) => acc + (item.qtd * item.valor), 0);
        }
        
        const descontoPerc = parseFloat(descontoMercado.value) || 0;
        const valorDesconto = subtotal * (descontoPerc / 100);
        const totalFinal = subtotal - valorDesconto;

        totalMercadoDiv.innerHTML = `
            Subtotal: ${formatCurrency(subtotal)}<br>
            Desconto (${descontoPerc}%): -${formatCurrency(valorDesconto)}<br>
            <strong>Total: ${formatCurrency(totalFinal)}</strong> 🛒
        `;
    }

    if (mercadoForm) {
        mercadoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = produtoNome.value.trim();
            const qtd = parseFloat(produtoQtd.value);
            const valor = parseFloat(produtoValor.value);

            if (nome === '' || isNaN(qtd) || qtd <= 0 || isNaN(valor) || valor < 0) {
                alert("Por favor, preencha nome, quantidade e valor válidos.");
                return;
            }

            itensMercado.push({ nome, qtd, valor });

            produtoNome.value = '';
            produtoQtd.value = '1';
            produtoValor.value = '';
            produtoNome.focus();

            renderizarMercado();
        });
    }

    // Atualiza total quando muda desconto
    if(descontoMercado) descontoMercado.addEventListener('input', () => calcularTotalMercado());

    renderizarMercado(); // Carrega inicial

// 21. Calculadora de Rateio de Contas
    let pessoasRateio = [];
    const rateioForm = document.getElementById('rateioForm');
    const nomePessoa = document.getElementById('nomePessoa');
    const porcentagemPessoa = document.getElementById('porcentagemPessoa');
    const valorConta = document.getElementById('valorConta');
    const listaPessoas = document.getElementById('listaPessoas');
    const resultadoRateio = document.getElementById('resultadoRateio');
    const avisoRateio = document.getElementById('avisoRateio');

    function renderizarRateio() {
        if (!listaPessoas) return;
        listaPessoas.innerHTML = '';
        let totalPorcentagem = 0;

        if(pessoasRateio.length === 0){
            listaPessoas.innerHTML = '<li>Nenhuma pessoa adicionada.</li>';
        }

        pessoasRateio.forEach((pessoa, index) => {
            totalPorcentagem += pessoa.porcentagem;

            const li = document.createElement('li');
            li.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px dashed var(--color-border);
            `;
            li.innerHTML = `
                <span><strong>${pessoa.nome}</strong> - ${pessoa.porcentagem}%</span>
                <button style="background-color: #dc3545; padding: 4px 8px; font-size: 0.8rem;" onclick="removerPessoaRateio(${index})">Remover</button>
            `;
            listaPessoas.appendChild(li);
        });

        // Aviso se a soma não dá 100%
        if(totalPorcentagem !== 100 && pessoasRateio.length > 0){
            avisoRateio.textContent = `Atenção: A soma das % está em ${totalPorcentagem}%. O ideal é 100%.`;
        } else {
            avisoRateio.textContent = '';
        }

        calcularRateio();
    }

    window.removerPessoaRateio = function(index) {
        pessoasRateio.splice(index, 1);
        renderizarRateio();
    }

    window.calcularRateio = function() {
        const valorTotal = parseFloat(valorConta.value) || 0;
        
        if(pessoasRateio.length === 0 || valorTotal <= 0){
            resultadoRateio.innerHTML = "Adicione pessoas e um valor para calcular.";
            return;
        }

        let htmlResultado = '';
        pessoasRateio.forEach(pessoa => {
            const valorPessoa = valorTotal * (pessoa.porcentagem / 100);
            htmlResultado += `${pessoa.nome}: <strong>${formatCurrency(valorPessoa)}</strong> (${pessoa.porcentagem}%)<br>`;
        });

        resultadoRateio.innerHTML = htmlResultado;
    }

    if (rateioForm) {
        rateioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = nomePessoa.value.trim();
            const porcentagem = parseFloat(porcentagemPessoa.value);

            if (nome === '' || isNaN(porcentagem) || porcentagem <= 0) {
                alert("Por favor, preencha nome e % válida.");
                return;
            }

            pessoasRateio.push({ nome, porcentagem });

            nomePessoa.value = '';
            porcentagemPessoa.value = '25';
            nomePessoa.focus();

            renderizarRateio();
        });
    }

    if(valorConta) valorConta.addEventListener('input', calcularRateio);

    renderizarRateio();

}); // Fim do DOMContentLoaded
