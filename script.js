/* =========================================================
   DESAFIOS JS - SCRIPT PRINCIPAL
   GUILHERME - MINI-APLICAÇÕES JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       FUNÇÕES AUXILIARES
       ===================================================== */

    const $ = (id) => document.getElementById(id);

    const formatarMoeda = (valor) => {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    };

    const mostrarMensagem = (elemento, mensagem, tipo = "") => {
        if (!elemento) return;

        elemento.textContent = mensagem;

        elemento.classList.remove(
            "sucesso",
            "erro",
            "aviso"
        );

        if (tipo) {
            elemento.classList.add(tipo);
        }
    };


    /* =====================================================
       1. DIA DA SEMANA
       ===================================================== */

    const formDia = $("form");

    if (formDia) {

        formDia.addEventListener("submit", (e) => {

            e.preventDefault();

            const campo = $("day");
            const dia = campo.value.trim().toLowerCase();

            if (!dia) {
                alert("Digite um dia da semana.");
                return;
            }

            const dias = {
                domingo: "Domingo",
                segunda: "Segunda-feira",
                "segunda-feira": "Segunda-feira",
                terca: "Terça-feira",
                terça: "Terça-feira",
                "terça-feira": "Terça-feira",
                quarta: "Quarta-feira",
                "quarta-feira": "Quarta-feira",
                quinta: "Quinta-feira",
                "quinta-feira": "Quinta-feira",
                sexta: "Sexta-feira",
                "sexta-feira": "Sexta-feira",
                sabado: "Sábado",
                sábado: "Sábado"
            };

            if (dias[dia]) {
                alert(`Hoje é ${dias[dia]}!`);
            } else {
                alert("Dia da semana inválido.");
            }
        });
    }


    /* =====================================================
       2. POSITIVO OU NEGATIVO
       ===================================================== */

    const numberForm = $("numberForm");

    if (numberForm) {

        numberForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const valor = Number($("number").value);

            if ($("number").value === "") {
                alert("Digite um número.");
                return;
            }

            if (valor > 0) {
                alert(`${valor} é positivo.`);
            } else if (valor < 0) {
                alert(`${valor} é negativo.`);
            } else {
                alert("O número é zero.");
            }
        });
    }


    /* =====================================================
       3. JOGO DE ADIVINHAÇÃO
       ===================================================== */

    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let tentativasAdivinhacao = 0;

    const btnAdivinhar = $("btnAdivinhar");
    const btnReiniciarAdivinhacao = $("btnReiniciarAdivinhacao");

    function reiniciarAdivinhacao() {

        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        tentativasAdivinhacao = 0;

        if ($("palpite")) {
            $("palpite").value = "";
        }

        if ($("mensagem")) {
            $("mensagem").textContent =
                "Novo número gerado! Tente novamente.";
        }
    }

    if (btnAdivinhar) {

        btnAdivinhar.addEventListener("click", () => {

            const palpite = Number($("palpite").value);

            if (!palpite || palpite < 1 || palpite > 100) {
                mostrarMensagem(
                    $("mensagem"),
                    "Digite um número entre 1 e 100.",
                    "erro"
                );
                return;
            }

            tentativasAdivinhacao++;

            if (palpite === numeroSecreto) {

                mostrarMensagem(
                    $("mensagem"),
                    `🎉 Acertou! O número era ${numeroSecreto}. Tentativas: ${tentativasAdivinhacao}`,
                    "sucesso"
                );

            } else if (palpite < numeroSecreto) {

                mostrarMensagem(
                    $("mensagem"),
                    "⬆️ Tente um número maior!",
                    "aviso"
                );

            } else {

                mostrarMensagem(
                    $("mensagem"),
                    "⬇️ Tente um número menor!",
                    "aviso"
                );
            }
        });
    }

    if (btnReiniciarAdivinhacao) {
        btnReiniciarAdivinhacao.addEventListener(
            "click",
            reiniciarAdivinhacao
        );
    }


    /* =====================================================
       4. SALDO ATUAL
       ===================================================== */

    const balanceForm = $("balanceForm");

    if (balanceForm) {

        balanceForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const valor = Number($("balance").value);

            if ($("balance").value === "" || isNaN(valor)) {
                alert("Digite um saldo válido.");
                return;
            }

            alert(`Seu saldo atual é: ${formatarMoeda(valor)}`);
        });
    }


    /* =====================================================
       5. BOAS-VINDAS
       ===================================================== */

    const nameForm = $("nameForm");

    if (nameForm) {

        nameForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const nome = $("name").value.trim();

            if (!nome) {
                alert("Digite seu nome.");
                return;
            }

            alert(`Olá, ${nome}! Seja bem-vindo(a)! 👋`);
        });
    }


    /* =====================================================
       6. IMC
       ===================================================== */

    const imcForm = $("imcForm");

    if (imcForm) {

        imcForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const peso = Number($("peso").value);
            const altura = Number($("altura").value);

            if (
                !peso ||
                !altura ||
                peso <= 0 ||
                altura <= 0
            ) {
                mostrarMensagem(
                    $("imcResultado"),
                    "Digite peso e altura válidos.",
                    "erro"
                );
                return;
            }

            const imc = peso / (altura * altura);

            let classificacao = "";

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

            $("imcResultado").textContent =
                `IMC: ${imc.toFixed(2)} — ${classificacao}`;
        });
    }

    const btnLimparImc = $("btnLimparImc");

    if (btnLimparImc) {

        btnLimparImc.addEventListener("click", () => {

            $("peso").value = "";
            $("altura").value = "";
            $("imcResultado").textContent = "";
        });
    }


    /* =====================================================
       7. CONVERSOR C/F
       ===================================================== */

    const tempForm = $("tempForm");

    if (tempForm) {

        tempForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const celsius = Number($("celsius").value);

            if ($("celsius").value === "") {
                mostrarMensagem(
                    $("tempResultado"),
                    "Digite uma temperatura.",
                    "erro"
                );
                return;
            }

            const fahrenheit = (celsius * 9 / 5) + 32;

            $("tempResultado").textContent =
                `${celsius} °C = ${fahrenheit.toFixed(2)} °F`;
        });
    }


    /* =====================================================
       8. CONTADOR DE CLIQUES
       ===================================================== */

    let contadorCliques = 0;

    if ($("btnContador")) {

        $("btnContador").addEventListener("click", () => {

            contadorCliques++;

            $("contadorCliques").textContent =
                contadorCliques;
        });
    }

    if ($("btnResetContador")) {

        $("btnResetContador").addEventListener("click", () => {

            contadorCliques = 0;

            $("contadorCliques").textContent = "0";
        });
    }


    /* =====================================================
       9. LISTA DE TAREFAS
       ===================================================== */

    let tarefas = [];

    const todoForm = $("todoForm");
    const todoList = $("todoList");
    const filtroTodo = $("filtroTodo");

    function renderizarTarefas() {

        if (!todoList) return;

        todoList.innerHTML = "";

        const filtro = filtroTodo
            ? filtroTodo.value.toLowerCase().trim()
            : "";

        const tarefasFiltradas = tarefas.filter((tarefa) =>
            tarefa.texto.toLowerCase().includes(filtro)
        );

        tarefasFiltradas.forEach((tarefa) => {

            const li = document.createElement("li");

            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.justifyContent = "space-between";
            li.style.gap = "10px";
            li.style.padding = "8px";
            li.style.marginBottom = "5px";
            li.style.borderRadius = "5px";

            const span = document.createElement("span");

            span.textContent = tarefa.texto;

            if (tarefa.concluida) {
                span.style.textDecoration = "line-through";
                span.style.opacity = "0.6";
            }

            span.style.cursor = "pointer";

            span.addEventListener("click", () => {

                tarefa.concluida = !tarefa.concluida;

                renderizarTarefas();
            });

            const botao = document.createElement("button");

            botao.type = "button";
            botao.textContent = "🗑️";
            botao.style.width = "auto";

            botao.addEventListener("click", () => {

                tarefas = tarefas.filter(
                    (item) => item.id !== tarefa.id
                );

                renderizarTarefas();
            });

            li.appendChild(span);
            li.appendChild(botao);

            todoList.appendChild(li);
        });
    }

    if (todoForm) {

        todoForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const texto = $("todoInput").value.trim();

            if (!texto) {
                alert("Digite uma tarefa.");
                return;
            }

            tarefas.push({
                id: Date.now(),
                texto: texto,
                concluida: false
            });

            $("todoInput").value = "";

            renderizarTarefas();
        });
    }

    if (filtroTodo) {
        filtroTodo.addEventListener(
            "input",
            renderizarTarefas
        );
    }


    /* =====================================================
       10. CONTADOR REGRESSIVO
       ===================================================== */

    let timerInterval = null;
    let tempoRestante = 60;

    function atualizarTimer() {

        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;

        if ($("timerDisplay")) {

            $("timerDisplay").textContent =
                `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
        }
    }

    if ($("btnIniciarTimer")) {

        $("btnIniciarTimer").addEventListener("click", () => {

            if (timerInterval) return;

            const minutos = Number($("minutos").value) || 0;
            const segundos = Number($("segundos").value) || 0;

            if (tempoRestante <= 0) {
                tempoRestante = (minutos * 60) + segundos;
            }

            if (tempoRestante <= 0) {
                alert("Defina um tempo maior que zero.");
                return;
            }

            $("btnIniciarTimer").disabled = true;
            $("btnPararTimer").disabled = false;

            timerInterval = setInterval(() => {

                if (tempoRestante > 0) {

                    tempoRestante--;
                    atualizarTimer();

                } else {

                    clearInterval(timerInterval);
                    timerInterval = null;

                    $("btnIniciarTimer").disabled = false;
                    $("btnPararTimer").disabled = true;

                    alert("⏰ Tempo esgotado!");
                }

            }, 1000);
        });
    }

    if ($("btnPararTimer")) {

        $("btnPararTimer").addEventListener("click", () => {

            clearInterval(timerInterval);
            timerInterval = null;

            $("btnIniciarTimer").disabled = false;
            $("btnPararTimer").disabled = true;
        });
    }

    if ($("btnResetTimer")) {

        $("btnResetTimer").addEventListener("click", () => {

            clearInterval(timerInterval);
            timerInterval = null;

            const minutos = Number($("minutos").value) || 0;
            const segundos = Number($("segundos").value) || 0;

            tempoRestante = (minutos * 60) + segundos;

            atualizarTimer();

            $("btnIniciarTimer").disabled = false;
            $("btnPararTimer").disabled = true;
        });
    }

    atualizarTimer();


    /* =====================================================
       11. GERADOR DE SENHAS
       ===================================================== */

    const btnGerarSenha = $("btnGerarSenha");

    if (btnGerarSenha) {

        btnGerarSenha.addEventListener("click", () => {

            let tamanho = Number($("tamanhoSenha").value);

            tamanho = Math.max(4, Math.min(20, tamanho));

            const maiusculas =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            const minusculas =
                "abcdefghijklmnopqrstuvwxyz";

            const numeros =
                "0123456789";

            const simbolos =
                "!@#$%^&*()_+-=[]{}<>?";

            let caracteres =
                minusculas;

            if ($("incluirMaiusculas").checked) {
                caracteres += maiusculas;
            }

            if ($("incluirNumeros").checked) {
                caracteres += numeros;
            }

            if ($("incluirSimbolos").checked) {
                caracteres += simbolos;
            }

            let senha = "";

            for (let i = 0; i < tamanho; i++) {

                const indice =
                    Math.floor(Math.random() * caracteres.length);

                senha += caracteres[indice];
            }

            $("senhaGerada").value = senha;
        });
    }

    if ($("btnCopiarSenha")) {

        $("btnCopiarSenha").addEventListener("click", async () => {

            const senha = $("senhaGerada").value;

            if (!senha) {
                alert("Gere uma senha primeiro.");
                return;
            }

            try {

                await navigator.clipboard.writeText(senha);

                alert("Senha copiada! 📋");

            } catch (erro) {

                $("senhaGerada").select();
                document.execCommand("copy");

                alert("Senha copiada! 📋");
            }
        });
    }


    /* =====================================================
       12. CALCULADORA DE GORJETA
       ===================================================== */

    const gorjetaSlider = $("gorjetaPorcentagem");

    function atualizarPorcentagemGorjeta() {

        if ($("gorjetaValorOutput") && gorjetaSlider) {

            $("gorjetaValorOutput").textContent =
                `${gorjetaSlider.value}%`;
        }
    }

    if (gorjetaSlider) {

        gorjetaSlider.addEventListener(
            "input",
            atualizarPorcentagemGorjeta
        );
    }

    if ($("btnCalcularGorjeta")) {

        $("btnCalcularGorjeta").addEventListener("click", () => {

            const conta = Number($("contaValor").value);
            const porcentagem =
                Number($("gorjetaPorcentagem").value);

            const pessoas =
                Number($("numPessoas").value);

            if (
                conta < 0 ||
                pessoas < 1 ||
                isNaN(conta)
            ) {
                mostrarMensagem(
                    $("gorjetaResultado"),
                    "Digite valores válidos.",
                    "erro"
                );
                return;
            }

            const gorjeta =
                conta * (porcentagem / 100);

            const total = conta + gorjeta;

            const porPessoa =
                total / pessoas;

            $("gorjetaResultado").innerHTML = `
                Conta: <strong>${formatarMoeda(conta)}</strong><br>
                Gorjeta: <strong>${formatarMoeda(gorjeta)}</strong><br>
                Total: <strong>${formatarMoeda(total)}</strong><br>
                Por pessoa: <strong>${formatarMoeda(porPessoa)}</strong>
            `;
        });
    }


    /* =====================================================
       13. EDITOR DE ESTILOS
       ===================================================== */

    const corTexto = $("corTexto");
    const tamanhoFonte = $("tamanhoFonte");

    function atualizarEditorEstilos() {

        if (!$("blocoExemplo")) return;

        if (corTexto) {
            $("blocoExemplo").style.color =
                corTexto.value;
        }

        if (tamanhoFonte) {

            $("blocoExemplo").style.fontSize =
                `${tamanhoFonte.value}px`;

            $("tamanhoFonteOutput").textContent =
                `${tamanhoFonte.value}px`;
        }
    }

    if (corTexto) {
        corTexto.addEventListener(
            "input",
            atualizarEditorEstilos
        );
    }

    if (tamanhoFonte) {
        tamanhoFonte.addEventListener(
            "input",
            atualizarEditorEstilos
        );
    }

    atualizarEditorEstilos();


    /* =====================================================
       14. VALIDADOR DE LOGIN
       ===================================================== */

    const loginForm = $("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const email =
                $("loginEmail").value.trim();

            const senha =
                $("loginSenha").value;

            const emailError = $("emailError");
            const senhaError = $("senhaError");

            emailError.textContent = "";
            senhaError.textContent = "";

            let valido = true;

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {

                emailError.textContent =
                    "Digite um e-mail válido.";

                valido = false;
            }

            if (senha.length < 6) {

                senhaError.textContent =
                    "A senha precisa ter pelo menos 6 caracteres.";

                valido = false;
            }

            if (valido) {

                alert(
                    "✅ Login validado com sucesso!"
                );
            }
        });
    }


    /* =====================================================
       15. CATÁLOGO DE PRODUTOS
       ===================================================== */

    const produtos = [
        { nome: "Notebook", preco: 3500 },
        { nome: "Mouse", preco: 80 },
        { nome: "Teclado Mecânico", preco: 250 },
        { nome: "Monitor", preco: 1200 },
        { nome: "Headset", preco: 180 },
        { nome: "Webcam", preco: 220 },
        { nome: "Celular", preco: 1800 },
        { nome: "Tablet", preco: 1400 },
        { nome: "Carregador", preco: 90 },
        { nome: "Pen Drive", preco: 50 }
    ];

    function renderizarProdutos() {

        if (!$("listaProdutos")) return;

        const filtro =
            $("filtroProduto").value.toLowerCase().trim();

        $("listaProdutos").innerHTML = "";

        produtos
            .filter((produto) =>
                produto.nome.toLowerCase().includes(filtro)
            )
            .forEach((produto) => {

                const li =
                    document.createElement("li");

                li.style.marginBottom = "8px";

                li.textContent =
                    `${produto.nome} — ${formatarMoeda(produto.preco)}`;

                $("listaProdutos").appendChild(li);
            });
    }

    if ($("filtroProduto")) {

        $("filtroProduto").addEventListener(
            "input",
            renderizarProdutos
        );
    }

    renderizarProdutos();


    /* =====================================================
       16. CALCULADORA DE MÉDIA
       ===================================================== */

    let notas = [];

    function renderizarNotas() {

        const lista = $("listaNotas");

        if (!lista) return;

        lista.innerHTML = "";

        notas.forEach((nota, index) => {

            const li =
                document.createElement("li");

            li.style.marginBottom = "5px";

            li.textContent =
                `Nota ${index + 1}: ${nota.toFixed(1)}`;

            lista.appendChild(li);
        });

        const media =
            notas.length > 0
                ? notas.reduce((a, b) => a + b, 0) / notas.length
                : 0;

        $("mediaResultado").textContent =
            media.toFixed(2);
    }

    if ($("notaForm")) {

        $("notaForm").addEventListener("submit", (e) => {

            e.preventDefault();

            const nota = Number($("notaInput").value);

            if (
                $("notaInput").value === "" ||
                nota < 0 ||
                nota > 10
            ) {
                alert("Digite uma nota entre 0 e 10.");
                return;
            }

            notas.push(nota);

            $("notaInput").value = "";

            renderizarNotas();
        });
    }


    /* =====================================================
       17. GERADOR DE CORES RGB
       ===================================================== */

    if ($("btnGerarCor")) {

        $("btnGerarCor").addEventListener("click", () => {

            const r =
                Math.floor(Math.random() * 256);

            const g =
                Math.floor(Math.random() * 256);

            const b =
                Math.floor(Math.random() * 256);

            const rgb =
                `rgb(${r}, ${g}, ${b})`;

            $("corBox").style.backgroundColor = rgb;

            $("codigoCor").textContent =
                `RGB(${r}, ${g}, ${b})`;

            // Calcula luminância para melhorar a leitura
            const luminancia =
                (0.299 * r) +
                (0.587 * g) +
                (0.114 * b);

            $("codigoCor").style.color =
                luminancia > 150
                    ? "#000000"
                    : "#ffffff";
        });
    }


    /* =====================================================
       18. CONVERSOR DE UNIDADES
       ===================================================== */

    if ($("btnConverterUnidade")) {

        $("btnConverterUnidade").addEventListener(
            "click",
            () => {

                const tipo =
                    $("tipoConversao").value;

                const valor =
                    Number($("valorOriginal").value);

                if (
                    $("valorOriginal").value === "" ||
                    isNaN(valor)
                ) {
                    mostrarMensagem(
                        $("conversaoResultado"),
                        "Digite um valor válido.",
                        "erro"
                    );
                    return;
                }

                let resultado;
                let unidade;

                if (tipo === "km_mi") {

                    resultado = valor * 0.621371;
                    unidade = "milhas";

                } else {

                    // Litro para galão americano
                    resultado = valor * 0.264172;
                    unidade = "galões";
                }

                $("conversaoResultado").textContent =
                    `${valor} = ${resultado.toFixed(3)} ${unidade}`;
            }
        );
    }


    /* =====================================================
       19. CONTADOR DE TEXTO
       ===================================================== */

    if ($("textoInput")) {

        $("textoInput").addEventListener("input", () => {

            const texto =
                $("textoInput").value;

            $("contadorCaracteres").textContent =
                texto.length;

            const palavras =
                texto.trim() === ""
                    ? []
                    : texto.trim().split(/\s+/);

            $("contadorPalavras").textContent =
                palavras.length;
        });
    }


    /* =====================================================
       20. CALCULADORA DE MERCADO
       ===================================================== */

    let itensMercado = [];

    function atualizarMercado() {

        const lista = $("listaMercado");

        if (!lista) return;

        lista.innerHTML = "";

        let subtotal = 0;

        itensMercado.forEach((item, index) => {

            const totalItem =
                item.quantidade * item.valor;

            subtotal += totalItem;

            const li =
                document.createElement("li");

            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.gap = "10px";
            li.style.marginBottom = "8px";

            const texto =
                document.createElement("span");

            texto.textContent =
                `${item.nome} — ${item.quantidade}x — ${formatarMoeda(totalItem)}`;

            const remover =
                document.createElement("button");

            remover.type = "button";
            remover.textContent = "🗑️";
            remover.style.width = "auto";

            remover.addEventListener("click", () => {

                itensMercado.splice(index, 1);

                atualizarMercado();
            });

            li.appendChild(texto);
            li.appendChild(remover);

            lista.appendChild(li);
        });

        const descontoPercentual =
            Number($("descontoMercado").value) || 0;

        const desconto =
            subtotal * (descontoPercentual / 100);

        const total =
            subtotal - desconto;

        $("totalMercado").innerHTML = `
            Subtotal: ${formatarMoeda(subtotal)}<br>
            Desconto: ${formatarMoeda(desconto)}<br>
            <strong>Total: ${formatarMoeda(total)}</strong>
        `;
    }

    if ($("mercadoForm")) {

        $("mercadoForm").addEventListener("submit", (e) => {

            e.preventDefault();

            const nome =
                $("produtoNome").value.trim();

            const quantidade =
                Number($("produtoQtd").value);

            const valor =
                Number($("produtoValor").value);

            if (
                !nome ||
                quantidade <= 0 ||
                valor < 0 ||
                $("produtoValor").value === ""
            ) {
                alert("Preencha os dados do produto corretamente.");
                return;
            }

            itensMercado.push({
                nome,
                quantidade,
                valor
            });

            $("produtoNome").value = "";
            $("produtoQtd").value = "1";
            $("produtoValor").value = "";

            atualizarMercado();
        });
    }

    if ($("descontoMercado")) {

        $("descontoMercado").addEventListener(
            "input",
            atualizarMercado
        );
    }


    /* =====================================================
       21. RATEIO DE CONTAS
       ===================================================== */

    let pessoasRateio = [];

    function atualizarRateio() {

        const lista = $("listaPessoas");

        if (!lista) return;

        lista.innerHTML = "";

        const valorConta =
            Number($("valorConta").value) || 0;

        const totalPorcentagem =
            pessoasRateio.reduce(
                (total, pessoa) =>
                    total + pessoa.porcentagem,
                0
            );

        pessoasRateio.forEach((pessoa, index) => {

            const valorPessoa =
                valorConta *
                (pessoa.porcentagem / 100);

            const li =
                document.createElement("li");

            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.gap = "10px";
            li.style.marginBottom = "8px";

            const texto =
                document.createElement("span");

            texto.textContent =
                `${pessoa.nome} — ${pessoa.porcentagem}% — ${formatarMoeda(valorPessoa)}`;

            const remover =
                document.createElement("button");

            remover.type = "button";
            remover.textContent = "🗑️";
            remover.style.width = "auto";

            remover.addEventListener("click", () => {

                pessoasRateio.splice(index, 1);

                atualizarRateio();
            });

            li.appendChild(texto);
            li.appendChild(remover);

            lista.appendChild(li);
        });

        $("resultadoRateio").innerHTML = `
            Total da conta: <strong>${formatarMoeda(valorConta)}</strong><br>
            Porcentagem distribuída:
            <strong>${totalPorcentagem}%</strong>
        `;

        if (totalPorcentagem > 100) {

            $("avisoRateio").textContent =
                "⚠️ A porcentagem ultrapassou 100%.";

        } else if (totalPorcentagem < 100) {

            $("avisoRateio").textContent =
                `Faltam ${100 - totalPorcentagem}% para completar 100%.`;

        } else {

            $("avisoRateio").textContent =
                "✅ Rateio completo em 100%.";
        }
    }

    if ($("rateioForm")) {

        $("rateioForm").addEventListener("submit", (e) => {

            e.preventDefault();

            const nome =
                $("nomePessoa").value.trim();

            const porcentagem =
                Number($("porcentagemPessoa").value);

            if (
                !nome ||
                porcentagem <= 0 ||
                porcentagem > 100
            ) {
                alert("Digite nome e porcentagem válidos.");
                return;
            }

            const atual =
                pessoasRateio.reduce(
                    (total, pessoa) =>
                        total + pessoa.porcentagem,
                    0
                );

            if (atual + porcentagem > 100) {

                alert(
                    "A porcentagem total não pode ultrapassar 100%."
                );

                return;
            }

            pessoasRateio.push({
                nome,
                porcentagem
            });

            $("nomePessoa").value = "";

            atualizarRateio();
        });
    }

    if ($("valorConta")) {

        $("valorConta").addEventListener(
            "input",
            atualizarRateio
        );
    }


    /* =====================================================
       22. JOGO DA MEMÓRIA
       ===================================================== */

    const simbolosMemoria = [
        "🍎",
        "🍌",
        "🍇",
        "🍉",
        "🍓",
        "🍒",
        "🥝",
        "🍍"
    ];

    let cartasMemoria = [];
    let cartasViradas = [];
    let paresEncontrados = 0;
    let cliquesMemoria = 0;
    let bloqueadoMemoria = false;

    function iniciarMemoria() {

        cartasMemoria =
            [...simbolosMemoria, ...simbolosMemoria]
                .sort(() => Math.random() - 0.5)
                .map((simbolo, index) => ({
                    id: index,
                    simbolo,
                    virada: false,
                    encontrada: false
                }));

        cartasViradas = [];
        paresEncontrados = 0;
        cliquesMemoria = 0;
        bloqueadoMemoria = false;

        $("clicksMemoria").textContent = "0";
        $("resultadoMemoria").textContent = "";

        renderizarMemoria();
    }

    function renderizarMemoria() {

        const tabuleiro = $("tabuleiroMemoria");

        if (!tabuleiro) return;

        tabuleiro.innerHTML = "";

        cartasMemoria.forEach((carta) => {

            const botao =
                document.createElement("button");

            botao.type = "button";

            botao.style.width = "100%";
            botao.style.aspectRatio = "1";
            botao.style.fontSize = "2rem";
            botao.style.padding = "5px";

            if (
                carta.virada ||
                carta.encontrada
            ) {

                botao.textContent =
                    carta.simbolo;

            } else {

                botao.textContent = "❓";
            }

            botao.addEventListener(
                "click",
                () => virarCartaMemoria(carta.id)
            );

            tabuleiro.appendChild(botao);
        });
    }

    function virarCartaMemoria(id) {

        if (bloqueadoMemoria) return;

        const carta =
            cartasMemoria.find(
                (item) => item.id === id
            );

        if (
            !carta ||
            carta.virada ||
            carta.encontrada
        ) {
            return;
        }

        carta.virada = true;

        cartasViradas.push(carta);

        cliquesMemoria++;

        $("clicksMemoria").textContent =
            cliquesMemoria;

        renderizarMemoria();

        if (cartasViradas.length === 2) {

            bloqueadoMemoria = true;

            const [a, b] = cartasViradas;

            if (a.simbolo === b.simbolo) {

                a.encontrada = true;
                b.encontrada = true;

                cartasViradas = [];
                bloqueadoMemoria = false;

                paresEncontrados++;

                if (paresEncontrados === simbolosMemoria.length) {

                    $("resultadoMemoria").textContent =
                        `🎉 Você encontrou todos os pares em ${cliquesMemoria} cliques!`;
                }

                renderizarMemoria();

            } else {

                setTimeout(() => {

                    a.virada = false;
                    b.virada = false;

                    cartasViradas = [];
                    bloqueadoMemoria = false;

                    renderizarMemoria();

                }, 800);
            }
        }
    }

    if ($("btnNovoJogoMemoria")) {

        $("btnNovoJogoMemoria").addEventListener(
            "click",
            iniciarMemoria
        );
    }

    iniciarMemoria();


    /* =====================================================
       23. PEDRA PAPEL TESOURA
       ===================================================== */

    let placarVoce = 0;
    let placarPc = 0;

    const opcoesPPT = [
        "pedra",
        "papel",
        "tesoura"
    ];

    function jogarPPT(jogadaJogador) {

        const jogadaPc =
            opcoesPPT[
                Math.floor(Math.random() * 3)
            ];

        let resultado = "";

        if (jogadaJogador === jogadaPc) {

            resultado =
                `🤝 Empate! Ambos escolheram ${jogadaPc}.`;

        } else if (
            (jogadaJogador === "pedra" && jogadaPc === "tesoura") ||
            (jogadaJogador === "papel" && jogadaPc === "pedra") ||
            (jogadaJogador === "tesoura" && jogadaPc === "papel")
        ) {

            placarVoce++;

            resultado =
                `🎉 Você ganhou! Você: ${jogadaJogador} | PC: ${jogadaPc}`;

        } else {

            placarPc++;

            resultado =
                `😢 PC ganhou! Você: ${jogadaJogador} | PC: ${jogadaPc}`;
        }

        $("placarVoce").textContent = placarVoce;
        $("placarPc").textContent = placarPc;

        $("resultadoPPT").textContent =
            resultado;
    }

    document
        .querySelectorAll(".btn-ppt")
        .forEach((botao) => {

            botao.addEventListener("click", () => {

                jogarPPT(
                    botao.dataset.jogada
                );
            });
        });

    if ($("btnResetPPT")) {

        $("btnResetPPT").addEventListener("click", () => {

            placarVoce = 0;
            placarPc = 0;

            $("placarVoce").textContent = "0";
            $("placarPc").textContent = "0";

            $("resultadoPPT").textContent =
                "Escolha uma opção para jogar!";
        });
    }


    /* =====================================================
       24. CLIQUE RÁPIDO
       ===================================================== */

    let tempoCliqueJogo = 10;
    let totalCliquesJogo = 0;
    let intervaloClique = null;

    if ($("btnIniciarClique")) {

        $("btnIniciarClique").addEventListener("click", () => {

            clearInterval(intervaloClique);

            tempoCliqueJogo = 10;
            totalCliquesJogo = 0;

            $("tempoClique").textContent = "10";
            $("totalCliques").textContent = "0";

            $("btnClicar").disabled = false;
            $("btnIniciarClique").disabled = true;

            $("resultadoClique").textContent =
                "COMEÇOU! Clique o mais rápido que puder!";

            intervaloClique = setInterval(() => {

                tempoCliqueJogo--;

                $("tempoClique").textContent =
                    tempoCliqueJogo;

                if (tempoCliqueJogo <= 0) {

                    clearInterval(intervaloClique);

                    intervaloClique = null;

                    $("btnClicar").disabled = true;
                    $("btnIniciarClique").disabled = false;

                    $("resultadoClique").textContent =
                        `⏱️ Acabou! Você fez ${totalCliquesJogo} cliques em 10 segundos.`;
                }

            }, 1000);
        });
    }

    if ($("btnClicar")) {

        $("btnClicar").addEventListener("click", () => {

            if (
                tempoCliqueJogo > 0 &&
                !$("btnClicar").disabled
            ) {

                totalCliquesJogo++;

                $("totalCliques").textContent =
                    totalCliquesJogo;
            }
        });
    }


    /* =====================================================
       25. QUIZ RELÂMPAGO
       ===================================================== */

    const perguntasQuiz = [
        {
            pergunta: "Qual linguagem é usada para criar interatividade em páginas web?",
            opcoes: ["HTML", "CSS", "JavaScript", "SQL"],
            correta: 2
        },
        {
            pergunta: "Qual método transforma JSON em objeto JavaScript?",
            opcoes: [
                "JSON.parse()",
                "JSON.object()",
                "JSON.convert()",
                "JSON.toObject()"
            ],
            correta: 0
        },
        {
            pergunta: "Qual palavra declara uma constante em JavaScript?",
            opcoes: [
                "var",
                "let",
                "const",
                "static"
            ],
            correta: 2
        },
        {
            pergunta: "Qual símbolo representa comparação estrita?",
            opcoes: [
                "=",
                "==",
                "===",
                "!="
            ],
            correta: 2
        },
        {
            pergunta: "Qual método adiciona um item ao final de um array?",
            opcoes: [
                "add()",
                "push()",
                "insert()",
                "append()"
            ],
            correta: 1
        }
    ];

    let quizAtual = 0;
    let pontosQuiz = 0;

    function iniciarQuiz() {

        quizAtual = 0;
        pontosQuiz = 0;

        $("pontosQuiz").textContent = "0";
        $("resultadoQuiz").style.display = "none";

        mostrarPerguntaQuiz();
    }

    function mostrarPerguntaQuiz() {

        if (quizAtual >= perguntasQuiz.length) {

            finalizarQuiz();
            return;
        }

        const pergunta =
            perguntasQuiz[quizAtual];

        $("numPergunta").textContent =
            quizAtual + 1;

        $("textoPergunta").textContent =
            pergunta.pergunta;

        const area =
            $("opcoesQuiz");

        area.innerHTML = "";

        pergunta.opcoes.forEach(
            (opcao, index) => {

                const botao =
                    document.createElement("button");

                botao.type = "button";
                botao.textContent = opcao;

                botao.addEventListener(
                    "click",
                    () => responderQuiz(index)
                );

                area.appendChild(botao);
            }
        );
    }

    function responderQuiz(indice) {

        const pergunta =
            perguntasQuiz[quizAtual];

        const botoes =
            $("opcoesQuiz").querySelectorAll("button");

        botoes.forEach(
            (botao) => botao.disabled = true
        );

        if (indice === pergunta.correta) {

            pontosQuiz++;

            $("pontosQuiz").textContent =
                pontosQuiz;

            $("resultadoQuiz").textContent =
                "✅ Resposta correta!";

        } else {

            $("resultadoQuiz").textContent =
                `❌ Resposta errada! A correta era: ${pergunta.opcoes[pergunta.correta]}`;
        }

        $("resultadoQuiz").style.display = "block";

        setTimeout(() => {

            quizAtual++;

            mostrarPerguntaQuiz();

        }, 1000);
    }

    function finalizarQuiz() {

        $("textoPergunta").textContent =
            "🎉 Quiz finalizado!";

        $("opcoesQuiz").innerHTML = "";

        $("resultadoQuiz").style.display =
            "block";

        $("resultadoQuiz").textContent =
            `Você fez ${pontosQuiz} de ${perguntasQuiz.length} pontos!`;
    }

    if ($("btnNovoQuiz")) {

        $("btnNovoQuiz").addEventListener(
            "click",
            iniciarQuiz
        );
    }

    iniciarQuiz();


    /* =====================================================
       26. JOGO DA VELHA
       ===================================================== */

    let tamanhoVelha = 3;
    let qtdGanharVelha = 3;
    let tabuleiroVelha = [];
    let jogadorAtualVelha = "X";
    let jogoAtivoVelha = true;
    let modoVelha = "pc";
    let simboloJogadorVelha = "X";
    let simboloAdversarioVelha = "O";

    function iniciarVelha() {

        tamanhoVelha =
            Number($("tamanhoTabuleiro").value);

        qtdGanharVelha =
            Number($("qtdParaGanhar").value);

        modoVelha =
            $("modoJogo").value;

        simboloJogadorVelha =
            $("simboloJogador").value;

        simboloAdversarioVelha =
            simboloJogadorVelha === "X"
                ? "O"
                : "X";

        jogadorAtualVelha = "X";

        jogoAtivoVelha = true;

        tabuleiroVelha =
            Array(tamanhoVelha * tamanhoVelha).fill("");

        $("simboloExibido").textContent =
            simboloJogadorVelha;

        $("simboloAdversario").textContent =
            simboloAdversarioVelha;

        renderizarVelha();

        atualizarStatusVelha();

        if (
            modoVelha === "pc" &&
            jogadorAtualVelha !== simboloJogadorVelha
        ) {

            setTimeout(jogadaPCVelha, 400);
        }
    }

    function renderizarVelha() {

        const tabuleiro =
            $("tabuleiroVelha");

        if (!tabuleiro) return;

        tabuleiro.innerHTML = "";

        tabuleiro.style.display = "grid";
        tabuleiro.style.gridTemplateColumns =
            `repeat(${tamanhoVelha}, 1fr)`;
        tabuleiro.style.gap = "5px";

        tabuleiroVelha.forEach(
            (valor, index) => {

                const botao =
                    document.createElement("button");

                botao.type = "button";

                botao.style.aspectRatio = "1";
                botao.style.fontSize =
                    tamanhoVelha <= 4
                        ? "2rem"
                        : "1.5rem";

                botao.textContent = valor;

                botao.addEventListener(
                    "click",
                    () => jogarVelha(index)
                );

                tabuleiro.appendChild(botao);
            }
        );
    }

    function atualizarStatusVelha() {

        if (!$("vezJogador")) return;

        if (!jogoAtivoVelha) return;

        if (modoVelha === "pc") {

            $("vezJogador").textContent =
                jogadorAtualVelha === simboloJogadorVelha
                    ? `${jogadorAtualVelha} - Você`
                    : `${jogadorAtualVelha} - PC`;

        } else {

            $("vezJogador").textContent =
                `${jogadorAtualVelha}`;
        }
    }

    function jogarVelha(index) {

        if (!jogoAtivoVelha) return;

        if (tabuleiroVelha[index] !== "") return;

        if (
            modoVelha === "pc" &&
            jogadorAtualVelha !== simboloJogadorVelha
        ) {
            return;
        }

        tabuleiroVelha[index] =
            jogadorAtualVelha;

        verificarVelha();

        if (!jogoAtivoVelha) return;

        trocarJogadorVelha();

        renderizarVelha();
        atualizarStatusVelha();

        if (
            modoVelha === "pc" &&
            jogadorAtualVelha === simboloAdversarioVelha &&
            jogoAtivoVelha
        ) {

            setTimeout(
                jogadaPCVelha,
                400
            );
        }
    }

    function trocarJogadorVelha() {

        jogadorAtualVelha =
            jogadorAtualVelha === "X"
                ? "O"
                : "X";
    }

    function verificarVelha() {

        const vencedor =
            encontrarVencedorVelha();

        if (vencedor) {

            jogoAtivoVelha = false;

            let mensagem;

            if (
                modoVelha === "pc" &&
                vencedor === simboloJogadorVelha
            ) {

                mensagem =
                    "🎉 Você venceu!";

            } else if (
                modoVelha === "pc" &&
                vencedor === simboloAdversarioVelha
            ) {

                mensagem =
                    "🤖 O PC venceu!";

            } else {

                mensagem =
                    `🎉 Jogador ${vencedor} venceu!`;
            }

            $("resultadoVelha").textContent =
                mensagem;

            renderizarVelha();

            return;
        }

        if (
            tabuleiroVelha.every(
                (celula) => celula !== ""
            )
        ) {

            jogoAtivoVelha = false;

            $("resultadoVelha").textContent =
                "🤝 Empate!";

            renderizarVelha();
        }
    }

    function encontrarVencedorVelha() {

        const direcoes = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1]
        ];

        for (
            let linha = 0;
            linha < tamanhoVelha;
            linha++
        ) {

            for (
                let coluna = 0;
                coluna < tamanhoVelha;
                coluna++
            ) {

                const index =
                    linha * tamanhoVelha + coluna;

                const simbolo =
                    tabuleiroVelha[index];

                if (!simbolo) continue;

                for (const [dl, dc] of direcoes) {

                    let contador = 1;

                    for (
                        let passo = 1;
                        passo < qtdGanharVelha;
                        passo++
                    ) {

                        const novaLinha =
                            linha + dl * passo;

                        const novaColuna =
                            coluna + dc * passo;

                        if (
                            novaLinha < 0 ||
                            novaLinha >= tamanhoVelha ||
                            novaColuna < 0 ||
                            novaColuna >= tamanhoVelha
                        ) {
                            break;
                        }

                        const novoIndex =
                            novaLinha * tamanhoVelha +
                            novaColuna;

                        if (
                            tabuleiroVelha[novoIndex] ===
                            simbolo
                        ) {

                            contador++;

                        } else {

                            break;
                        }
                    }

                    if (
                        contador >= qtdGanharVelha
                    ) {
                        return simbolo;
                    }
                }
            }
        }

        return null;
    }

    function jogadaPCVelha() {

        if (!jogoAtivoVelha) return;

        if (
            jogadorAtualVelha !==
            simboloAdversarioVelha
        ) {
            return;
        }

        const vazias =
            tabuleiroVelha
                .map((valor, index) =>
                    valor === "" ? index : null
                )
                .filter((index) => index !== null);

        if (!vazias.length) return;

        let escolha;

        const dificuldade =
            $("dificuldadeVelha").value;

        if (dificuldade === "impossivel") {

            escolha =
                melhorJogadaVelha();

        } else if (dificuldade === "dificil") {

            escolha =
                encontrarJogadaInteligenteVelha() ??
                vazias[
                    Math.floor(
                        Math.random() * vazias.length
                    )
                ];

        } else if (dificuldade === "medio") {

            escolha =
                Math.random() < 0.6
                    ? (
                        encontrarJogadaInteligenteVelha() ??
                        vazias[
                            Math.floor(
                                Math.random() * vazias.length
                            )
                        ]
                    )
                    : vazias[
                        Math.floor(
                            Math.random() * vazias.length
                        )
                    ];

        } else {

            escolha =
                vazias[
                    Math.floor(
                        Math.random() * vazias.length
                    )
                ];
        }

        tabuleiroVelha[escolha] =
            simboloAdversarioVelha;

        verificarVelha();

        if (!jogoAtivoVelha) return;

        trocarJogadorVelha();

        renderizarVelha();
        atualizarStatusVelha();
    }

    function encontrarJogadaInteligenteVelha() {

        const vazias =
            tabuleiroVelha
                .map((valor, index) =>
                    valor === "" ? index : null
                )
                .filter((index) => index !== null);

        // Tenta ganhar
        for (const index of vazias) {

            tabuleiroVelha[index] =
                simboloAdversarioVelha;

            const venceu =
                encontrarVencedorVelha() ===
                simboloAdversarioVelha;

            tabuleiroVelha[index] = "";

            if (venceu) {
                return index;
            }
        }

        // Tenta bloquear o jogador
        for (const index of vazias) {

            tabuleiroVelha[index] =
                simboloJogadorVelha;

            const venceu =
                encontrarVencedorVelha() ===
                simboloJogadorVelha;

            tabuleiroVelha[index] = "";

            if (venceu) {
                return index;
            }
        }

        return null;
    }

    function melhorJogadaVelha() {

        const inteligente =
            encontrarJogadaInteligenteVelha();

        if (inteligente !== null) {
            return inteligente;
        }

        const centro =
            Math.floor(
                (tamanhoVelha * tamanhoVelha) / 2
            );

        if (tabuleiroVelha[centro] === "") {
            return centro;
        }

        const cantos = [
            0,
            tamanhoVelha - 1,
            tamanhoVelha * (tamanhoVelha - 1),
            tamanhoVelha * tamanhoVelha - 1
        ];

        const cantoLivre =
            cantos.find(
                (index) =>
                    index >= 0 &&
                    index < tabuleiroVelha.length &&
                    tabuleiroVelha[index] === ""
            );

        if (cantoLivre !== undefined) {
            return cantoLivre;
        }

        const vazias =
            tabuleiroVelha
                .map((valor, index) =>
                    valor === "" ? index : null
                )
                .filter((index) => index !== null);

        return vazias[
            Math.floor(
                Math.random() * vazias.length
            )
        ];
    }

    if ($("btnNovoJogoVelha")) {

        $("btnNovoJogoVelha").addEventListener(
            "click",
            iniciarVelha
        );
    }

    if ($("modoJogo")) {

        $("modoJogo").addEventListener(
            "change",
            () => {

                const contraPC =
                    $("modoJogo").value === "pc";

                $("areaDificuldade").style.display =
                    contraPC
                        ? "block"
                        : "none";

                $("areaSimbolo").style.display =
                    contraPC
                        ? "block"
                        : "none";

                iniciarVelha();
            }
        );
    }

    if ($("simboloJogador")) {

        $("simboloJogador").addEventListener(
            "change",
            iniciarVelha
        );
    }

    if ($("tamanhoTabuleiro")) {

        $("tamanhoTabuleiro").addEventListener(
            "change",
            iniciarVelha
        );
    }

    if ($("qtdParaGanhar")) {

        $("qtdParaGanhar").addEventListener(
            "change",
            () => {

                const tamanho =
                    Number($("tamanhoTabuleiro").value);

                const qtd =
                    Number($("qtdParaGanhar").value);

                if (qtd > tamanho) {

                    $("qtdParaGanhar").value =
                        tamanho >= 5
                            ? "5"
                            : tamanho >= 4
                                ? "4"
                                : "3";
                }

                iniciarVelha();
            }
        );
    }

    if ($("dificuldadeVelha")) {

        $("dificuldadeVelha").addEventListener(
            "change",
            iniciarVelha
        );
    }

    iniciarVelha();


    /* =====================================================
       27. GERADOR DE QR CODE
       ===================================================== */

    let qrAtual = null;
    let qrLogoData = null;

    const tipoQr = $("tipoQr");
    const qrConteudo = $("qrConteudo");
    const qrResultado = $("qrResultado");
    const qrTamanho = $("qrTamanho");
    const qrTamanhoValor = $("qrTamanhoValor");
    const qrCor = $("qrCor");
    const qrFundo = $("qrFundo");
    const qrLogo = $("qrLogo");

    /* -----------------------------------------------------
       PLACEHOLDERS DINÂMICOS
       ----------------------------------------------------- */

    function atualizarQrPlaceholder() {

        if (!tipoQr || !qrConteudo) return;

        const tipo = tipoQr.value;

        const placeholders = {

            texto:
                "Digite qualquer texto, mensagem ou conteúdo...",

            link:
                "https://www.exemplo.com",

            whatsapp:
                "5511999999999",

            email:
                "email@exemplo.com",

            wifi:
                "Nome da rede Wi-Fi",

            imagem:
                "https://site.com/imagem.jpg"
        };

        qrConteudo.placeholder =
            placeholders[tipo] || "Digite o conteúdo...";
    }

    if (tipoQr) {

        tipoQr.addEventListener(
            "change",
            atualizarQrPlaceholder
        );

        atualizarQrPlaceholder();
    }


    /* -----------------------------------------------------
       TAMANHO
       ----------------------------------------------------- */

    if (qrTamanho) {

        qrTamanho.addEventListener("input", () => {

            qrTamanhoValor.textContent =
                `${qrTamanho.value}px`;
        });
    }


    /* -----------------------------------------------------
       LOGO
       ----------------------------------------------------- */

    if (qrLogo) {

        qrLogo.addEventListener("change", () => {

            const arquivo =
                qrLogo.files[0];

            if (!arquivo) {

                qrLogoData = null;
                return;
            }

            if (!arquivo.type.startsWith("image/")) {

                alert("Selecione uma imagem válida.");

                qrLogo.value = "";
                qrLogoData = null;

                return;
            }

            const leitor =
                new FileReader();

            leitor.onload = (evento) => {

                qrLogoData =
                    evento.target.result;
            };

            leitor.readAsDataURL(arquivo);
        });
    }


    /* -----------------------------------------------------
       PREPARAR CONTEÚDO DO QR
       ----------------------------------------------------- */

    function prepararConteudoQR() {

        if (!qrConteudo) return "";

        const tipo =
            tipoQr.value;

        const valor =
            qrConteudo.value.trim();

        if (!valor) return "";

        switch (tipo) {

            case "link":

                if (
                    !/^https?:\/\//i.test(valor)
                ) {

                    return `https://${valor}`;
                }

                return valor;


            case "whatsapp": {

                // Remove espaços, parênteses, hífens etc.
                const numero =
                    valor.replace(/\D/g, "");

                if (!numero) return "";

                return `https://wa.me/${numero}`;
            }


            case "email": {

                if (
                    /^mailto:/i.test(valor)
                ) {
                    return valor;
                }

                return `mailto:${valor}`;
            }


            case "wifi": {

                /*
                 * Formato padrão:
                 * WIFI:T:WPA;S:REDE;P:SENHA;;
                 */

                const rede =
                    valor;

                const senha =
                    prompt(
                        "Digite a senha do Wi-Fi (deixe vazio se não houver):"
                    ) || "";

                const seguranca =
                    senha
                        ? "WPA"
                        : "nopass";

                return (
                    `WIFI:T:${seguranca};S:${escapeWifiQr(rede)};P:${escapeWifiQr(senha)};;`
                );
            }


            case "imagem":

                // QR Code guarda a URL da imagem.
                // Ao escanear, a pessoa poderá abrir a imagem.
                return valor;


            case "texto":
            default:

                return valor;
        }
    }


    /* -----------------------------------------------------
       ESCAPAR DADOS DO WI-FI
       ----------------------------------------------------- */

    function escapeWifiQr(texto) {

        return String(texto)
            .replace(/\\/g, "\\\\")
            .replace(/;/g, "\\;")
            .replace(/,/g, "\\,")
            .replace(/:/g, "\\:");
    }


    /* -----------------------------------------------------
       GERAR QR CODE
       ----------------------------------------------------- */

    function gerarQRCode() {

        if (!qrResultado) return;

        if (
            typeof QRCode === "undefined"
        ) {

            alert(
                "A biblioteca EasyQRCodeJS não foi carregada."
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

        const tamanho =
            Number(qrTamanho.value);

        const cor =
            qrCor.value;

        const fundo =
            qrFundo.value;

        qrResultado.innerHTML = "";

        /*
         * Cria um container exclusivo para o QR.
         */
        const qrContainer =
            document.createElement("div");

        qrContainer.id =
            "qrCodeGerado";

        qrContainer.style.display =
            "flex";

        qrContainer.style.justifyContent =
            "center";

        qrContainer.style.alignItems =
            "center";

        qrContainer.style.padding =
            "15px";

        qrContainer.style.background =
            fundo;

        qrContainer.style.borderRadius =
            "10px";

        qrResultado.appendChild(
            qrContainer
        );


        /*
         * Configuração da EasyQRCodeJS
         */
        const configuracao = {

            text: conteudo,

            width: tamanho,

            height: tamanho,

            colorDark: cor,

            colorLight: fundo,

            correctLevel:
                QRCode.CorrectLevel.H,

            quietZone: 10,

            quietZoneColor: fundo,

            /*
             * Logo central opcional.
             */
            logo: qrLogoData || undefined,

            logoWidth:
                qrLogoData
                    ? Math.floor(tamanho * 0.20)
                    : undefined,

            logoHeight:
                qrLogoData
                    ? Math.floor(tamanho * 0.20)
                    : undefined,

            logoBackgroundTransparent:
                false
        };


        try {

            qrAtual =
                new QRCode(
                    qrContainer,
                    configuracao
                );

            const info =
                document.createElement("p");

            info.style.marginTop = "15px";
            info.style.textAlign = "center";
            info.style.wordBreak = "break-word";
            info.style.fontSize = "0.9rem";
            info.style.opacity = "0.8";

            info.textContent =
                `Conteúdo: ${conteudo}`;

            qrResultado.appendChild(info);

        } catch (erro) {

            console.error(
                "Erro ao gerar QR Code:",
                erro
            );

            qrResultado.innerHTML = "";

            const mensagem =
                document.createElement("p");

            mensagem.textContent =
                "❌ Não foi possível gerar o QR Code.";

            mensagem.style.color =
                "#dc3545";

            qrResultado.appendChild(
                mensagem
            );
        }
    }


    /* -----------------------------------------------------
       BOTÃO GERAR
       ----------------------------------------------------- */

    if ($("btnGerarQR")) {

        $("btnGerarQR").addEventListener(
            "click",
            gerarQRCode
        );
    }


    /* -----------------------------------------------------
       BAIXAR QR CODE
       ----------------------------------------------------- */

    if ($("btnBaixarQR")) {

        $("btnBaixarQR").addEventListener(
            "click",
            () => {

                const canvas =
                    qrResultado
                        ? qrResultado.querySelector("canvas")
                        : null;

                const imagem =
                    qrResultado
                        ? qrResultado.querySelector("img")
                        : null;

                if (!canvas && !imagem) {

                    alert(
                        "Gere um QR Code primeiro."
                    );

                    return;
                }

                try {

                    let link;

                    if (canvas) {

                        link =
                            document.createElement("a");

                        link.href =
                            canvas.toDataURL(
                                "image/png"
                            );

                    } else {

                        link =
                            document.createElement("a");

                        link.href =
                            imagem.src;
                    }

                    link.download =
                        "qrcode-guilherme.png";

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                } catch (erro) {

                    console.error(
                        "Erro ao baixar QR Code:",
                        erro
                    );

                    alert(
                        "Não foi possível baixar o QR Code."
                    );
                }
            }
        );
    }


    /* -----------------------------------------------------
       LIMPAR QR CODE
       ----------------------------------------------------- */

    if ($("btnLimparQR")) {

        $("btnLimparQR").addEventListener(
            "click",
            () => {

                qrAtual = null;
                qrLogoData = null;

                if (qrConteudo) {
                    qrConteudo.value = "";
                }

                if (qrLogo) {
                    qrLogo.value = "";
                }

                if (qrResultado) {
                    qrResultado.innerHTML = "";
                }

                if (qrTamanho) {
                    qrTamanho.value = "350";
                }

                if (qrTamanhoValor) {
                    qrTamanhoValor.textContent =
                        "350px";
                }

                if (qrCor) {
                    qrCor.value = "#000000";
                }

                if (qrFundo) {
                    qrFundo.value = "#ffffff";
                }

                if (tipoQr) {
                    tipoQr.value = "texto";
                }

                atualizarQrPlaceholder();
            }
        );
    }


    /* =====================================================
       BUSCA GERAL DOS DESAFIOS
       ===================================================== */

    const buscaListas =
        $("busca-listas");

    if (buscaListas) {

        buscaListas.addEventListener(
            "input",
            () => {

                const termo =
                    buscaListas.value
                        .toLowerCase()
                        .trim();

                const cards =
                    document.querySelectorAll(
                        ".main-content > .card"
                    );

                cards.forEach((card) => {

                    const titulo =
                        card.querySelector("h3");

                    if (!titulo) return;

                    const texto =
                        titulo.textContent
                            .toLowerCase();

                    if (
                        texto.includes(termo)
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";
                    }
                });
            }
        );
    }


    /* =====================================================
       TEMA CLARO / ESCURO
       ===================================================== */

    const themeToggle =
        $("theme-toggle");

    const body =
        $("body-principal");

    const themeMeta =
        $("theme-color-meta");

    function aplicarTema(tema) {

        if (tema === "light") {

            body.classList.add("light-theme");

            if (themeToggle) {
                themeToggle.textContent = "☀️";
                themeToggle.setAttribute(
                    "aria-label",
                    "Ativar tema escuro"
                );
            }

            if (themeMeta) {
                themeMeta.content = "#f5f5f5";
            }

        } else {

            body.classList.remove("light-theme");

            if (themeToggle) {
                themeToggle.textContent = "🌙";
                themeToggle.setAttribute(
                    "aria-label",
                    "Ativar tema claro"
                );
            }

            if (themeMeta) {
                themeMeta.content = "#1a1a1a";
            }
        }
    }

    let temaSalvo =
        localStorage.getItem(
            "temaGuilherme"
        );

    if (!temaSalvo) {
        temaSalvo = "dark";
    }

    aplicarTema(temaSalvo);

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const novoTema =
                    body.classList.contains(
                        "light-theme"
                    )
                        ? "dark"
                        : "light";

                localStorage.setItem(
                    "temaGuilherme",
                    novoTema
                );

                aplicarTema(novoTema);
            }
        );
    }


    /* =====================================================
       FINALIZAÇÃO
       ===================================================== */

    console.log(
        "✅ Todos os 27 desafios JavaScript foram carregados."
    );

    console.log(
        "✅ Gerador de QR Code EasyQRCodeJS pronto."
    );

});