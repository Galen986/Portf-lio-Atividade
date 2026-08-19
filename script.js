/* =========================================================
   DESAFIOS JS INTERATIVOS
   GUILHERME - MINI-APLICAÇÕES JS
   27 DESAFIOS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. DIA DA SEMANA
       ===================================================== */

    const formDia = document.getElementById("form");

    if (formDia) {
        formDia.addEventListener("submit", (e) => {
            e.preventDefault();

            const campo = document.getElementById("day");
            const dia = campo.value.trim().toLowerCase();

            let mensagem = "";

            const dias = {
                domingo: "Hoje é Domingo! ☀️",
                segunda: "Hoje é Segunda-feira! 📅",
                "segunda-feira": "Hoje é Segunda-feira! 📅",
                terca: "Hoje é Terça-feira! 📅",
                terça: "Hoje é Terça-feira! 📅",
                "terça-feira": "Hoje é Terça-feira! 📅",
                quarta: "Hoje é Quarta-feira! 📅",
                "quarta-feira": "Hoje é Quarta-feira! 📅",
                quinta: "Hoje é Quinta-feira! 📅",
                "quinta-feira": "Hoje é Quinta-feira! 📅",
                sexta: "Hoje é Sexta-feira! 📅",
                "sexta-feira": "Hoje é Sexta-feira! 📅",
                sabado: "Hoje é Sábado! 🎉",
                sábado: "Hoje é Sábado! 🎉"
            };

            if (dias[dia]) {
                mensagem = dias[dia];
            } else {
                mensagem = "Digite um dia da semana válido.";
            }

            mostrarResultado(formDia, mensagem);
        });
    }


    /* =====================================================
       2. POSITIVO OU NEGATIVO
       ===================================================== */

    const numberForm = document.getElementById("numberForm");

    if (numberForm) {
        numberForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const valor = Number(document.getElementById("number").value);

            if (document.getElementById("number").value === "") {
                mostrarResultado(numberForm, "Digite um número.");
                return;
            }

            if (valor > 0) {
                mostrarResultado(numberForm, "O número é positivo. 🟢");
            } else if (valor < 0) {
                mostrarResultado(numberForm, "O número é negativo. 🔴");
            } else {
                mostrarResultado(numberForm, "O número é zero. ⚪");
            }
        });
    }


    /* =====================================================
       3. JOGO DE ADIVINHAÇÃO
       ===================================================== */

    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let tentativas = 0;

    window.adivinhar = function () {

        const campo = document.getElementById("palpite");
        const mensagem = document.getElementById("mensagem");

        if (!campo || !mensagem) return;

        const palpite = Number(campo.value);

        if (!palpite || palpite < 1 || palpite > 100) {
            mensagem.textContent = "Digite um número entre 1 e 100.";
            return;
        }

        tentativas++;

        if (palpite === numeroSecreto) {
            mensagem.textContent =
                `🎉 Acertou! O número era ${numeroSecreto}. Tentativas: ${tentativas}`;
        } else if (palpite < numeroSecreto) {
            mensagem.textContent = "⬆️ Tente um número maior!";
        } else {
            mensagem.textContent = "⬇️ Tente um número menor!";
        }
    };

    window.reiniciar = function () {
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        tentativas = 0;

        const campo = document.getElementById("palpite");
        const mensagem = document.getElementById("mensagem");

        if (campo) campo.value = "";
        if (mensagem) mensagem.textContent = "Novo jogo iniciado! 🎮";
    };


    /* =====================================================
       4. SALDO ATUAL
       ===================================================== */

    const balanceForm = document.getElementById("balanceForm");

    if (balanceForm) {
        balanceForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const campo = document.getElementById("balance");
            const valor = Number(campo.value);

            if (campo.value === "") {
                mostrarResultado(balanceForm, "Digite seu saldo.");
                return;
            }

            mostrarResultado(
                balanceForm,
                `💰 Seu saldo atual é ${formatarMoeda(valor)}`
            );
        });
    }


    /* =====================================================
       5. BOAS-VINDAS
       ===================================================== */

    const nameForm = document.getElementById("nameForm");

    if (nameForm) {
        nameForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("name").value.trim();

            if (!nome) {
                mostrarResultado(nameForm, "Digite seu nome.");
                return;
            }

            mostrarResultado(
                nameForm,
                `👋 Olá, ${nome}! Seja bem-vindo(a)!`
            );
        });
    }


    /* =====================================================
       6. IMC
       ===================================================== */

    const imcForm = document.getElementById("imcForm");

    if (imcForm) {
        imcForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const peso = Number(document.getElementById("peso").value);
            const altura = Number(document.getElementById("altura").value);
            const resultado = document.getElementById("imcResultado");

            if (peso <= 0 || altura <= 0) {
                resultado.textContent = "Digite peso e altura válidos.";
                return;
            }

            const imc = peso / (altura * altura);

            let classificacao;

            if (imc < 18.5) {
                classificacao = "Abaixo do peso";
            } else if (imc < 25) {
                classificacao = "Peso normal";
            } else if (imc < 30) {
                classificacao = "Sobrepeso";
            } else if (imc < 35) {
                classificacao = "Obesidade grau I";
            } else if (imc < 40) {
                classificacao = "Obesidade grau II";
            } else {
                classificacao = "Obesidade grau III";
            }

            resultado.innerHTML =
                `📊 IMC: <strong>${imc.toFixed(2)}</strong><br>
                 Classificação: <strong>${classificacao}</strong>`;
        });
    }

    window.limparImc = function () {
        const peso = document.getElementById("peso");
        const altura = document.getElementById("altura");
        const resultado = document.getElementById("imcResultado");

        if (peso) peso.value = "";
        if (altura) altura.value = "";
        if (resultado) resultado.innerHTML = "";
    };


    /* =====================================================
       7. CONVERSOR CELSIUS / FAHRENHEIT
       ===================================================== */

    const tempForm = document.getElementById("tempForm");

    if (tempForm) {
        tempForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const campo = document.getElementById("celsius");
            const resultado = document.getElementById("tempResultado");

            const celsius = Number(campo.value);

            if (campo.value === "") {
                resultado.textContent = "Digite uma temperatura.";
                return;
            }

            const fahrenheit = (celsius * 9 / 5) + 32;

            resultado.textContent =
                `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
        });
    }


    /* =====================================================
       8. CONTADOR DE CLIQUES
       ===================================================== */

    let contadorCliques = 0;

    const btnContador = document.getElementById("btnContador");
    const btnResetContador = document.getElementById("btnResetContador");
    const contadorElemento = document.getElementById("contadorCliques");

    if (btnContador) {
        btnContador.addEventListener("click", () => {
            contadorCliques++;
            contadorElemento.textContent = contadorCliques;
        });
    }

    if (btnResetContador) {
        btnResetContador.addEventListener("click", () => {
            contadorCliques = 0;
            contadorElemento.textContent = contadorCliques;
        });
    }


    /* =====================================================
       9. LISTA DE TAREFAS
       ===================================================== */

    const todoForm = document.getElementById("todoForm");
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const filtroTodo = document.getElementById("filtroTodo");

    let tarefas = [];

    function renderizarTarefas() {

        if (!todoList) return;

        const filtro = filtroTodo
            ? filtroTodo.value.toLowerCase()
            : "";

        todoList.innerHTML = "";

        tarefas
            .filter(tarefa =>
                tarefa.texto.toLowerCase().includes(filtro)
            )
            .forEach((tarefa, index) => {

                const li = document.createElement("li");

                li.style.marginBottom = "8px";

                li.innerHTML = `
                    <span style="text-decoration:${tarefa.feita ? "line-through" : "none"}">
                        ${escapeHTML(tarefa.texto)}
                    </span>
                    <button type="button" data-index="${index}">
                        ${tarefa.feita ? "↩️" : "✅"}
                    </button>
                    <button type="button" data-delete="${index}">
                        🗑️
                    </button>
                `;

                todoList.appendChild(li);
            });
    }

    if (todoForm) {
        todoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const texto = todoInput.value.trim();

            if (!texto) return;

            tarefas.push({
                texto,
                feita: false
            });

            todoInput.value = "";

            renderizarTarefas();
        });
    }

    if (todoList) {
        todoList.addEventListener("click", (e) => {

            const index = e.target.dataset.index;
            const apagar = e.target.dataset.delete;

            if (index !== undefined) {
                tarefas[index].feita = !tarefas[index].feita;
                renderizarTarefas();
            }

            if (apagar !== undefined) {
                tarefas.splice(apagar, 1);
                renderizarTarefas();
            }
        });
    }

    if (filtroTodo) {
        filtroTodo.addEventListener("input", renderizarTarefas);
    }


    /* =====================================================
       10. CONTADOR REGRESSIVO
       ===================================================== */

    let timerInterval = null;
    let tempoRestante = 60;

    const btnIniciarTimer = document.getElementById("btnIniciarTimer");
    const btnPararTimer = document.getElementById("btnPararTimer");
    const btnResetTimer = document.getElementById("btnResetTimer");
    const timerDisplay = document.getElementById("timerDisplay");

    function atualizarTimer() {

        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;

        if (timerDisplay) {
            timerDisplay.textContent =
                `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
        }
    }

    if (btnIniciarTimer) {
        btnIniciarTimer.addEventListener("click", () => {

            if (timerInterval) return;

            const minutos = Number(document.getElementById("minutos").value);
            const segundos = Number(document.getElementById("segundos").value);

            if (tempoRestante <= 0) {
                tempoRestante = minutos * 60 + segundos;
            }

            if (tempoRestante <= 0) return;

            btnPararTimer.disabled = false;

            timerInterval = setInterval(() => {

                tempoRestante--;

                atualizarTimer();

                if (tempoRestante <= 0) {

                    clearInterval(timerInterval);
                    timerInterval = null;

                    btnPararTimer.disabled = true;

                    alert("⏰ Tempo encerrado!");
                }

            }, 1000);
        });
    }

    if (btnPararTimer) {
        btnPararTimer.addEventListener("click", () => {

            clearInterval(timerInterval);
            timerInterval = null;

            btnPararTimer.disabled = true;
        });
    }

    if (btnResetTimer) {
        btnResetTimer.addEventListener("click", () => {

            clearInterval(timerInterval);
            timerInterval = null;

            const minutos = Number(document.getElementById("minutos").value) || 0;
            const segundos = Number(document.getElementById("segundos").value) || 0;

            tempoRestante = minutos * 60 + segundos;

            atualizarTimer();

            if (btnPararTimer) {
                btnPararTimer.disabled = true;
            }
        });
    }

    atualizarTimer();


    /* =====================================================
       11. GERADOR DE SENHAS
       ===================================================== */

    const btnGerarSenha = document.getElementById("btnGerarSenha");
    const btnCopiarSenha = document.getElementById("btnCopiarSenha");

    if (btnGerarSenha) {
        btnGerarSenha.addEventListener("click", gerarSenha);
    }

    function gerarSenha() {

        const tamanho = Number(document.getElementById("tamanhoSenha").value);
        const maiusculas = document.getElementById("incluirMaiusculas").checked;
        const numeros = document.getElementById("incluirNumeros").checked;
        const simbolos = document.getElementById("incluirSimbolos").checked;

        let caracteres = "abcdefghijklmnopqrstuvwxyz";

        if (maiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numeros) caracteres += "0123456789";
        if (simbolos) caracteres += "!@#$%&*+-=?";

        if (tamanho < 4 || tamanho > 20) {
            alert("Escolha um tamanho entre 4 e 20.");
            return;
        }

        if (!caracteres) {
            alert("Escolha pelo menos uma opção.");
            return;
        }

        let senha = "";

        for (let i = 0; i < tamanho; i++) {
            senha += caracteres[
                Math.floor(Math.random() * caracteres.length)
            ];
        }

        document.getElementById("senhaGerada").value = senha;
    }

    if (btnCopiarSenha) {
        btnCopiarSenha.addEventListener("click", async () => {

            const campo = document.getElementById("senhaGerada");

            if (!campo.value) {
                alert("Gere uma senha primeiro.");
                return;
            }

            try {
                await navigator.clipboard.writeText(campo.value);
                alert("Senha copiada! 📋");
            } catch {
                campo.select();
                document.execCommand("copy");
                alert("Senha copiada! 📋");
            }
        });
    }


    /* =====================================================
       12. CALCULADORA DE GORJETA
       ===================================================== */

    window.calcularGorjeta = function () {

        const conta = Number(document.getElementById("contaValor").value) || 0;
        const porcentagem = Number(document.getElementById("gorjetaPorcentagem").value) || 0;
        const pessoas = Number(document.getElementById("numPessoas").value) || 1;

        const resultado = document.getElementById("gorjetaResultado");

        if (!resultado) return;

        const valorGorjeta = conta * porcentagem / 100;
        const total = conta + valorGorjeta;
        const porPessoa = total / Math.max(1, pessoas);

        resultado.innerHTML = `
            Gorjeta: <strong>${formatarMoeda(valorGorjeta)}</strong><br>
            Total: <strong>${formatarMoeda(total)}</strong><br>
            Por pessoa: <strong>${formatarMoeda(porPessoa)}</strong>
        `;
    };

    const btnGorjeta = document.getElementById("btnCalcularGorjeta");

    if (btnGorjeta) {
        btnGorjeta.addEventListener("click", calcularGorjeta);
    }

    calcularGorjeta();


    /* =====================================================
       13. EDITOR DE ESTILOS
       ===================================================== */

    const corTexto = document.getElementById("corTexto");
    const tamanhoFonte = document.getElementById("tamanhoFonte");
    const blocoExemplo = document.getElementById("blocoExemplo");

    if (corTexto && blocoExemplo) {
        corTexto.addEventListener("input", () => {
            blocoExemplo.style.color = corTexto.value;
        });
    }

    if (tamanhoFonte && blocoExemplo) {
        tamanhoFonte.addEventListener("input", () => {
            blocoExemplo.style.fontSize = `${tamanhoFonte.value}px`;
        });
    }


    /* =====================================================
       14. VALIDADOR DE LOGIN
       ===================================================== */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const senha = document.getElementById("loginSenha").value;

            const emailError = document.getElementById("emailError");
            const senhaError = document.getElementById("senhaError");

            emailError.textContent = "";
            senhaError.textContent = "";

            let valido = true;

            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!emailValido) {
                emailError.textContent = "Digite um e-mail válido.";
                valido = false;
            }

            if (senha.length < 6) {
                senhaError.textContent =
                    "A senha deve ter pelo menos 6 caracteres.";
                valido = false;
            }

            if (valido) {
                alert("✅ Login validado com sucesso!");
            }
        });
    }


    /* =====================================================
       15. CATÁLOGO DE PRODUTOS
       ===================================================== */

    const listaProdutos = document.getElementById("listaProdutos");
    const filtroProduto = document.getElementById("filtroProduto");

    const produtos = [
        "Arroz",
        "Feijão",
        "Macarrão",
        "Leite",
        "Café",
        "Açúcar",
        "Bolacha",
        "Pão",
        "Queijo",
        "Carne",
        "Frango",
        "Sabonete",
        "Shampoo",
        "Detergente"
    ];

    function renderizarProdutos() {

        if (!listaProdutos) return;

        const filtro = filtroProduto
            ? filtroProduto.value.toLowerCase()
            : "";

        listaProdutos.innerHTML = "";

        produtos
            .filter(produto =>
                produto.toLowerCase().includes(filtro)
            )
            .forEach(produto => {

                const li = document.createElement("li");
                li.textContent = produto;

                listaProdutos.appendChild(li);
            });
    }

    if (filtroProduto) {
        filtroProduto.addEventListener("input", renderizarProdutos);
    }

    renderizarProdutos();


    /* =====================================================
       16. CALCULADORA DE MÉDIA
       ===================================================== */

    const notaForm = document.getElementById("notaForm");
    const notaInput = document.getElementById("notaInput");

    let notas = [];

    function atualizarMedia() {

        const listaNotas = document.getElementById("listaNotas");
        const mediaResultado = document.getElementById("mediaResultado");

        if (!listaNotas || !mediaResultado) return;

        listaNotas.innerHTML = "";

        notas.forEach((nota, index) => {

            const li = document.createElement("li");

            li.innerHTML = `
                Nota ${index + 1}: <strong>${nota.toFixed(1)}</strong>
                <button type="button" data-nota="${index}">🗑️</button>
            `;

            listaNotas.appendChild(li);
        });

        if (notas.length === 0) {
            mediaResultado.textContent = "0.0";
            return;
        }

        const soma = notas.reduce((total, nota) => total + nota, 0);
        const media = soma / notas.length;

        mediaResultado.textContent = media.toFixed(1);
    }

    if (notaForm) {
        notaForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const valor = Number(notaInput.value);

            if (Number.isNaN(valor) || valor < 0 || valor > 10) {
                alert("Digite uma nota entre 0 e 10.");
                return;
            }

            notas.push(valor);
            notaInput.value = "";

            atualizarMedia();
        });
    }

    const listaNotasElemento = document.getElementById("listaNotas");

    if (listaNotasElemento) {
        listaNotasElemento.addEventListener("click", (e) => {

            const index = e.target.dataset.nota;

            if (index !== undefined) {
                notas.splice(index, 1);
                atualizarMedia();
            }
        });
    }


    /* =====================================================
       17. GERADOR DE CORES RGB
       ===================================================== */

    const btnGerarCor = document.getElementById("btnGerarCor");

    if (btnGerarCor) {

        btnGerarCor.addEventListener("click", () => {

            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            const rgb = `rgb(${r}, ${g}, ${b})`;

            const corBox = document.getElementById("corBox");
            const codigoCor = document.getElementById("codigoCor");

            corBox.style.backgroundColor = rgb;

            codigoCor.textContent =
                `RGB(${r}, ${g}, ${b})`;

            const brilho = (r * 299 + g * 587 + b * 114) / 1000;

            codigoCor.style.color =
                brilho > 128 ? "#000000" : "#ffffff";
        });
    }


    /* =====================================================
       18. CONVERSOR DE UNIDADES
       ===================================================== */

    const btnConverterUnidade =
        document.getElementById("btnConverterUnidade");

    if (btnConverterUnidade) {

        btnConverterUnidade.addEventListener("click", () => {

            const tipo =
                document.getElementById("tipoConversao").value;

            const valor =
                Number(document.getElementById("valorOriginal").value);

            const resultado =
                document.getElementById("conversaoResultado");

            if (Number.isNaN(valor)) {
                resultado.textContent = "Digite um valor válido.";
                return;
            }

            if (tipo === "km_mi") {

                const milhas = valor * 0.621371;

                resultado.textContent =
                    `${valor} km = ${milhas.toFixed(2)} milhas`;

            } else if (tipo === "l_gal") {

                const galoes = valor * 0.264172;

                resultado.textContent =
                    `${valor} L = ${galoes.toFixed(2)} galões`;
            }
        });
    }


    /* =====================================================
       19. CONTADOR DE TEXTO
       ===================================================== */

    const textoInput = document.getElementById("textoInput");

    if (textoInput) {

        textoInput.addEventListener("input", () => {

            const texto = textoInput.value;

            const caracteres =
                document.getElementById("contadorCaracteres");

            const palavras =
                document.getElementById("contadorPalavras");

            caracteres.textContent = texto.length;

            const listaPalavras =
                texto.trim()
                    ? texto.trim().split(/\s+/)
                    : [];

            palavras.textContent = listaPalavras.length;
        });
    }


    /* =====================================================
       20. CALCULADORA DE MERCADO
       ===================================================== */

    const mercadoForm = document.getElementById("mercadoForm");

    let produtosMercado = [];

    function calcularTotalMercadoInterno() {

        const desconto =
            Number(document.getElementById("descontoMercado").value) || 0;

        const lista =
            document.getElementById("listaMercado");

        const totalElemento =
            document.getElementById("totalMercado");

        let subtotal = 0;

        if (lista) {
            lista.innerHTML = "";

            produtosMercado.forEach((produto, index) => {

                const totalProduto =
                    produto.quantidade * produto.valor;

                subtotal += totalProduto;

                const li = document.createElement("li");

                li.innerHTML = `
                    ${escapeHTML(produto.nome)}
                    — ${produto.quantidade} × ${formatarMoeda(produto.valor)}
                    = <strong>${formatarMoeda(totalProduto)}</strong>
                    <button type="button" data-mercado="${index}">
                        🗑️
                    </button>
                `;

                lista.appendChild(li);
            });
        }

        const valorDesconto =
            subtotal * Math.min(100, Math.max(0, desconto)) / 100;

        const total = subtotal - valorDesconto;

        if (totalElemento) {
            totalElemento.innerHTML = `
                Subtotal: ${formatarMoeda(subtotal)}<br>
                Desconto: ${formatarMoeda(valorDesconto)}<br>
                <strong>Total: ${formatarMoeda(total)}</strong>
            `;
        }
    }

    window.calcularTotalMercado = calcularTotalMercadoInterno;

    if (mercadoForm) {

        mercadoForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const nome =
                document.getElementById("produtoNome").value.trim();

            const quantidade =
                Number(document.getElementById("produtoQtd").value);

            const valor =
                Number(document.getElementById("produtoValor").value);

            if (!nome || quantidade <= 0 || valor < 0) {
                alert("Preencha os dados do produto corretamente.");
                return;
            }

            produtosMercado.push({
                nome,
                quantidade,
                valor
            });

            document.getElementById("produtoNome").value = "";
            document.getElementById("produtoQtd").value = "1";
            document.getElementById("produtoValor").value = "";

            calcularTotalMercadoInterno();
        });
    }

    const listaMercado =
        document.getElementById("listaMercado");

    if (listaMercado) {

        listaMercado.addEventListener("click", (e) => {

            const index = e.target.dataset.mercado;

            if (index !== undefined) {
                produtosMercado.splice(index, 1);
                calcularTotalMercadoInterno();
            }
        });
    }


    /* =====================================================
       21. RATEIO DE CONTAS
       ===================================================== */

    const rateioForm = document.getElementById("rateioForm");

    let pessoasRateio = [];

    function calcularRateioInterno() {

        const valorConta =
            Number(document.getElementById("valorConta").value) || 0;

        const lista =
            document.getElementById("listaPessoas");

        const resultado =
            document.getElementById("resultadoRateio");

        const aviso =
            document.getElementById("avisoRateio");

        if (!lista || !resultado) return;

        lista.innerHTML = "";

        let porcentagemTotal = 0;

        pessoasRateio.forEach((pessoa, index) => {

            porcentagemTotal += pessoa.porcentagem;

            const valorPessoa =
                valorConta * pessoa.porcentagem / 100;

            const li = document.createElement("li");

            li.innerHTML = `
                ${escapeHTML(pessoa.nome)}
                — ${pessoa.porcentagem}%
                = <strong>${formatarMoeda(valorPessoa)}</strong>
                <button type="button" data-rateio="${index}">
                    🗑️
                </button>
            `;

            lista.appendChild(li);
        });

        const valorDistribuido =
            valorConta * porcentagemTotal / 100;

        resultado.innerHTML = `
            Porcentagem distribuída:
            <strong>${porcentagemTotal}%</strong><br>
            Total distribuído:
            <strong>${formatarMoeda(valorDistribuido)}</strong>
        `;

        if (aviso) {

            if (porcentagemTotal > 100) {
                aviso.textContent =
                    "⚠️ A porcentagem ultrapassou 100%.";
            } else if (porcentagemTotal < 100) {
                aviso.textContent =
                    `Faltam ${100 - porcentagemTotal}% para completar 100%.`;
            } else {
                aviso.textContent =
                    "✅ Rateio completo: 100%.";
            }
        }
    }

    window.calcularRateio = calcularRateioInterno;

    if (rateioForm) {

        rateioForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const nome =
                document.getElementById("nomePessoa").value.trim();

            const porcentagem =
                Number(document.getElementById("porcentagemPessoa").value);

            if (!nome || porcentagem <= 0 || porcentagem > 100) {
                alert("Digite nome e porcentagem válida.");
                return;
            }

            const atual =
                pessoasRateio.reduce(
                    (total, pessoa) => total + pessoa.porcentagem,
                    0
                );

            if (atual + porcentagem > 100) {
                alert("A porcentagem total não pode ultrapassar 100%.");
                return;
            }

            pessoasRateio.push({
                nome,
                porcentagem
            });

            document.getElementById("nomePessoa").value = "";

            calcularRateioInterno();
        });
    }

    const listaPessoas =
        document.getElementById("listaPessoas");

    if (listaPessoas) {

        listaPessoas.addEventListener("click", (e) => {

            const index = e.target.dataset.rateio;

            if (index !== undefined) {

                pessoasRateio.splice(index, 1);

                calcularRateioInterno();
            }
        });
    }

    calcularRateioInterno();


    /* =====================================================
       22. JOGO DA MEMÓRIA
       ===================================================== */

    let cartasMemoria = [];
    let primeiraCarta = null;
    let segundaCarta = null;
    let bloqueadoMemoria = false;
    let paresEncontrados = 0;
    let cliquesMemoria = 0;

    window.iniciarJogoMemoria = function () {

        const tabuleiro =
            document.getElementById("tabuleiroMemoria");

        const resultado =
            document.getElementById("resultadoMemoria");

        const contador =
            document.getElementById("clicksMemoria");

        if (!tabuleiro) return;

        const simbolos = [
            "🍎", "🍎",
            "🍕", "🍕",
            "🚀", "🚀",
            "🐱", "🐱",
            "⚽", "⚽",
            "🎮", "🎮",
            "⭐", "⭐",
            "🔥", "🔥"
        ];

        cartasMemoria = embaralhar(simbolos);

        primeiraCarta = null;
        segundaCarta = null;
        bloqueadoMemoria = false;
        paresEncontrados = 0;
        cliquesMemoria = 0;

        contador.textContent = "0";
        resultado.textContent = "";

        tabuleiro.innerHTML = "";

        cartasMemoria.forEach((simbolo, index) => {

            const carta = document.createElement("button");

            carta.type = "button";
            carta.textContent = "❓";
            carta.dataset.index = index;

            carta.style.fontSize = "2rem";
            carta.style.minHeight = "70px";

            carta.addEventListener("click", () => virarCarta(carta));

            tabuleiro.appendChild(carta);
        });
    };

    function virarCarta(carta) {

        if (
            bloqueadoMemoria ||
            carta === primeiraCarta ||
            carta.dataset.aberta === "true"
        ) {
            return;
        }

        const index = Number(carta.dataset.index);

        carta.textContent = cartasMemoria[index];
        carta.dataset.aberta = "true";

        cliquesMemoria++;

        document.getElementById("clicksMemoria").textContent =
            cliquesMemoria;

        if (!primeiraCarta) {

            primeiraCarta = carta;

        } else {

            segundaCarta = carta;
            verificarParMemoria();
        }
    }

    function verificarParMemoria() {

        const index1 = Number(primeiraCarta.dataset.index);
        const index2 = Number(segundaCarta.dataset.index);

        if (cartasMemoria[index1] === cartasMemoria[index2]) {

            paresEncontrados++;

            primeiraCarta = null;
            segundaCarta = null;

            if (paresEncontrados === 8) {

                document.getElementById("resultadoMemoria").textContent =
                    `🎉 Você encontrou todos os pares em ${cliquesMemoria} cliques!`;
            }

        } else {

            bloqueadoMemoria = true;

            setTimeout(() => {

                primeiraCarta.textContent = "❓";
                segundaCarta.textContent = "❓";

                primeiraCarta.dataset.aberta = "false";
                segundaCarta.dataset.aberta = "false";

                primeiraCarta = null;
                segundaCarta = null;

                bloqueadoMemoria = false;

            }, 800);
        }
    }


    /* =====================================================
       23. PEDRA PAPEL TESOURA
       ===================================================== */

    let placarVoce = 0;
    let placarPc = 0;

    window.jogar = function (jogada) {

        const opcoes = [
            "pedra",
            "papel",
            "tesoura"
        ];

        const pc =
            opcoes[Math.floor(Math.random() * opcoes.length)];

        const resultado =
            document.getElementById("resultadoPPT");

        if (!resultado) return;

        if (jogada === pc) {

            resultado.textContent =
                `🤝 Empate! Ambos escolheram ${pc}.`;

        } else if (
            (jogada === "pedra" && pc === "tesoura") ||
            (jogada === "papel" && pc === "pedra") ||
            (jogada === "tesoura" && pc === "papel")
        ) {

            placarVoce++;

            resultado.textContent =
                `🎉 Você ganhou! Você: ${jogada} | PC: ${pc}`;

        } else {

            placarPc++;

            resultado.textContent =
                `😢 PC ganhou! Você: ${jogada} | PC: ${pc}`;
        }

        document.getElementById("placarVoce").textContent =
            placarVoce;

        document.getElementById("placarPc").textContent =
            placarPc;
    };

    window.resetarPlacarPPT = function () {

        placarVoce = 0;
        placarPc = 0;

        document.getElementById("placarVoce").textContent = "0";
        document.getElementById("placarPc").textContent = "0";

        document.getElementById("resultadoPPT").textContent =
            "Placar zerado! Escolha uma opção para jogar.";
    };


    /* =====================================================
       24. CLIQUE RÁPIDO
       ===================================================== */

    let intervaloClique = null;
    let tempoClique = 10;
    let totalCliques = 0;

    const btnIniciarClique =
        document.getElementById("btnIniciarClique");

    const btnClicar =
        document.getElementById("btnClicar");

    if (btnIniciarClique) {

        btnIniciarClique.addEventListener("click", () => {

            tempoClique = 10;
            totalCliques = 0;

            document.getElementById("tempoClique").textContent =
                tempoClique;

            document.getElementById("totalCliques").textContent =
                totalCliques;

            btnClicar.disabled = false;
            btnIniciarClique.disabled = true;

            document.getElementById("resultadoClique").textContent =
                "🔥 Clique o mais rápido que puder!";

            clearInterval(intervaloClique);

            intervaloClique = setInterval(() => {

                tempoClique--;

                document.getElementById("tempoClique").textContent =
                    tempoClique;

                if (tempoClique <= 0) {

                    clearInterval(intervaloClique);

                    btnClicar.disabled = true;
                    btnIniciarClique.disabled = false;

                    document.getElementById("resultadoClique").textContent =
                        `⏰ Fim! Você conseguiu ${totalCliques} cliques.`;
                }

            }, 1000);
        });
    }

    if (btnClicar) {

        btnClicar.addEventListener("click", () => {

            if (btnClicar.disabled) return;

            totalCliques++;

            document.getElementById("totalCliques").textContent =
                totalCliques;
        });
    }


    /* =====================================================
       25. QUIZ RELÂMPAGO
       ===================================================== */

    const perguntasQuiz = [
        {
            pergunta: "Qual linguagem é usada para tornar páginas web interativas?",
            opcoes: ["HTML", "CSS", "JavaScript", "SQL"],
            correta: 2
        },
        {
            pergunta: "Qual comando mostra uma mensagem no console?",
            opcoes: ["console.log()", "print()", "echo()", "write()"],
            correta: 0
        },
        {
            pergunta: "Qual palavra declara uma constante em JavaScript?",
            opcoes: ["var", "let", "const", "constant"],
            correta: 2
        },
        {
            pergunta: "Qual símbolo representa igualdade estrita?",
            opcoes: ["=", "==", "===", "!="],
            correta: 2
        },
        {
            pergunta: "Qual método adiciona um item ao final de um array?",
            opcoes: ["push()", "add()", "insert()", "append()"],
            correta: 0
        }
    ];

    let perguntaAtual = 0;
    let pontosQuiz = 0;

    window.iniciarQuiz = function () {

        perguntaAtual = 0;
        pontosQuiz = 0;

        document.getElementById("pontosQuiz").textContent =
            "0";

        document.getElementById("resultadoQuiz").style.display =
            "none";

        mostrarPerguntaQuiz();
    };

    function mostrarPerguntaQuiz() {

        const pergunta =
            perguntasQuiz[perguntaAtual];

        document.getElementById("numPergunta").textContent =
            perguntaAtual + 1;

        document.getElementById("textoPergunta").textContent =
            pergunta.pergunta;

        const opcoes =
            document.getElementById("opcoesQuiz");

        opcoes.innerHTML = "";

        pergunta.opcoes.forEach((opcao, index) => {

            const botao = document.createElement("button");

            botao.type = "button";
            botao.textContent = opcao;

            botao.addEventListener("click", () => {

                if (index === pergunta.correta) {
                    pontosQuiz++;
                }

                document.getElementById("pontosQuiz").textContent =
                    pontosQuiz;

                perguntaAtual++;

                if (perguntaAtual >= perguntasQuiz.length) {

                    const resultado =
                        document.getElementById("resultadoQuiz");

                    resultado.style.display = "block";

                    resultado.textContent =
                        `🎉 Quiz terminado! Você fez ${pontosQuiz}/5 pontos.`;

                    opcoes.innerHTML = "";

                } else {

                    mostrarPerguntaQuiz();
                }
            });

            opcoes.appendChild(botao);
        });
    }

    iniciarQuiz();


    /* =====================================================
       26. JOGO DA VELHA
       ===================================================== */

    let tamanhoVelha = 3;
    let tabuleiroVelha = [];
    let jogadorAtual = "X";
    let jogoAtivo = false;
    let simboloJogador = "X";
    let modoJogo = "pc";
    let dificuldade = "facil";
    let qtdGanhar = 3;

    window.iniciarJogoVelha = function () {

        tamanhoVelha =
            Number(document.getElementById("tamanhoTabuleiro").value);

        qtdGanhar =
            Number(document.getElementById("qtdParaGanhar").value);

        modoJogo =
            document.getElementById("modoJogo").value;

        simboloJogador =
            document.getElementById("simboloJogador").value;

        dificuldade =
            document.getElementById("dificuldadeVelha").value;

        if (qtdGanhar > tamanhoVelha) {
            alert(
                "A quantidade para ganhar não pode ser maior que o tamanho do tabuleiro."
            );
            return;
        }

        jogadorAtual = "X";
        jogoAtivo = true;

        tabuleiroVelha =
            Array(tamanhoVelha * tamanhoVelha).fill("");

        atualizarInformacoesVelha();
        renderizarVelha();

        document.getElementById("resultadoVelha").textContent =
            "🎮 Jogo iniciado!";
    };

    function renderizarVelha() {

        const tabuleiro =
            document.getElementById("tabuleiroVelha");

        if (!tabuleiro) return;

        tabuleiro.innerHTML = "";

        tabuleiro.style.display = "grid";
        tabuleiro.style.gridTemplateColumns =
            `repeat(${tamanhoVelha}, 1fr)`;

        tabuleiro.style.gap = "5px";

        tabuleiroVelha.forEach((valor, index) => {

            const botao = document.createElement("button");

            botao.type = "button";
            botao.textContent = valor;

            botao.style.aspectRatio = "1";
            botao.style.fontSize =
                tamanhoVelha >= 6 ? "1rem" : "1.8rem";

            botao.addEventListener("click", () => {
                jogarVelha(index);
            });

            tabuleiro.appendChild(botao);
        });
    }

    function jogarVelha(index) {

        if (!jogoAtivo || tabuleiroVelha[index]) return;

        if (modoJogo === "pc" && jogadorAtual !== simboloJogador) {
            return;
        }

        tabuleiroVelha[index] = jogadorAtual;

        renderizarVelha();

        if (verificarVitoriaVelha(jogadorAtual)) {

            finalizarVelha(
                `${jogadorAtual} venceu! 🎉`
            );

            return;
        }

        if (tabuleiroVelha.every(casa => casa !== "")) {

            finalizarVelha("🤝 Empate!");

            return;
        }

        jogadorAtual =
            jogadorAtual === "X" ? "O" : "X";

        atualizarInformacoesVelha();

        if (
            modoJogo === "pc" &&
            jogadorAtual !== simboloJogador &&
            jogoAtivo
        ) {

            setTimeout(jogadaPC, 300);
        }
    }

    function jogadaPC() {

        if (!jogoAtivo) return;

        let movimentosDisponiveis =
            tabuleiroVelha
                .map((valor, index) => valor === "" ? index : null)
                .filter(index => index !== null);

        if (!movimentosDisponiveis.length) return;

        let escolha;

        if (dificuldade === "facil") {

            escolha =
                movimentosDisponiveis[
                    Math.floor(
                        Math.random() *
                        movimentosDisponiveis.length
                    )
                ];

        } else {

            escolha =
                encontrarMelhorMovimento(
                    movimentosDisponiveis
                );
        }

        tabuleiroVelha[escolha] = jogadorAtual;

        renderizarVelha();

        if (verificarVitoriaVelha(jogadorAtual)) {

            finalizarVelha(
                "🤖 O PC venceu!"
            );

            return;
        }

        if (tabuleiroVelha.every(casa => casa !== "")) {

            finalizarVelha("🤝 Empate!");

            return;
        }

        jogadorAtual =
            jogadorAtual === "X" ? "O" : "X";

        atualizarInformacoesVelha();
    }

    function encontrarMelhorMovimento(movimentos) {

        const adversario =
            simboloJogador === "X" ? "O" : "X";

        for (const movimento of movimentos) {

            tabuleiroVelha[movimento] = jogadorAtual;

            if (verificarVitoriaVelha(jogadorAtual)) {

                tabuleiroVelha[movimento] = "";

                return movimento;
            }

            tabuleiroVelha[movimento] = "";
        }

        for (const movimento of movimentos) {

            tabuleiroVelha[movimento] = adversario;

            if (verificarVitoriaVelha(adversario)) {

                tabuleiroVelha[movimento] = "";

                return movimento;
            }

            tabuleiroVelha[movimento] = "";
        }

        if (dificuldade === "impossivel") {

            const centro =
                Math.floor(tabuleiroVelha.length / 2);

            if (tabuleiroVelha[centro] === "") {
                return centro;
            }
        }

        return movimentos[
            Math.floor(Math.random() * movimentos.length)
        ];
    }

    function verificarVitoriaVelha(simbolo) {

        const direcoes = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1]
        ];

        for (let linha = 0; linha < tamanhoVelha; linha++) {

            for (let coluna = 0; coluna < tamanhoVelha; coluna++) {

                for (const [dl, dc] of direcoes) {

                    let contador = 0;

                    for (let i = 0; i < qtdGanhar; i++) {

                        const novaLinha =
                            linha + dl * i;

                        const novaColuna =
                            coluna + dc * i;

                        if (
                            novaLinha < 0 ||
                            novaLinha >= tamanhoVelha ||
                            novaColuna < 0 ||
                            novaColuna >= tamanhoVelha
                        ) {
                            break;
                        }

                        const index =
                            novaLinha * tamanhoVelha +
                            novaColuna;

                        if (tabuleiroVelha[index] === simbolo) {
                            contador++;
                        } else {
                            break;
                        }
                    }

                    if (contador === qtdGanhar) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function finalizarVelha(mensagem) {

        jogoAtivo = false;

        document.getElementById("resultadoVelha").textContent =
            mensagem;

        atualizarInformacoesVelha();
    }

    function atualizarInformacoesVelha() {

        const vez =
            document.getElementById("vezJogador");

        const exibido =
            document.getElementById("simboloExibido");

        const adversario =
            document.getElementById("simboloAdversario");

        if (!vez) return;

        if (!jogoAtivo) {

            vez.textContent = "Jogo encerrado";

        } else {

            if (
                modoJogo === "pc" &&
                jogadorAtual !== simboloJogador
            ) {
                vez.textContent =
                    `${jogadorAtual} - PC 🤖`;
            } else {
                vez.textContent =
                    `${jogadorAtual} - Você`;
            }
        }

        if (exibido) {
            exibido.textContent = simboloJogador;
        }

        if (adversario) {
            adversario.textContent =
                simboloJogador === "X" ? "O" : "X";
        }
    }

    const modoJogoElemento =
        document.getElementById("modoJogo");

    if (modoJogoElemento) {

        modoJogoElemento.addEventListener("change", () => {

            const area =
                document.getElementById("areaDificuldade");

            if (area) {
                area.style.display =
                    modoJogoElemento.value === "pc"
                        ? "block"
                        : "none";
            }
        });
    }

    iniciarJogoVelha();


    /* =====================================================
       27. GERADOR DE QR CODE
       ===================================================== */

    let qrAtual = null;

    const btnGerarQR =
        document.getElementById("btnGerarQR");

    const btnBaixarQR =
        document.getElementById("btnBaixarQR");

    const btnLimparQR =
        document.getElementById("btnLimparQR");

    const tipoQr =
        document.getElementById("tipoQr");

    const qrConteudo =
        document.getElementById("qrConteudo");

    const qrCor =
        document.getElementById("qrCor");

    const qrFundo =
        document.getElementById("qrFundo");

    const qrTamanho =
        document.getElementById("qrTamanho");

    const qrTamanhoValor =
        document.getElementById("qrTamanhoValor");

    const qrLogo =
        document.getElementById("qrLogo");

    const qrResultado =
        document.getElementById("qrResultado");

    if (qrTamanho && qrTamanhoValor) {

        qrTamanho.addEventListener("input", () => {

            qrTamanhoValor.textContent =
                `${qrTamanho.value}px`;
        });
    }

    if (tipoQr && qrConteudo) {

        tipoQr.addEventListener("change", () => {

            switch (tipoQr.value) {

                case "link":
                    qrConteudo.placeholder =
                        "https://exemplo.com";
                    break;

                case "whatsapp":
                    qrConteudo.placeholder =
                        "5511999999999";
                    break;

                case "email":
                    qrConteudo.placeholder =
                        "exemplo@email.com";
                    break;

                case "wifi":
                    qrConteudo.placeholder =
                        "SSID:MinhaRede | Senha:12345678";
                    break;

                case "imagem":
                    qrConteudo.placeholder =
                        "https://exemplo.com/imagem.jpg";
                    break;

                default:
                    qrConteudo.placeholder =
                        "Digite qualquer texto ou cole um link...";
            }
        });
    }

    function prepararConteudoQR() {

        const tipo = tipoQr.value;
        const valor = qrConteudo.value.trim();

        if (!valor) return "";

        switch (tipo) {

            case "link":

                if (
                    !valor.startsWith("http://") &&
                    !valor.startsWith("https://")
                ) {
                    return `https://${valor}`;
                }

                return valor;

            case "whatsapp": {

                const numero =
                    valor.replace(/\D/g, "");

                return `https://wa.me/${numero}`;
            }

            case "email":

                return `mailto:${valor}`;

            case "imagem":

                return valor;

            case "wifi": {

                const partes =
                    valor.split("|");

                let ssid = "";
                let senha = "";

                partes.forEach(parte => {

                    const [chave, ...resto] =
                        parte.split(":");

                    const valorParte =
                        resto.join(":");

                    if (
                        chave &&
                        chave.trim().toLowerCase() === "ssid"
                    ) {
                        ssid = valorParte;
                    }

                    if (
                        chave &&
                        chave.trim().toLowerCase() === "senha"
                    ) {
                        senha = valorParte;
                    }
                });

                if (ssid) {
                    return `WIFI:T:WPA;S:${ssid};P:${senha};;`;
                }

                return valor;
            }

            default:
                return valor;
        }
    }

    if (btnGerarQR) {

        btnGerarQR.addEventListener("click", () => {

            if (typeof QRCode === "undefined") {

                alert(
                    "A biblioteca do QR Code não foi carregada."
                );

                return;
            }

            const conteudo =
                prepararConteudoQR();

            if (!conteudo) {

                alert(
                    "Digite algum conteúdo para gerar o QR Code."
                );

                return;
            }

            qrResultado.innerHTML = "";

            const tamanho =
                Number(qrTamanho.value);

            const logoArquivo =
                qrLogo.files[0];

            function criarQR(logoData = null) {

                const opcoes = {

                    text: conteudo,

                    width: tamanho,
                    height: tamanho,

                    colorDark: qrCor.value,
                    colorLight: qrFundo.value,

                    correctLevel:
                        QRCode.CorrectLevel.H,

                    quietZone: 10,

                    quietZoneColor: qrFundo.value
                };

                if (logoData) {

                    opcoes.logo =
                        logoData;

                    opcoes.logoWidth =
                        Math.round(tamanho * 0.18);

                    opcoes.logoHeight =
                        Math.round(tamanho * 0.18);

                    opcoes.logoBackgroundTransparent =
                        false;

                    opcoes.logoBackgroundColor =
                        qrFundo.value;
                }

                qrAtual =
                    new QRCode(
                        qrResultado,
                        opcoes
                    );
            }

            if (logoArquivo) {

                const reader =
                    new FileReader();

                reader.onload = (event) => {
                    criarQR(event.target.result);
                };

                reader.readAsDataURL(logoArquivo);

            } else {

                criarQR();
            }
        });
    }

    if (btnBaixarQR) {

        btnBaixarQR.addEventListener("click", () => {

            const canvas =
                qrResultado.querySelector("canvas");

            const imagem =
                qrResultado.querySelector("img");

            let url = "";

            if (canvas) {
                url = canvas.toDataURL("image/png");
            } else if (imagem) {
                url = imagem.src;
            }

            if (!url) {

                alert(
                    "Gere um QR Code primeiro."
                );

                return;
            }

            const link =
                document.createElement("a");

            link.download =
                "qrcode-guilherme.png";

            link.href = url;

            document.body.appendChild(link);

            link.click();

            link.remove();
        });
    }

    if (btnLimparQR) {

        btnLimparQR.addEventListener("click", () => {

            qrResultado.innerHTML = "";

            if (qrConteudo) {
                qrConteudo.value = "";
            }

            if (qrLogo) {
                qrLogo.value = "";
            }

            qrAtual = null;
        });
    }


    /* =====================================================
       BUSCA DOS 27 DESAFIOS
       ===================================================== */

    const buscaListas =
        document.getElementById("busca-listas");

    if (buscaListas) {

        buscaListas.addEventListener("input", () => {

            const busca =
                buscaListas.value.trim().toLowerCase();

            const cards =
                document.querySelectorAll(".main-content > .card");

            cards.forEach(card => {

                const titulo =
                    card.querySelector("h3");

                if (!titulo) return;

                const texto =
                    titulo.textContent.toLowerCase();

                card.style.display =
                    texto.includes(busca)
                        ? ""
                        : "none";
            });
        });
    }


    /* =====================================================
       TEMA CLARO / ESCURO
       ===================================================== */

    const themeToggle =
        document.getElementById("theme-toggle");

    const body =
        document.getElementById("body-principal");

    const themeMeta =
        document.getElementById("theme-color-meta");

    if (themeToggle && body) {

        let tema =
            localStorage.getItem("tema") || "escuro";

        aplicarTema(tema);

        themeToggle.addEventListener("click", () => {

            tema =
                tema === "escuro"
                    ? "claro"
                    : "escuro";

            aplicarTema(tema);

            localStorage.setItem(
                "tema",
                tema
            );
        });
    }

    function aplicarTema(tema) {

        if (tema === "claro") {

            body.classList.add("tema-claro");

            themeToggle.textContent = "☀️";

            if (themeMeta) {
                themeMeta.setAttribute(
                    "content",
                    "#ffffff"
                );
            }

        } else {

            body.classList.remove("tema-claro");

            themeToggle.textContent = "🌙";

            if (themeMeta) {
                themeMeta.setAttribute(
                    "content",
                    "#1a1a1a"
                );
            }
        }
    }


    /* =====================================================
       FUNÇÕES AUXILIARES
       ===================================================== */

    function mostrarResultado(elemento, mensagem) {

        let resultado =
            elemento.parentElement.querySelector(
                ".resultado-js"
            );

        if (!resultado) {

            resultado =
                document.createElement("div");

            resultado.className =
                "resultado-js message-area";

            resultado.style.marginTop =
                "10px";

            elemento.appendChild(resultado);
        }

        resultado.textContent =
            mensagem;
    }

    function formatarMoeda(valor) {

        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

    function embaralhar(array) {

        const novoArray =
            [...array];

        for (
            let i = novoArray.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                novoArray[i],
                novoArray[j]
            ] = [
                novoArray[j],
                novoArray[i]
            ];
        }

        return novoArray;
    }

    function escapeHTML(texto) {

        const div =
            document.createElement("div");

        div.textContent =
            texto;

        return div.innerHTML;
    }


    /* =====================================================
       FINALIZAÇÃO
       ===================================================== */

    console.log(
        "✅ Desafios JS carregados com sucesso!"
    );

});