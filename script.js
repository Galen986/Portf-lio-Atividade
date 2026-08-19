/* =========================================================
   DESAFIOS JS INTERATIVOS
   GUILHERME - Mini-Aplicações JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       FUNÇÕES AUXILIARES
       ===================================================== */

    const $ = (id) => document.getElementById(id);

    const formatarMoeda = (valor) => {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    };


    /* =====================================================
       1. DIA DA SEMANA
       ===================================================== */

    const formDia = $("form");

    if (formDia) {
        formDia.addEventListener("submit", function (e) {
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
                alert(`Você informou: ${dias[dia]}`);
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
        numberForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const valor = Number($("number").value);

            if ($("number").value === "") {
                alert("Digite um número.");
                return;
            }

            if (valor > 0) {
                alert("O número é POSITIVO.");
            } else if (valor < 0) {
                alert("O número é NEGATIVO.");
            } else {
                alert("O número é ZERO.");
            }
        });
    }


    /* =====================================================
       3. JOGO DE ADIVINHAÇÃO
       ===================================================== */

    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let tentativasAdivinhacao = 0;

    window.adivinhar = function () {

        const campo = $("palpite");
        const mensagem = $("mensagem");

        if (!campo || !mensagem) return;

        const palpite = Number(campo.value);

        if (!Number.isInteger(palpite) || palpite < 1 || palpite > 100) {
            mensagem.innerHTML =
                '<span class="erro">Digite um número inteiro entre 1 e 100.</span>';
            return;
        }

        tentativasAdivinhacao++;

        if (palpite === numeroSecreto) {

            mensagem.innerHTML =
                `<span class="sucesso">
                    🎉 Parabéns! Você acertou o número ${numeroSecreto}
                    em ${tentativasAdivinhacao} tentativa(s)!
                </span>`;

            $("btnAdivinhar").disabled = true;

        } else if (palpite < numeroSecreto) {

            mensagem.innerHTML =
                `<span class="aviso">⬆️ Tente um número MAIOR.</span>`;

        } else {

            mensagem.innerHTML =
                `<span class="aviso">⬇️ Tente um número MENOR.</span>`;
        }

        campo.value = "";
        campo.focus();
    };

    window.reiniciar = function () {

        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        tentativasAdivinhacao = 0;

        if ($("mensagem")) {
            $("mensagem").textContent = "Novo jogo iniciado! Boa sorte!";
        }

        if ($("btnAdivinhar")) {
            $("btnAdivinhar").disabled = false;
        }

        if ($("palpite")) {
            $("palpite").value = "";
            $("palpite").focus();
        }
    };


    /* =====================================================
       4. SALDO ATUAL
       ===================================================== */

    const balanceForm = $("balanceForm");

    if (balanceForm) {
        balanceForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const campo = $("balance");

            if (campo.value === "") {
                alert("Digite seu saldo.");
                return;
            }

            const saldo = Number(campo.value);

            alert(`Seu saldo atual é: ${formatarMoeda(saldo)}`);
        });
    }


    /* =====================================================
       5. BOAS-VINDAS
       ===================================================== */

    const nameForm = $("nameForm");

    if (nameForm) {
        nameForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nome = $("name").value.trim();

            if (!nome) {
                alert("Digite seu nome.");
                return;
            }

            alert(`Olá, ${nome}! Seja muito bem-vindo(a)! 👋`);
        });
    }


    /* =====================================================
       6. CÁLCULO DE IMC
       ===================================================== */

    const imcForm = $("imcForm");

    if (imcForm) {
        imcForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const peso = Number($("peso").value);
            const altura = Number($("altura").value);
            const resultado = $("imcResultado");

            if (!peso || !altura || peso <= 0 || altura <= 0) {
                resultado.innerHTML =
                    '<span class="erro">Informe peso e altura corretamente.</span>';
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
                `Seu IMC é <strong>${imc.toFixed(2)}</strong><br>
                 Classificação: <strong>${classificacao}</strong>`;
        });
    }

    window.limparImc = function () {
        if ($("peso")) $("peso").value = "";
        if ($("altura")) $("altura").value = "";
        if ($("imcResultado")) $("imcResultado").innerHTML = "";
    };


    /* =====================================================
       7. CONVERSOR CELSIUS / FAHRENHEIT
       ===================================================== */

    const tempForm = $("tempForm");

    if (tempForm) {
        tempForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const campo = $("celsius");
            const resultado = $("tempResultado");

            if (campo.value === "") {
                resultado.innerHTML =
                    '<span class="erro">Digite uma temperatura.</span>';
                return;
            }

            const celsius = Number(campo.value);
            const fahrenheit = (celsius * 9 / 5) + 32;

            resultado.innerHTML =
                `<strong>${celsius.toFixed(1)} °C</strong> =
                 <strong>${fahrenheit.toFixed(1)} °F</strong>`;
        });
    }


    /* =====================================================
       8. CONTADOR DE CLIQUES
       ===================================================== */

    let contadorCliques = 0;

    const btnContador = $("btnContador");
    const btnResetContador = $("btnResetContador");

    if (btnContador) {
        btnContador.addEventListener("click", () => {

            contadorCliques++;

            $("contadorCliques").textContent = contadorCliques;
        });
    }

    if (btnResetContador) {
        btnResetContador.addEventListener("click", () => {

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

        const filtro = filtroTodo
            ? filtroTodo.value.toLowerCase().trim()
            : "";

        todoList.innerHTML = "";

        tarefas
            .filter(tarefa =>
                tarefa.texto.toLowerCase().includes(filtro)
            )
            .forEach((tarefa, index) => {

                const li = document.createElement("li");

                if (tarefa.concluida) {
                    li.classList.add("concluida");
                }

                const texto = document.createElement("span");
                texto.textContent = tarefa.texto;

                texto.style.cursor = "pointer";

                texto.addEventListener("click", () => {
                    tarefa.concluida = !tarefa.concluida;
                    renderizarTarefas();
                });

                const botoes = document.createElement("div");

                const concluir = document.createElement("button");
                concluir.textContent = tarefa.concluida
                    ? "Desfazer"
                    : "Concluir";

                concluir.addEventListener("click", () => {
                    tarefa.concluida = !tarefa.concluida;
                    renderizarTarefas();
                });

                const remover = document.createElement("button");
                remover.textContent = "Excluir";
                remover.style.backgroundColor = "var(--color-error)";

                remover.addEventListener("click", () => {
                    tarefas.splice(index, 1);
                    renderizarTarefas();
                });

                botoes.append(concluir, remover);
                li.append(texto, botoes);

                todoList.appendChild(li);
            });
    }

    if (todoForm) {
        todoForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const input = $("todoInput");
            const texto = input.value.trim();

            if (!texto) {
                alert("Digite uma tarefa.");
                return;
            }

            tarefas.push({
                texto,
                concluida: false
            });

            input.value = "";

            renderizarTarefas();
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

    function atualizarTimer() {

        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;

        if ($("timerDisplay")) {
            $("timerDisplay").textContent =
                `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
        }
    }

    function obterTempoInputs() {

        const minutos = Number($("minutos").value) || 0;
        const segundos = Number($("segundos").value) || 0;

        return Math.max(0, minutos * 60 + segundos);
    }

    $("btnIniciarTimer")?.addEventListener("click", () => {

        if (timerInterval) return;

        if (tempoRestante <= 0) {
            tempoRestante = obterTempoInputs();
        }

        if (tempoRestante <= 0) {
            alert("Informe um tempo maior que zero.");
            return;
        }

        $("btnIniciarTimer").disabled = true;
        $("btnPararTimer").disabled = false;

        timerInterval = setInterval(() => {

            tempoRestante--;

            atualizarTimer();

            if (tempoRestante <= 0) {

                clearInterval(timerInterval);
                timerInterval = null;

                $("btnIniciarTimer").disabled = false;
                $("btnPararTimer").disabled = true;

                alert("⏰ Tempo encerrado!");
            }

        }, 1000);
    });

    $("btnPararTimer")?.addEventListener("click", () => {

        clearInterval(timerInterval);
        timerInterval = null;

        $("btnIniciarTimer").disabled = false;
        $("btnPararTimer").disabled = true;
    });

    $("btnResetTimer")?.addEventListener("click", () => {

        clearInterval(timerInterval);
        timerInterval = null;

        tempoRestante = obterTempoInputs();

        atualizarTimer();

        $("btnIniciarTimer").disabled = false;
        $("btnPararTimer").disabled = true;
    });

    $("minutos")?.addEventListener("input", () => {
        if (!timerInterval) {
            tempoRestante = obterTempoInputs();
            atualizarTimer();
        }
    });

    $("segundos")?.addEventListener("input", () => {
        if (!timerInterval) {
            tempoRestante = obterTempoInputs();
            atualizarTimer();
        }
    });

    atualizarTimer();


    /* =====================================================
       11. GERADOR DE SENHAS
       ===================================================== */

    const btnGerarSenha = $("btnGerarSenha");

    function gerarSenha() {

        const tamanho = Number($("tamanhoSenha").value);

        const minusculas = "abcdefghijklmnopqrstuvwxyz";
        const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numeros = "0123456789";
        const simbolos = "!@#$%&*+-=?";

        let caracteres = minusculas;
        let obrigatorios = "";

        if ($("incluirMaiusculas").checked) {
            caracteres += maiusculas;
            obrigatorios +=
                maiusculas[Math.floor(Math.random() * maiusculas.length)];
        }

        if ($("incluirNumeros").checked) {
            caracteres += numeros;
            obrigatorios +=
                numeros[Math.floor(Math.random() * numeros.length)];
        }

        if ($("incluirSimbolos").checked) {
            caracteres += simbolos;
            obrigatorios +=
                simbolos[Math.floor(Math.random() * simbolos.length)];
        }

        if (tamanho < 4 || tamanho > 20) {
            alert("O tamanho deve estar entre 4 e 20.");
            return;
        }

        if (obrigatorios.length > tamanho) {
            alert("Escolha um tamanho maior para a senha.");
            return;
        }

        let senha = obrigatorios;

        while (senha.length < tamanho) {
            senha += caracteres[
                Math.floor(Math.random() * caracteres.length)
            ];
        }

        senha = senha
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

        $("senhaGerada").value = senha;
    }

    btnGerarSenha?.addEventListener("click", gerarSenha);

    $("btnCopiarSenha")?.addEventListener("click", async () => {

        const senha = $("senhaGerada").value;

        if (!senha) {
            alert("Gere uma senha primeiro.");
            return;
        }

        try {
            await navigator.clipboard.writeText(senha);
            alert("Senha copiada!");
        } catch {
            $("senhaGerada").select();
            document.execCommand("copy");
            alert("Senha copiada!");
        }
    });


    /* =====================================================
       12. CALCULADORA DE GORJETA
       ===================================================== */

    window.calcularGorjeta = function () {

        const conta = Number($("contaValor")?.value) || 0;
        const porcentagem = Number($("gorjetaPorcentagem")?.value) || 0;
        const pessoas = Number($("numPessoas")?.value) || 1;

        if (!$("gorjetaResultado")) return;

        if (conta < 0 || pessoas < 1) {
            $("gorjetaResultado").innerHTML =
                '<span class="erro">Informe valores válidos.</span>';
            return;
        }

        const gorjeta = conta * porcentagem / 100;
        const total = conta + gorjeta;
        const porPessoa = total / pessoas;

        $("gorjetaResultado").innerHTML =
            `Gorjeta: <strong>${formatarMoeda(gorjeta)}</strong><br>
             Total: <strong>${formatarMoeda(total)}</strong><br>
             Por pessoa: <strong>${formatarMoeda(porPessoa)}</strong>`;
    };

    $("btnCalcularGorjeta")?.addEventListener(
        "click",
        window.calcularGorjeta
    );

    window.calcularGorjeta();


    /* =====================================================
       13. EDITOR DE ESTILOS
       ===================================================== */

    $("corTexto")?.addEventListener("input", function () {

        $("blocoExemplo").style.color = this.value;
    });

    $("tamanhoFonte")?.addEventListener("input", function () {

        $("blocoExemplo").style.fontSize = `${this.value}px`;

        const output = this.nextElementSibling;

        if (output) {
            output.value = `${this.value}px`;
        }
    });


    /* =====================================================
       14. VALIDADOR DE LOGIN
       ===================================================== */

    $("loginForm")?.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = $("loginEmail").value.trim();
        const senha = $("loginSenha").value;

        $("emailError").textContent = "";
        $("senhaError").textContent = "";

        let valido = true;

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValido) {
            $("emailError").textContent =
                "Digite um email válido.";

            valido = false;
        }

        if (senha.length < 6) {
            $("senhaError").textContent =
                "A senha precisa ter pelo menos 6 caracteres.";

            valido = false;
        }

        if (valido) {
            alert("Login validado com sucesso! ✅");
        }
    });


    /* =====================================================
       15. CATÁLOGO DE PRODUTOS
       ===================================================== */

    const produtos = [
        { nome: "Notebook", preco: 3500 },
        { nome: "Mouse", preco: 80 },
        { nome: "Teclado Mecânico", preco: 250 },
        { nome: "Monitor", preco: 900 },
        { nome: "Headset", preco: 180 },
        { nome: "Webcam", preco: 220 },
        { nome: "Celular", preco: 1800 },
        { nome: "Tablet", preco: 1200 },
        { nome: "Fone Bluetooth", preco: 150 },
        { nome: "Pen Drive", preco: 50 }
    ];

    function renderizarProdutos() {

        if (!$("listaProdutos")) return;

        const filtro = $("filtroProduto").value
            .toLowerCase()
            .trim();

        $("listaProdutos").innerHTML = "";

        produtos
            .filter(produto =>
                produto.nome.toLowerCase().includes(filtro)
            )
            .forEach(produto => {

                const li = document.createElement("li");

                li.innerHTML =
                    `<strong>${produto.nome}</strong>
                     — ${formatarMoeda(produto.preco)}`;

                $("listaProdutos").appendChild(li);
            });
    }

    $("filtroProduto")?.addEventListener(
        "input",
        renderizarProdutos
    );

    renderizarProdutos();


    /* =====================================================
       16. CALCULADORA DE MÉDIA
       ===================================================== */

    let notas = [];

    $("notaForm")?.addEventListener("submit", function (e) {

        e.preventDefault();

        const input = $("notaInput");
        const nota = Number(input.value);

        if (
            input.value === "" ||
            nota < 0 ||
            nota > 10
        ) {
            alert("Digite uma nota entre 0 e 10.");
            return;
        }

        notas.push(nota);

        input.value = "";

        renderizarNotas();
    });

    function renderizarNotas() {

        $("listaNotas").innerHTML = "";

        notas.forEach((nota, index) => {

            const li = document.createElement("li");

            li.textContent = nota.toFixed(1);

            li.title = "Clique para remover";

            li.style.cursor = "pointer";

            li.addEventListener("click", () => {

                notas.splice(index, 1);

                renderizarNotas();
            });

            $("listaNotas").appendChild(li);
        });

        const media = notas.length
            ? notas.reduce((soma, nota) => soma + nota, 0) / notas.length
            : 0;

        $("mediaResultado").textContent =
            media.toFixed(1);
    }


    /* =====================================================
       17. GERADOR DE CORES RGB
       ===================================================== */

    $("btnGerarCor")?.addEventListener("click", () => {

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        const rgb = `rgb(${r}, ${g}, ${b})`;

        $("corBox").style.backgroundColor = rgb;

        $("codigoCor").textContent =
            `RGB(${r}, ${g}, ${b})`;

        const brilho =
            (r * 299 + g * 587 + b * 114) / 1000;

        $("codigoCor").style.color =
            brilho > 128 ? "#000000" : "#ffffff";
    });


    /* =====================================================
       18. CONVERSOR DE UNIDADES
       ===================================================== */

    $("btnConverterUnidade")?.addEventListener("click", () => {

        const tipo = $("tipoConversao").value;
        const valor = Number($("valorOriginal").value);

        if (!Number.isFinite(valor)) {
            $("conversaoResultado").innerHTML =
                '<span class="erro">Digite um valor válido.</span>';
            return;
        }

        let resultado;
        let unidade;

        if (tipo === "km_mi") {

            resultado = valor * 0.621371;
            unidade = "milhas";

        } else {

            resultado = valor * 0.264172;
            unidade = "galões";
        }

        $("conversaoResultado").innerHTML =
            `<strong>${valor}</strong> =
             <strong>${resultado.toFixed(2)} ${unidade}</strong>`;
    });


    /* =====================================================
       19. CONTADOR DE TEXTO
       ===================================================== */

    $("textoInput")?.addEventListener("input", function () {

        const texto = this.value;

        const caracteres = texto.length;

        const palavras = texto.trim()
            ? texto.trim().split(/\s+/).length
            : 0;

        $("contadorCaracteres").textContent = caracteres;
        $("contadorPalavras").textContent = palavras;
    });


    /* =====================================================
       20. CALCULADORA DE MERCADO
       ===================================================== */

    let produtosMercado = [];

    $("mercadoForm")?.addEventListener("submit", function (e) {

        e.preventDefault();

        const nome = $("produtoNome").value.trim();
        const quantidade = Number($("produtoQtd").value);
        const valor = Number($("produtoValor").value);

        if (!nome) {
            alert("Digite o nome do produto.");
            return;
        }

        if (quantidade <= 0 || valor < 0 || !Number.isFinite(valor)) {
            alert("Informe quantidade e valor corretamente.");
            return;
        }

        produtosMercado.push({
            nome,
            quantidade,
            valor
        });

        $("produtoNome").value = "";
        $("produtoQtd").value = 1;
        $("produtoValor").value = "";

        renderizarMercado();
        calcularTotalMercado();
    });

    function renderizarMercado() {

        $("listaMercado").innerHTML = "";

        produtosMercado.forEach((produto, index) => {

            const li = document.createElement("li");

            const subtotal =
                produto.quantidade * produto.valor;

            li.innerHTML =
                `<strong>${produto.nome}</strong>
                 — ${produto.quantidade} × ${formatarMoeda(produto.valor)}
                 = ${formatarMoeda(subtotal)}
                 <button type="button"
                         style="float:right; background:var(--color-error); margin:0;">
                    Excluir
                 </button>`;

            li.querySelector("button").addEventListener(
                "click",
                () => {

                    produtosMercado.splice(index, 1);

                    renderizarMercado();
                    calcularTotalMercado();
                }
            );

            $("listaMercado").appendChild(li);
        });
    }

    window.calcularTotalMercado = function () {

        if (!$("totalMercado")) return;

        const subtotal = produtosMercado.reduce(
            (total, produto) =>
                total + produto.quantidade * produto.valor,
            0
        );

        const desconto =
            Number($("descontoMercado").value) || 0;

        const valorDesconto =
            subtotal * desconto / 100;

        const total =
            subtotal - valorDesconto;

        $("totalMercado").innerHTML =
            `Subtotal: ${formatarMoeda(subtotal)}<br>
             Desconto: ${formatarMoeda(valorDesconto)}<br>
             <strong>Total: ${formatarMoeda(total)}</strong>`;
    };

    calcularTotalMercado();


    /* =====================================================
       21. RATEIO DE CONTAS
       ===================================================== */

    let pessoasRateio = [];

    $("rateioForm")?.addEventListener("submit", function (e) {

        e.preventDefault();

        const nome = $("nomePessoa").value.trim();
        const porcentagem = Number(
            $("porcentagemPessoa").value
        );

        if (!nome) {
            alert("Digite o nome da pessoa.");
            return;
        }

        if (
            !Number.isFinite(porcentagem) ||
            porcentagem <= 0 ||
            porcentagem > 100
        ) {
            alert("Digite uma porcentagem entre 0 e 100.");
            return;
        }

        pessoasRateio.push({
            nome,
            porcentagem
        });

        $("nomePessoa").value = "";

        renderizarRateio();
        calcularRateio();
    });

    function renderizarRateio() {

        $("listaPessoas").innerHTML = "";

        pessoasRateio.forEach((pessoa, index) => {

            const li = document.createElement("li");

            li.innerHTML =
                `<strong>${pessoa.nome}</strong>
                 — ${pessoa.porcentagem}%
                 <button type="button"
                         style="float:right; background:var(--color-error); margin:0;">
                    Excluir
                 </button>`;

            li.querySelector("button").addEventListener(
                "click",
                () => {

                    pessoasRateio.splice(index, 1);

                    renderizarRateio();
                    calcularRateio();
                }
            );

            $("listaPessoas").appendChild(li);
        });
    }

    window.calcularRateio = function () {

        if (!$("resultadoRateio")) return;

        const valorConta =
            Number($("valorConta").value) || 0;

        const somaPorcentagens =
            pessoasRateio.reduce(
                (total, pessoa) =>
                    total + pessoa.porcentagem,
                0
            );

        if (pessoasRateio.length === 0) {

            $("resultadoRateio").textContent =
                "Adicione pessoas para calcular o rateio.";

            $("avisoRateio").textContent = "";

            return;
        }

        $("resultadoRateio").innerHTML =
            pessoasRateio.map(pessoa => {

                const valor =
                    valorConta *
                    pessoa.porcentagem /
                    100;

                return `
                    <div>
                        <strong>${pessoa.nome}</strong>:
                        ${formatarMoeda(valor)}
                    </div>
                `;

            }).join("");

        $("avisoRateio").textContent =
            `Total das porcentagens: ${somaPorcentagens}%`;

        if (somaPorcentagens > 100) {
            $("avisoRateio").textContent +=
                " ⚠️ A soma ultrapassou 100%.";
        } else if (somaPorcentagens < 100) {
            $("avisoRateio").textContent +=
                " ⚠️ A soma ainda não chegou a 100%.";
        } else {
            $("avisoRateio").textContent +=
                " ✅ Rateio completo.";
        }
    };


    /* =====================================================
       22. JOGO DA MEMÓRIA
       ===================================================== */

    let cartasMemoria = [];
    let primeiraCarta = null;
    let segundaCarta = null;
    let bloqueadoMemoria = false;
    let cliquesMemoria = 0;
    let paresEncontrados = 0;

    const simbolosMemoria = [
        "🍎", "🍌", "🍇", "🍉",
        "🍓", "🍒", "🥝", "🍍"
    ];

    window.iniciarJogoMemoria = function () {

        const tabuleiro = $("tabuleiroMemoria");

        if (!tabuleiro) return;

        cartasMemoria = [
            ...simbolosMemoria,
            ...simbolosMemoria
        ].sort(() => Math.random() - 0.5);

        primeiraCarta = null;
        segundaCarta = null;
        bloqueadoMemoria = false;
        cliquesMemoria = 0;
        paresEncontrados = 0;

        $("clicksMemoria").textContent = "0";
        $("resultadoMemoria").textContent = "";

        tabuleiro.innerHTML = "";

        cartasMemoria.forEach((simbolo, index) => {

            const carta = document.createElement("button");

            carta.className = "memoria-carta";
            carta.type = "button";
            carta.dataset.index = index;
            carta.dataset.simbolo = simbolo;
            carta.textContent = "?";

            carta.addEventListener(
                "click",
                () => virarCartaMemoria(carta)
            );

            tabuleiro.appendChild(carta);
        });
    };

    function virarCartaMemoria(carta) {

        if (
            bloqueadoMemoria ||
            carta.classList.contains("revelada") ||
            carta.classList.contains("encontrada")
        ) {
            return;
        }

        carta.classList.add("revelada");
        carta.textContent = carta.dataset.simbolo;

        cliquesMemoria++;

        $("clicksMemoria").textContent =
            cliquesMemoria;

        if (!primeiraCarta) {

            primeiraCarta = carta;

            return;
        }

        segundaCarta = carta;
        bloqueadoMemoria = true;

        if (
            primeiraCarta.dataset.simbolo ===
            segundaCarta.dataset.simbolo
        ) {

            primeiraCarta.classList.add("encontrada");
            segundaCarta.classList.add("encontrada");

            paresEncontrados++;

            resetarSelecaoMemoria();

            if (paresEncontrados === simbolosMemoria.length) {

                $("resultadoMemoria").innerHTML =
                    `<span class="sucesso">
                        🎉 Parabéns! Você encontrou todos os pares!
                    </span>`;
            }

        } else {

            setTimeout(() => {

                primeiraCarta.classList.remove("revelada");
                segundaCarta.classList.remove("revelada");

                primeiraCarta.textContent = "?";
                segundaCarta.textContent = "?";

                resetarSelecaoMemoria();

            }, 800);
        }
    }

    function resetarSelecaoMemoria() {

        primeiraCarta = null;
        segundaCarta = null;
        bloqueadoMemoria = false;
    }

    iniciarJogoMemoria();


    /* =====================================================
       23. PEDRA PAPEL TESOURA
       ===================================================== */

    let placarVoce = 0;
    let placarPc = 0;

    window.jogar = function (jogadaUsuario) {

        const opcoes = [
            "pedra",
            "papel",
            "tesoura"
        ];

        const jogadaPc =
            opcoes[Math.floor(Math.random() * 3)];

        let resultado;

        if (jogadaUsuario === jogadaPc) {

            resultado = "Empate! 🤝";

        } else if (
            (jogadaUsuario === "pedra" && jogadaPc === "tesoura") ||
            (jogadaUsuario === "papel" && jogadaPc === "pedra") ||
            (jogadaUsuario === "tesoura" && jogadaPc === "papel")
        ) {

            placarVoce++;

            resultado = "Você venceu! 🎉";

        } else {

            placarPc++;

            resultado = "O PC venceu! 🤖";
        }

        $("placarVoce").textContent = placarVoce;
        $("placarPc").textContent = placarPc;

        $("resultadoPPT").innerHTML =
            `${resultado}<br>
             Você: <strong>${jogadaUsuario}</strong>
             | PC: <strong>${jogadaPc}</strong>`;
    };

    window.resetarPlacarPPT = function () {

        placarVoce = 0;
        placarPc = 0;

        $("placarVoce").textContent = "0";
        $("placarPc").textContent = "0";

        $("resultadoPPT").textContent =
            "Placar zerado! Escolha uma opção para jogar.";
    };


    /* =====================================================
       24. CLIQUE RÁPIDO
       ===================================================== */

    let tempoClique = 10;
    let totalCliques = 0;
    let intervaloClique = null;

    $("btnIniciarClique")?.addEventListener("click", () => {

        if (intervaloClique) return;

        tempoClique = 10;
        totalCliques = 0;

        $("tempoClique").textContent = tempoClique;
        $("totalCliques").textContent = totalCliques;

        $("btnIniciarClique").disabled = true;
        $("btnClicar").disabled = false;

        $("resultadoClique").textContent =
            "VALENDO! Clique o mais rápido possível! 🔥";

        intervaloClique = setInterval(() => {

            tempoClique--;

            $("tempoClique").textContent = tempoClique;

            if (tempoClique <= 0) {

                clearInterval(intervaloClique);
                intervaloClique = null;

                $("btnClicar").disabled = true;
                $("btnIniciarClique").disabled = false;

                $("resultadoClique").innerHTML =
                    `<strong>⏰ Acabou!</strong>
                     Você fez <strong>${totalCliques}</strong> cliques!`;
            }

        }, 1000);
    });

    $("btnClicar")?.addEventListener("click", () => {

        if (!intervaloClique) return;

        totalCliques++;

        $("totalCliques").textContent =
            totalCliques;
    });


    /* =====================================================
       25. QUIZ RELÂMPAGO
       ===================================================== */

    const perguntasQuiz = [
        {
            pergunta: "Qual linguagem é executada diretamente no navegador?",
            opcoes: ["JavaScript", "Python", "C++", "Java"],
            correta: 0
        },
        {
            pergunta: "Qual comando mostra algo no console?",
            opcoes: ["print()", "console.log()", "echo()", "write()"],
            correta: 1
        },
        {
            pergunta: "Qual símbolo representa uma constante em JavaScript?",
            opcoes: ["const", "let", "var", "fixed"],
            correta: 0
        },
        {
            pergunta: "Qual método adiciona um item ao final de um array?",
            opcoes: ["push()", "pop()", "shift()", "join()"],
            correta: 0
        },
        {
            pergunta: "Qual propriedade altera o conteúdo HTML de um elemento?",
            opcoes: [
                "innerHTML",
                "htmlText",
                "contentHTML",
                "changeHTML"
            ],
            correta: 0
        }
    ];

    let perguntaAtualQuiz = 0;
    let pontosQuiz = 0;
    let quizFinalizado = false;

    window.iniciarQuiz = function () {

        perguntaAtualQuiz = 0;
        pontosQuiz = 0;
        quizFinalizado = false;

        $("pontosQuiz").textContent = "0";
        $("numPergunta").textContent = "1";

        $("resultadoQuiz").style.display = "none";

        $("areaPergunta").style.display = "block";

        mostrarPerguntaQuiz();
    };

    function mostrarPerguntaQuiz() {

        const pergunta =
            perguntasQuiz[perguntaAtualQuiz];

        if (!pergunta) {
            finalizarQuiz();
            return;
        }

        $("textoPergunta").textContent =
            pergunta.pergunta;

        $("opcoesQuiz").innerHTML = "";

        pergunta.opcoes.forEach((opcao, index) => {

            const button = document.createElement("button");

            button.type = "button";
            button.textContent = opcao;

            button.addEventListener(
                "click",
                () => responderQuiz(index)
            );

            $("opcoesQuiz").appendChild(button);
        });
    }

    function responderQuiz(indice) {

        if (quizFinalizado) return;

        const pergunta =
            perguntasQuiz[perguntaAtualQuiz];

        const botoes =
            $("opcoesQuiz").querySelectorAll("button");

        botoes.forEach(button => {
            button.disabled = true;
        });

        if (indice === pergunta.correta) {

            pontosQuiz++;

            botoes[indice].classList.add(
                "quiz-correta"
            );

        } else {

            botoes[indice].classList.add(
                "quiz-errada"
            );

            botoes[pergunta.correta].classList.add(
                "quiz-correta"
            );
        }

        $("pontosQuiz").textContent =
            pontosQuiz;

        setTimeout(() => {

            perguntaAtualQuiz++;

            if (
                perguntaAtualQuiz >=
                perguntasQuiz.length
            ) {

                finalizarQuiz();

            } else {

                $("numPergunta").textContent =
                    perguntaAtualQuiz + 1;

                mostrarPerguntaQuiz();
            }

        }, 700);
    }

    function finalizarQuiz() {

        quizFinalizado = true;

        $("areaPergunta").style.display = "none";

        $("resultadoQuiz").style.display = "block";

        let mensagem;

        if (pontosQuiz === 5) {
            mensagem = "🏆 Perfeito! Você acertou tudo!";
        } else if (pontosQuiz >= 3) {
            mensagem = "👏 Muito bem! Bom resultado!";
        } else {
            mensagem = "💪 Continue estudando e tente novamente!";
        }

        $("resultadoQuiz").innerHTML =
            `${mensagem}<br>
             Você fez <strong>${pontosQuiz}/5</strong> pontos.`;
    }

    iniciarQuiz();


    /* =====================================================
       26. JOGO DA VELHA
       ===================================================== */

    let tamanhoVelha = 3;
    let vencerVelha = 3;
    let tabuleiroVelha = [];
    let jogadorAtualVelha = "X";
    let jogoVelhaAtivo = false;
    let modoVelha = "pc";
    let simboloJogador = "X";
    let simboloAdversario = "O";
    let dificuldadeVelha = "facil";


    function configurarVelha() {

        tamanhoVelha =
            Number($("tamanhoTabuleiro").value);

        vencerVelha =
            Number($("qtdParaGanhar").value);

        modoVelha =
            $("modoJogo").value;

        simboloJogador =
            $("simboloJogador").value;

        simboloAdversario =
            simboloJogador === "X" ? "O" : "X";

        dificuldadeVelha =
            $("dificuldadeVelha").value;

        /*
         * Evita uma configuração impossível.
         * Exemplo: tabuleiro 3x3 não pode exigir 5.
         */

        if (vencerVelha > tamanhoVelha) {
            vencerVelha = tamanhoVelha;
        }

        $("simboloExibido").textContent =
            simboloJogador;

        $("simboloAdversario").textContent =
            simboloAdversario;
    }


    window.iniciarJogoVelha = function () {

        configurarVelha();

        tabuleiroVelha =
            Array(tamanhoVelha * tamanhoVelha).fill("");

        jogoVelhaAtivo = true;

        jogadorAtualVelha = "X";

        renderizarVelha();

        atualizarStatusVelha();

        $("resultadoVelha").textContent = "";

        /*
         * Se o jogador escolheu O contra PC,
         * o computador começa.
         */

        if (
            modoVelha === "pc" &&
            simboloJogador !== "X"
        ) {
            setTimeout(jogadaPCVelha, 300);
        }
    };


    function renderizarVelha() {

        const tabuleiro = $("tabuleiroVelha");

        if (!tabuleiro) return;

        tabuleiro.innerHTML = "";

        tabuleiro.style.gridTemplateColumns =
            `repeat(${tamanhoVelha}, 1fr)`;

        tabuleiro.style.gridTemplateRows =
            `repeat(${tamanhoVelha}, 1fr)`;

        tabuleiroVelha.forEach((valor, index) => {

            const celula =
                document.createElement("button");

            celula.type = "button";

            celula.className = "velha-celula";

            celula.textContent = valor;

            celula.disabled =
                !jogoVelhaAtivo ||
                valor !== "" ||
                (
                    modoVelha === "pc" &&
                    jogadorAtualVelha !== simboloJogador
                );

            celula.addEventListener(
                "click",
                () => jogarVelha(index)
            );

            tabuleiro.appendChild(celula);
        });
    }


    function jogarVelha(index) {

        if (!jogoVelhaAtivo) return;

        if (tabuleiroVelha[index] !== "") return;

        if (
            modoVelha === "pc" &&
            jogadorAtualVelha !== simboloJogador
        ) {
            return;
        }

        tabuleiroVelha[index] =
            jogadorAtualVelha;

        verificarFimVelha();

        if (!jogoVelhaAtivo) return;

        trocarJogadorVelha();

        renderizarVelha();

        atualizarStatusVelha();

        if (
            modoVelha === "pc" &&
            jogadorAtualVelha === simboloAdversario
        ) {

            setTimeout(jogadaPCVelha, 300);
        }
    }


    function trocarJogadorVelha() {

        jogadorAtualVelha =
            jogadorAtualVelha === "X"
                ? "O"
                : "X";
    }


    function atualizarStatusVelha() {

        if (!$("vezJogador")) return;

        if (modoVelha === "pessoa") {

            $("vezJogador").textContent =
                `${jogadorAtualVelha} - Jogador`;

            return;
        }

        $("vezJogador").textContent =
            jogadorAtualVelha === simboloJogador
                ? `${jogadorAtualVelha} - Você`
                : `${jogadorAtualVelha} - PC 🤖`;
    }


    function verificarFimVelha() {

        const vencedor =
            verificarVencedorVelha(
                jogadorAtualVelha
            );

        if (vencedor) {

            jogoVelhaAtivo = false;

            renderizarVelha();

            if (modoVelha === "pessoa") {

                $("resultadoVelha").innerHTML =
                    `<span class="sucesso">
                        🎉 Jogador ${vencedor} venceu!
                    </span>`;

            } else {

                const mensagem =
                    vencedor === simboloJogador
                        ? "🎉 Você venceu!"
                        : "🤖 O PC venceu!";

                $("resultadoVelha").innerHTML =
                    `<span class="sucesso">${mensagem}</span>`;
            }

            return true;
        }

        if (!tabuleiroVelha.includes("")) {

            jogoVelhaAtivo = false;

            renderizarVelha();

            $("resultadoVelha").innerHTML =
                `<span class="aviso">
                    🤝 Empate!
                </span>`;

            return true;
        }

        return false;
    }


    function verificarVencedorVelha(simbolo) {

        const direcoes = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1]
        ];

        for (let linha = 0; linha < tamanhoVelha; linha++) {

            for (let coluna = 0; coluna < tamanhoVelha; coluna++) {

                const indice =
                    linha * tamanhoVelha + coluna;

                if (tabuleiroVelha[indice] !== simbolo) {
                    continue;
                }

                for (const [dl, dc] of direcoes) {

                    let quantidade = 1;

                    let novaLinha = linha + dl;
                    let novaColuna = coluna + dc;

                    while (
                        novaLinha >= 0 &&
                        novaLinha < tamanhoVelha &&
                        novaColuna >= 0 &&
                        novaColuna < tamanhoVelha
                    ) {

                        const novoIndice =
                            novaLinha * tamanhoVelha +
                            novaColuna;

                        if (
                            tabuleiroVelha[novoIndice] !==
                            simbolo
                        ) {
                            break;
                        }

                        quantidade++;

                        if (quantidade >= vencerVelha) {
                            return true;
                        }

                        novaLinha += dl;
                        novaColuna += dc;
                    }
                }
            }
        }

        return false;
    }


    /* =====================================================
       IA DO JOGO DA VELHA
       ===================================================== */

    function jogadaPCVelha() {

        if (!jogoVelhaAtivo) return;

        if (
            modoVelha !== "pc" ||
            jogadorAtualVelha !== simboloAdversario
        ) {
            return;
        }

        let indice;

        if (dificuldadeVelha === "facil") {

            indice = jogadaAleatoriaVelha();

        } else if (dificuldadeVelha === "medio") {

            indice =
                jogadaDefensivaVelha() ??
                jogadaAleatoriaVelha();

        } else if (dificuldadeVelha === "dificil") {

            indice =
                jogadaVencedoraVelha() ??
                jogadaDefensivaVelha() ??
                jogadaAleatoriaVelha();

        } else {

            /*
             * No modo impossível:
             * primeiro tenta vencer,
             * depois bloquear,
             * depois usa estratégia de posição.
             */

            indice =
                jogadaVencedoraVelha() ??
                jogadaDefensivaVelha() ??
                jogadaEstrategicaVelha();
        }

        if (indice === undefined || indice === null) {
            return;
        }

        tabuleiroVelha[indice] =
            simboloAdversario;

        verificarFimVelha();

        if (!jogoVelhaAtivo) return;

        trocarJogadorVelha();

        renderizarVelha();

        atualizarStatusVelha();
    }


    function obterVaziosVelha() {

        const vazios = [];

        tabuleiroVelha.forEach((valor, index) => {

            if (valor === "") {
                vazios.push(index);
            }
        });

        return vazios;
    }


    function jogadaAleatoriaVelha() {

        const vazios =
            obterVaziosVelha();

        if (!vazios.length) return null;

        return vazios[
            Math.floor(Math.random() * vazios.length)
        ];
    }


    function simularVitoriaVelha(indice, simbolo) {

        const anterior =
            tabuleiroVelha[indice];

        tabuleiroVelha[indice] = simbolo;

        const venceu =
            verificarVencedorVelha(simbolo);

        tabuleiroVelha[indice] = anterior;

        return venceu;
    }


    function jogadaVencedoraVelha() {

        const vazios =
            obterVaziosVelha();

        for (const indice of vazios) {

            if (
                simularVitoriaVelha(
                    indice,
                    simboloAdversario
                )
            ) {
                return indice;
            }
        }

        return null;
    }


    function jogadaDefensivaVelha() {

        const vazios =
            obterVaziosVelha();

        for (const indice of vazios) {

            if (
                simularVitoriaVelha(
                    indice,
                    simboloJogador
                )
            ) {
                return indice;
            }
        }

        return null;
    }


    function jogadaEstrategicaVelha() {

        const vazios =
            obterVaziosVelha();

        if (!vazios.length) return null;

        /*
         * Centro
         */

        const centro =
            Math.floor(
                (tamanhoVelha * tamanhoVelha) / 2
            );

        if (tabuleiroVelha[centro] === "") {
            return centro;
        }

        /*
         * Cantos
         */

        const cantos = [
            0,
            tamanhoVelha - 1,
            tamanhoVelha * (tamanhoVelha - 1),
            tamanhoVelha * tamanhoVelha - 1
        ];

        const cantosDisponiveis =
            cantos.filter(
                indice =>
                    indice >= 0 &&
                    indice < tabuleiroVelha.length &&
                    tabuleiroVelha[indice] === ""
            );

        if (cantosDisponiveis.length) {

            return cantosDisponiveis[
                Math.floor(
                    Math.random() *
                    cantosDisponiveis.length
                )
            ];
        }

        return jogadaAleatoriaVelha();
    }


    /*
     * Atualiza a área de dificuldade quando
     * o jogador escolhe "Contra Pessoa".
     */

    $("modoJogo")?.addEventListener("change", () => {

        const contraPC =
            $("modoJogo").value === "pc";

        $("areaDificuldade").style.display =
            contraPC ? "block" : "none";
    });

    /*
     * Ajusta automaticamente as opções de vitória
     * de acordo com o tamanho do tabuleiro.
     */

    $("tamanhoTabuleiro")?.addEventListener(
        "change",
        () => {

            const tamanho =
                Number($("tamanhoTabuleiro").value);

            const select =
                $("qtdParaGanhar");

            [...select.options].forEach(option => {

                option.disabled =
                    Number(option.value) > tamanho;
            });

            if (
                Number(select.value) > tamanho
            ) {
                select.value =
                    String(tamanho);
            }
        }
    );

    /*
     * Configuração inicial.
     */

    $("modoJogo")?.dispatchEvent(
        new Event("change")
    );

    $("tamanhoTabuleiro")?.dispatchEvent(
        new Event("change")
    );

    iniciarJogoVelha();


    /* =====================================================
       BUSCA GERAL DOS DESAFIOS
       ===================================================== */

    $("busca-listas")?.addEventListener(
        "input",
        function () {

            const termo =
                this.value.toLowerCase().trim();

            const cards =
                document.querySelectorAll(
                    ".main-content > .card"
                );

            cards.forEach(card => {

                const titulo =
                    card.querySelector("h3");

                if (!titulo) return;

                const texto =
                    titulo.textContent.toLowerCase();

                card.style.display =
                    texto.includes(termo)
                        ? ""
                        : "none";
            });
        }
    );


    /* =====================================================
       TEMA CLARO / ESCURO
       ===================================================== */

    const themeToggle = $("theme-toggle");
    const body = $("body-principal");
    const themeMeta = $("theme-color-meta");

    function aplicarTema(tema) {

        const claro =
            tema === "light";

        body.classList.toggle(
            "light-theme",
            claro
        );

        if (themeMeta) {

            themeMeta.setAttribute(
                "content",
                claro ? "#f3f4f6" : "#111827"
            );
        }

        if (themeToggle) {

            themeToggle.textContent =
                claro ? "☀️" : "🌙";

            themeToggle.setAttribute(
                "aria-label",
                claro
                    ? "Ativar tema escuro"
                    : "Ativar tema claro"
            );
        }
    }

    const temaSalvo =
        localStorage.getItem("tema");

    if (temaSalvo) {

        aplicarTema(temaSalvo);

    } else {

        aplicarTema("dark");
    }

    themeToggle?.addEventListener("click", () => {

        const novoTema =
            body.classList.contains("light-theme")
                ? "dark"
                : "light";

        localStorage.setItem(
            "tema",
            novoTema
        );

        aplicarTema(novoTema);
    });


    /* =====================================================
       FINALIZAÇÃO
       ===================================================== */

    console.log(
        "✅ Desafios JS carregados com sucesso!"
    );

});