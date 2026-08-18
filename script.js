/* =========================================================
   DESAFIOS JS INTERATIVOS
   GUILHERME - Mini-Aplicações JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. DIA DA SEMANA
       ===================================================== */

    const formDia = document.getElementById("form");

    if (formDia) {
        formDia.addEventListener("submit", function (e) {
            e.preventDefault();

            const dia = document.getElementById("day").value
                .trim()
                .toLowerCase();

            const dias = {
                "domingo": "Domingo",
                "segunda": "Segunda-feira",
                "segunda-feira": "Segunda-feira",
                "terça": "Terça-feira",
                "terca": "Terça-feira",
                "terça-feira": "Terça-feira",
                "terca-feira": "Terça-feira",
                "quarta": "Quarta-feira",
                "quarta-feira": "Quarta-feira",
                "quinta": "Quinta-feira",
                "quinta-feira": "Quinta-feira",
                "sexta": "Sexta-feira",
                "sexta-feira": "Sexta-feira",
                "sábado": "Sábado",
                "sabado": "Sábado"
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

    const numberForm = document.getElementById("numberForm");

    if (numberForm) {
        numberForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const valor = Number(
                document.getElementById("number").value
            );

            if (Number.isNaN(valor)) {
                alert("Digite um número válido.");
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

    let numeroSecreto =
        Math.floor(Math.random() * 100) + 1;

    let tentativas = 0;

    window.adivinhar = function () {

        const input = document.getElementById("palpite");
        const mensagem = document.getElementById("mensagem");

        const palpite = Number(input.value);

        if (!palpite || palpite < 1 || palpite > 100) {
            mensagem.textContent =
                "Digite um número entre 1 e 100.";

            mensagem.className = "message-area erro";

            return;
        }

        tentativas++;

        if (palpite === numeroSecreto) {

            mensagem.textContent =
                `🎉 Acertou! O número era ${numeroSecreto}. Tentativas: ${tentativas}`;

            mensagem.className =
                "message-area sucesso";

        } else if (palpite < numeroSecreto) {

            mensagem.textContent =
                "📈 Tente um número MAIOR.";

            mensagem.className =
                "message-area aviso";

        } else {

            mensagem.textContent =
                "📉 Tente um número MENOR.";

            mensagem.className =
                "message-area aviso";
        }
    };

    window.reiniciar = function () {

        numeroSecreto =
            Math.floor(Math.random() * 100) + 1;

        tentativas = 0;

        document.getElementById("palpite").value = "";

        document.getElementById("mensagem").textContent =
            "Novo jogo iniciado!";

        document.getElementById("mensagem").className =
            "message-area";
    };


    /* =====================================================
       4. SALDO
       ===================================================== */

    const balanceForm =
        document.getElementById("balanceForm");

    if (balanceForm) {

        balanceForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const saldo =
                Number(document.getElementById("balance").value);

            if (Number.isNaN(saldo)) {
                alert("Digite um saldo válido.");
                return;
            }

            alert(
                `Seu saldo atual é: ${formatarMoeda(saldo)}`
            );
        });
    }


    /* =====================================================
       5. BOAS-VINDAS
       ===================================================== */

    const nameForm =
        document.getElementById("nameForm");

    if (nameForm) {

        nameForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const nome =
                document.getElementById("name").value.trim();

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

    const imcForm =
        document.getElementById("imcForm");

    if (imcForm) {

        imcForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const peso =
                Number(document.getElementById("peso").value);

            const altura =
                Number(document.getElementById("altura").value);

            const resultado =
                document.getElementById("imcResultado");

            if (
                !peso ||
                !altura ||
                peso <= 0 ||
                altura <= 0
            ) {
                resultado.innerHTML =
                    `<span class="erro">
                        Informe peso e altura corretamente.
                    </span>`;
                return;
            }

            const imc =
                peso / (altura * altura);

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

            resultado.innerHTML = `
                <strong>IMC: ${imc.toFixed(2)}</strong><br>
                Classificação: ${classificacao}
            `;
        });
    }

    window.limparImc = function () {

        document.getElementById("peso").value = "";
        document.getElementById("altura").value = "";
        document.getElementById("imcResultado").innerHTML = "";
    };


    /* =====================================================
       7. CELSIUS PARA FAHRENHEIT
       ===================================================== */

    const tempForm =
        document.getElementById("tempForm");

    if (tempForm) {

        tempForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const c =
                Number(document.getElementById("celsius").value);

            const resultado =
                document.getElementById("tempResultado");

            if (Number.isNaN(c)) {
                resultado.innerHTML =
                    `<span class="erro">
                        Digite uma temperatura.
                    </span>`;
                return;
            }

            const f =
                (c * 9 / 5) + 32;

            resultado.innerHTML =
                `${c.toFixed(1)} °C = <strong>${f.toFixed(1)} °F</strong>`;
        });
    }


    /* =====================================================
       8. CONTADOR DE CLIQUES
       ===================================================== */

    let contadorCliques = 0;

    const contador =
        document.getElementById("contadorCliques");

    const btnContador =
        document.getElementById("btnContador");

    const btnResetContador =
        document.getElementById("btnResetContador");

    if (btnContador) {

        btnContador.addEventListener("click", () => {

            contadorCliques++;

            contador.textContent =
                contadorCliques;
        });
    }

    if (btnResetContador) {

        btnResetContador.addEventListener("click", () => {

            contadorCliques = 0;

            contador.textContent = "0";
        });
    }


    /* =====================================================
       9. LISTA DE TAREFAS
       ===================================================== */

    let tarefas = [];

    const todoForm =
        document.getElementById("todoForm");

    const todoInput =
        document.getElementById("todoInput");

    const todoList =
        document.getElementById("todoList");

    const filtroTodo =
        document.getElementById("filtroTodo");

    function renderizarTarefas() {

        if (!todoList) return;

        const filtro =
            filtroTodo.value.trim().toLowerCase();

        todoList.innerHTML = "";

        tarefas
            .filter(tarefa =>
                tarefa.texto.toLowerCase().includes(filtro)
            )
            .forEach(tarefa => {

                const li =
                    document.createElement("li");

                if (tarefa.concluida) {
                    li.classList.add("concluida");
                }

                li.innerHTML = `
                    <span style="flex:1; cursor:pointer;">
                        ${escaparHTML(tarefa.texto)}
                    </span>

                    <button type="button">
                        ${tarefa.concluida ? "↩️" : "✓"}
                    </button>

                    <button type="button">
                        🗑️
                    </button>
                `;

                const span = li.querySelector("span");
                const botoes = li.querySelectorAll("button");

                span.addEventListener("click", () => {

                    tarefa.concluida =
                        !tarefa.concluida;

                    renderizarTarefas();
                });

                botoes[0].addEventListener("click", () => {

                    tarefa.concluida =
                        !tarefa.concluida;

                    renderizarTarefas();
                });

                botoes[1].addEventListener("click", () => {

                    tarefas =
                        tarefas.filter(t => t !== tarefa);

                    renderizarTarefas();
                });

                todoList.appendChild(li);
            });
    }

    if (todoForm) {

        todoForm.addEventListener("submit", e => {

            e.preventDefault();

            const texto =
                todoInput.value.trim();

            if (!texto) return;

            tarefas.push({
                texto: texto,
                concluida: false
            });

            todoInput.value = "";

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
    let timerSegundos = 60;

    const minutosInput =
        document.getElementById("minutos");

    const segundosInput =
        document.getElementById("segundos");

    const timerDisplay =
        document.getElementById("timerDisplay");

    const btnIniciarTimer =
        document.getElementById("btnIniciarTimer");

    const btnPararTimer =
        document.getElementById("btnPararTimer");

    const btnResetTimer =
        document.getElementById("btnResetTimer");

    function atualizarTimer() {

        const min =
            Math.floor(timerSegundos / 60);

        const seg =
            timerSegundos % 60;

        timerDisplay.textContent =
            `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
    }

    function pararTimer() {

        clearInterval(timerInterval);

        timerInterval = null;

        btnIniciarTimer.disabled = false;
        btnPararTimer.disabled = true;
    }

    if (btnIniciarTimer) {

        btnIniciarTimer.addEventListener("click", () => {

            if (timerInterval) return;

            if (timerSegundos <= 0) {

                const minutos =
                    Number(minutosInput.value) || 0;

                const segundos =
                    Number(segundosInput.value) || 0;

                timerSegundos =
                    minutos * 60 + segundos;
            }

            if (timerSegundos <= 0) {
                alert("Informe um tempo maior que zero.");
                return;
            }

            btnIniciarTimer.disabled = true;
            btnPararTimer.disabled = false;

            timerInterval =
                setInterval(() => {

                    timerSegundos--;

                    atualizarTimer();

                    if (timerSegundos <= 0) {

                        pararTimer();

                        alert("⏰ Tempo esgotado!");
                    }

                }, 1000);
        });
    }

    if (btnPararTimer) {

        btnPararTimer.addEventListener(
            "click",
            pararTimer
        );
    }

    if (btnResetTimer) {

        btnResetTimer.addEventListener("click", () => {

            pararTimer();

            const minutos =
                Number(minutosInput.value) || 0;

            const segundos =
                Number(segundosInput.value) || 0;

            timerSegundos =
                minutos * 60 + segundos;

            atualizarTimer();
        });
    }


    /* =====================================================
       11. GERADOR DE SENHAS
       ===================================================== */

    const btnGerarSenha =
        document.getElementById("btnGerarSenha");

    const btnCopiarSenha =
        document.getElementById("btnCopiarSenha");

    if (btnGerarSenha) {

        btnGerarSenha.addEventListener(
            "click",
            gerarSenha
        );
    }

    function gerarSenha() {

        const tamanho =
            Number(
                document.getElementById("tamanhoSenha").value
            );

        const maiusculas =
            document.getElementById(
                "incluirMaiusculas"
            ).checked;

        const numeros =
            document.getElementById(
                "incluirNumeros"
            ).checked;

        const simbolos =
            document.getElementById(
                "incluirSimbolos"
            ).checked;

        const minusculas =
            "abcdefghijklmnopqrstuvwxyz";

        const letrasMaiusculas =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const numerosChars =
            "0123456789";

        const simbolosChars =
            "!@#$%&*+-=?";

        let caracteres =
            minusculas;

        if (maiusculas)
            caracteres += letrasMaiusculas;

        if (numeros)
            caracteres += numerosChars;

        if (simbolos)
            caracteres += simbolosChars;

        if (!caracteres) {
            alert("Selecione pelo menos uma opção.");
            return;
        }

        let senha = "";

        for (let i = 0; i < tamanho; i++) {

            const indice =
                Math.floor(
                    Math.random() * caracteres.length
                );

            senha += caracteres[indice];
        }

        document.getElementById(
            "senhaGerada"
        ).value = senha;
    }

    if (btnCopiarSenha) {

        btnCopiarSenha.addEventListener(
            "click",
            async () => {

                const senha =
                    document.getElementById(
                        "senhaGerada"
                    ).value;

                if (!senha) {
                    alert("Gere uma senha primeiro.");
                    return;
                }

                try {

                    await navigator.clipboard.writeText(senha);

                    alert("Senha copiada! 📋");

                } catch {

                    alert(
                        "Não foi possível copiar automaticamente."
                    );
                }
            }
        );
    }


    /* =====================================================
       12. CALCULADORA DE GORJETA
       ===================================================== */

    window.calcularGorjeta = function () {

        const conta =
            Number(
                document.getElementById(
                    "contaValor"
                ).value
            ) || 0;

        const porcentagem =
            Number(
                document.getElementById(
                    "gorjetaPorcentagem"
                ).value
            ) || 0;

        const pessoas =
            Number(
                document.getElementById(
                    "numPessoas"
                ).value
            ) || 1;

        const valorGorjeta =
            conta * (porcentagem / 100);

        const total =
            conta + valorGorjeta;

        const porPessoa =
            total / pessoas;

        document.getElementById(
            "gorjetaResultado"
        ).innerHTML = `
            Gorjeta: <strong>${formatarMoeda(valorGorjeta)}</strong><br>
            Total: <strong>${formatarMoeda(total)}</strong><br>
            Por pessoa: <strong>${formatarMoeda(porPessoa)}</strong>
        `;
    };

    const btnGorjeta =
        document.getElementById(
            "btnCalcularGorjeta"
        );

    if (btnGorjeta) {

        btnGorjeta.addEventListener(
            "click",
            calcularGorjeta
        );
    }

    calcularGorjeta();


    /* =====================================================
       13. EDITOR DE ESTILOS
       ===================================================== */

    const corTexto =
        document.getElementById("corTexto");

    const tamanhoFonte =
        document.getElementById("tamanhoFonte");

    const blocoExemplo =
        document.getElementById("blocoExemplo");

    if (corTexto) {

        corTexto.addEventListener(
            "input",
            () => {

                blocoExemplo.style.color =
                    corTexto.value;
            }
        );
    }

    if (tamanhoFonte) {

        tamanhoFonte.addEventListener(
            "input",
            () => {

                blocoExemplo.style.fontSize =
                    `${tamanhoFonte.value}px`;
            }
        );
    }


    /* =====================================================
       14. VALIDADOR DE LOGIN
       ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                const email =
                    document.getElementById(
                        "loginEmail"
                    ).value.trim();

                const senha =
                    document.getElementById(
                        "loginSenha"
                    ).value;

                const emailError =
                    document.getElementById(
                        "emailError"
                    );

                const senhaError =
                    document.getElementById(
                        "senhaError"
                    );

                emailError.textContent = "";
                senhaError.textContent = "";

                let valido = true;

                const emailValido =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailValido.test(email)) {

                    emailError.textContent =
                        "Digite um email válido.";

                    valido = false;
                }

                if (senha.length < 6) {

                    senhaError.textContent =
                        "A senha precisa ter pelo menos 6 caracteres.";

                    valido = false;
                }

                if (valido) {

                    alert(
                        "Login validado com sucesso! ✅"
                    );
                }
            }
        );
    }


    /* =====================================================
       15. CATÁLOGO DE PRODUTOS
       ===================================================== */

    const produtos = [
        { nome: "Notebook", preco: 3500 },
        { nome: "Celular", preco: 1800 },
        { nome: "Teclado Mecânico", preco: 250 },
        { nome: "Mouse Gamer", preco: 150 },
        { nome: "Monitor", preco: 1200 },
        { nome: "Fone de Ouvido", preco: 180 },
        { nome: "Webcam", preco: 300 },
        { nome: "Cadeira Gamer", preco: 900 },
        { nome: "Mousepad", preco: 80 },
        { nome: "HD Externo", preco: 400 }
    ];

    const listaProdutos =
        document.getElementById(
            "listaProdutos"
        );

    const filtroProduto =
        document.getElementById(
            "filtroProduto"
        );

    function renderizarProdutos() {

        if (!listaProdutos) return;

        const filtro =
            filtroProduto.value
                .trim()
                .toLowerCase();

        listaProdutos.innerHTML = "";

        const encontrados =
            produtos.filter(produto =>
                produto.nome
                    .toLowerCase()
                    .includes(filtro)
            );

        if (encontrados.length === 0) {

            listaProdutos.innerHTML =
                "<li>Nenhum produto encontrado.</li>";

            return;
        }

        encontrados.forEach(produto => {

            const li =
                document.createElement("li");

            li.innerHTML = `
                <strong>${produto.nome}</strong>
                <br>
                ${formatarMoeda(produto.preco)}
            `;

            listaProdutos.appendChild(li);
        });
    }

    if (filtroProduto) {

        filtroProduto.addEventListener(
            "input",
            renderizarProdutos
        );
    }

    renderizarProdutos();


    /* =====================================================
       16. CALCULADORA DE MÉDIA
       ===================================================== */

    let notas = [];

    const notaForm =
        document.getElementById(
            "notaForm"
        );

    function atualizarMedia() {

        const lista =
            document.getElementById(
                "listaNotas"
            );

        const resultado =
            document.getElementById(
                "mediaResultado"
            );

        lista.innerHTML = "";

        notas.forEach((nota, index) => {

            const li =
                document.createElement("li");

            li.textContent =
                `Nota ${index + 1}: ${nota.toFixed(1)}`;

            lista.appendChild(li);
        });

        if (notas.length === 0) {

            resultado.textContent = "0.0";

            return;
        }

        const soma =
            notas.reduce(
                (total, nota) => total + nota,
                0
            );

        const media =
            soma / notas.length;

        resultado.textContent =
            media.toFixed(2);
    }

    if (notaForm) {

        notaForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                const input =
                    document.getElementById(
                        "notaInput"
                    );

                const nota =
                    Number(input.value);

                if (
                    Number.isNaN(nota) ||
                    nota < 0 ||
                    nota > 10
                ) {
                    alert(
                        "Digite uma nota entre 0 e 10."
                    );

                    return;
                }

                notas.push(nota);

                input.value = "";

                atualizarMedia();
            }
        );
    }


    /* =====================================================
       17. GERADOR DE CORES RGB
       ===================================================== */

    const btnGerarCor =
        document.getElementById(
            "btnGerarCor"
        );

    if (btnGerarCor) {

        btnGerarCor.addEventListener(
            "click",
            gerarCor
        );
    }

    function gerarCor() {

        const r =
            Math.floor(Math.random() * 256);

        const g =
            Math.floor(Math.random() * 256);

        const b =
            Math.floor(Math.random() * 256);

        const rgb =
            `rgb(${r}, ${g}, ${b})`;

        document.getElementById(
            "corBox"
        ).style.backgroundColor = rgb;

        document.getElementById(
            "codigoCor"
        ).textContent =
            `RGB(${r}, ${g}, ${b})`;

        document.getElementById(
            "codigoCor"
        ).style.color =
            obterCorTexto(r, g, b);
    }

    function obterCorTexto(r, g, b) {

        const luminosidade =
            (r * 299 + g * 587 + b * 114) / 1000;

        return luminosidade > 150
            ? "#111111"
            : "#ffffff";
    }


    /* =====================================================
       18. CONVERSOR DE UNIDADES
       ===================================================== */

    const btnConverterUnidade =
        document.getElementById(
            "btnConverterUnidade"
        );

    if (btnConverterUnidade) {

        btnConverterUnidade.addEventListener(
            "click",
            () => {

                const tipo =
                    document.getElementById(
                        "tipoConversao"
                    ).value;

                const valor =
                    Number(
                        document.getElementById(
                            "valorOriginal"
                        ).value
                    );

                const resultado =
                    document.getElementById(
                        "conversaoResultado"
                    );

                if (Number.isNaN(valor)) {

                    resultado.textContent =
                        "Digite um valor válido.";

                    return;
                }

                if (tipo === "km_mi") {

                    const milhas =
                        valor * 0.621371;

                    resultado.innerHTML =
                        `${valor} km = <strong>${milhas.toFixed(2)} milhas</strong>`;

                } else {

                    const galoes =
                        valor * 0.264172;

                    resultado.innerHTML =
                        `${valor} L = <strong>${galoes.toFixed(2)} galões</strong>`;
                }
            }
        );
    }


    /* =====================================================
       19. CONTADOR DE TEXTO
       ===================================================== */

    const textoInput =
        document.getElementById(
            "textoInput"
        );

    if (textoInput) {

        textoInput.addEventListener(
            "input",
            () => {

                const texto =
                    textoInput.value;

                const caracteres =
                    texto.length;

                const palavras =
                    texto.trim() === ""
                        ? 0
                        : texto.trim().split(/\s+/).length;

                document.getElementById(
                    "contadorCaracteres"
                ).textContent =
                    caracteres;

                document.getElementById(
                    "contadorPalavras"
                ).textContent =
                    palavras;
            }
        );
    }


    /* =====================================================
       20. CALCULADORA DE MERCADO
       ===================================================== */

    let produtosMercado = [];

    const mercadoForm =
        document.getElementById(
            "mercadoForm"
        );

    function renderizarMercado() {

        const lista =
            document.getElementById(
                "listaMercado"
            );

        lista.innerHTML = "";

        produtosMercado.forEach(
            (produto, index) => {

                const li =
                    document.createElement("li");

                const subtotal =
                    produto.quantidade *
                    produto.valor;

                li.innerHTML = `
                    <strong>${escaparHTML(produto.nome)}</strong>
                    <br>
                    ${produto.quantidade} ×
                    ${formatarMoeda(produto.valor)}
                    =
                    <strong>${formatarMoeda(subtotal)}</strong>

                    <button
                        type="button"
                        style="float:right;background:#ef4444;"
                    >
                        Remover
                    </button>
                `;

                li.querySelector("button")
                    .addEventListener(
                        "click",
                        () => {

                            produtosMercado.splice(
                                index,
                                1
                            );

                            renderizarMercado();
                            calcularTotalMercado();
                        }
                    );

                lista.appendChild(li);
            }
        );

        calcularTotalMercado();
    }

    window.calcularTotalMercado =
        function () {

            const subtotal =
                produtosMercado.reduce(
                    (total, produto) =>
                        total +
                        produto.quantidade *
                        produto.valor,
                    0
                );

            const desconto =
                Number(
                    document.getElementById(
                        "descontoMercado"
                    ).value
                ) || 0;

            const valorDesconto =
                subtotal *
                (desconto / 100);

            const total =
                subtotal -
                valorDesconto;

            document.getElementById(
                "totalMercado"
            ).innerHTML = `
                Subtotal: ${formatarMoeda(subtotal)}<br>
                Desconto: ${formatarMoeda(valorDesconto)}<br>
                <strong>Total: ${formatarMoeda(total)}</strong>
            `;
        };

    if (mercadoForm) {

        mercadoForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                const nome =
                    document.getElementById(
                        "produtoNome"
                    ).value.trim();

                const quantidade =
                    Number(
                        document.getElementById(
                            "produtoQtd"
                        ).value
                    );

                const valor =
                    Number(
                        document.getElementById(
                            "produtoValor"
                        ).value
                    );

                if (
                    !nome ||
                    quantidade <= 0 ||
                    valor < 0 ||
                    Number.isNaN(valor)
                ) {
                    alert(
                        "Preencha os dados do produto corretamente."
                    );

                    return;
                }

                produtosMercado.push({
                    nome,
                    quantidade,
                    valor
                });

                document.getElementById(
                    "produtoNome"
                ).value = "";

                document.getElementById(
                    "produtoQtd"
                ).value = "1";

                document.getElementById(
                    "produtoValor"
                ).value = "";

                renderizarMercado();
            }
        );
    }


    /* =====================================================
       21. RATEIO DE CONTAS
       ===================================================== */

    let pessoasRateio = [];

    const rateioForm =
        document.getElementById(
            "rateioForm"
        );

    function renderizarRateio() {

        const lista =
            document.getElementById(
                "listaPessoas"
            );

        lista.innerHTML = "";

        pessoasRateio.forEach(
            (pessoa, index) => {

                const li =
                    document.createElement("li");

                li.innerHTML = `
                    <strong>${escaparHTML(pessoa.nome)}</strong>
                    — ${pessoa.porcentagem}%

                    <button
                        type="button"
                        style="float:right;background:#ef4444;"
                    >
                        Remover
                    </button>
                `;

                li.querySelector("button")
                    .addEventListener(
                        "click",
                        () => {

                            pessoasRateio.splice(
                                index,
                                1
                            );

                            renderizarRateio();
                            calcularRateio();
                        }
                    );

                lista.appendChild(li);
            }
        );

        calcularRateio();
    }

    window.calcularRateio =
        function () {

            const valor =
                Number(
                    document.getElementById(
                        "valorConta"
                    ).value
                ) || 0;

            const soma =
                pessoasRateio.reduce(
                    (total, pessoa) =>
                        total + pessoa.porcentagem,
                    0
                );

            const resultado =
                document.getElementById(
                    "resultadoRateio"
                );

            const aviso =
                document.getElementById(
                    "avisoRateio"
                );

            aviso.textContent = "";

            if (pessoasRateio.length === 0) {

                resultado.textContent =
                    "Adicione pessoas para calcular o rateio.";

                return;
            }

            pessoasRateio.forEach(pessoa => {

                pessoa.valor =
                    valor *
                    (pessoa.porcentagem / 100);
            });

            resultado.innerHTML =
                pessoasRateio.map(pessoa => `
                    <div>
                        <strong>
                            ${escaparHTML(pessoa.nome)}
                        </strong>:
                        ${formatarMoeda(pessoa.valor)}
                    </div>
                `).join("");

            if (soma < 100) {

                aviso.textContent =
                    `⚠️ As porcentagens somam ${soma}%. Ainda faltam ${100 - soma}%.`;

            } else if (soma > 100) {

                aviso.textContent =
                    `⚠️ As porcentagens somam ${soma}%, ultrapassando 100%.`;

            } else {

                aviso.textContent =
                    "✅ Rateio completo: 100%.";
            }
        };

    if (rateioForm) {

        rateioForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                const nome =
                    document.getElementById(
                        "nomePessoa"
                    ).value.trim();

                const porcentagem =
                    Number(
                        document.getElementById(
                            "porcentagemPessoa"
                        ).value
                    );

                if (
                    !nome ||
                    Number.isNaN(porcentagem) ||
                    porcentagem < 0 ||
                    porcentagem > 100
                ) {
                    alert(
                        "Informe nome e porcentagem válidos."
                    );

                    return;
                }

                pessoasRateio.push({
                    nome,
                    porcentagem,
                    valor: 0
                });

                document.getElementById(
                    "nomePessoa"
                ).value = "";

                renderizarRateio();
            }
        );
    }


    /* =====================================================
       22. JOGO DA MEMÓRIA
       ===================================================== */

    let cartasMemoria = [];
    let primeiraCarta = null;
    let segundaCarta = null;
    let bloqueadoMemoria = false;
    let paresEncontrados = 0;
    let cliquesMemoria = 0;

    const simbolosMemoria = [
        "🍎",
        "🍌",
        "🍇",
        "🍉",
        "🍓",
        "🍍",
        "🥝",
        "🍒"
    ];

    window.iniciarJogoMemoria =
        function () {

            const tabuleiro =
                document.getElementById(
                    "tabuleiroMemoria"
                );

            cartasMemoria =
                [...simbolosMemoria, ...simbolosMemoria]
                    .sort(() => Math.random() - 0.5);

            primeiraCarta = null;
            segundaCarta = null;
            bloqueadoMemoria = false;
            paresEncontrados = 0;
            cliquesMemoria = 0;

            document.getElementById(
                "clicksMemoria"
            ).textContent = "0";

            document.getElementById(
                "resultadoMemoria"
            ).textContent = "";

            tabuleiro.innerHTML = "";

            cartasMemoria.forEach(
                (simbolo, index) => {

                    const carta =
                        document.createElement("div");

                    carta.className =
                        "memoria-carta";

                    carta.dataset.simbolo =
                        simbolo;

                    carta.dataset.index =
                        index;

                    carta.textContent = "❓";

                    carta.addEventListener(
                        "click",
                        () => virarCartaMemoria(carta)
                    );

                    tabuleiro.appendChild(carta);
                }
            );
        };

    function virarCartaMemoria(carta) {

        if (
            bloqueadoMemoria ||
            carta === primeiraCarta ||
            carta.classList.contains("encontrada")
        ) {
            return;
        }

        cliquesMemoria++;

        document.getElementById(
            "clicksMemoria"
        ).textContent =
            cliquesMemoria;

        carta.classList.add("revelada");

        carta.textContent =
            carta.dataset.simbolo;

        if (!primeiraCarta) {

            primeiraCarta = carta;

            return;
        }

        segundaCarta = carta;

        if (
            primeiraCarta.dataset.simbolo ===
            segundaCarta.dataset.simbolo
        ) {

            primeiraCarta.classList.add("encontrada");
            segundaCarta.classList.add("encontrada");

            primeiraCarta = null;
            segundaCarta = null;

            paresEncontrados++;

            if (paresEncontrados === 8) {

                document.getElementById(
                    "resultadoMemoria"
                ).innerHTML =
                    `<span class="sucesso">
                        🎉 Você encontrou todos os pares!
                    </span>`;
            }

        } else {

            bloqueadoMemoria = true;

            setTimeout(() => {

                primeiraCarta.classList.remove(
                    "revelada"
                );

                segundaCarta.classList.remove(
                    "revelada"
                );

                primeiraCarta.textContent = "❓";
                segundaCarta.textContent = "❓";

                primeiraCarta = null;
                segundaCarta = null;

                bloqueadoMemoria = false;

            }, 800);
        }
    }

    iniciarJogoMemoria();


    /* =====================================================
       23. PEDRA PAPEL TESOURA
       ===================================================== */

    let placarVoce = 0;
    let placarPc = 0;

    window.jogar = function (escolha) {

        const opcoes = [
            "pedra",
            "papel",
            "tesoura"
        ];

        const pc =
            opcoes[
                Math.floor(
                    Math.random() * opcoes.length
                )
            ];

        let resultado;

        if (escolha === pc) {

            resultado = "Empate! 🤝";

        } else if (

            (escolha === "pedra" &&
                pc === "tesoura") ||

            (escolha === "papel" &&
                pc === "pedra") ||

            (escolha === "tesoura" &&
                pc === "papel")

        ) {

            placarVoce++;

            resultado = "Você venceu! 🎉";

        } else {

            placarPc++;

            resultado = "O PC venceu! 🤖";
        }

        document.getElementById(
            "placarVoce"
        ).textContent =
            placarVoce;

        document.getElementById(
            "placarPc"
        ).textContent =
            placarPc;

        document.getElementById(
            "resultadoPPT"
        ).innerHTML = `
            Você: <strong>${escolha}</strong><br>
            PC: <strong>${pc}</strong><br>
            <br>
            ${resultado}
        `;
    };

    window.resetarPlacarPPT =
        function () {

            placarVoce = 0;
            placarPc = 0;

            document.getElementById(
                "placarVoce"
            ).textContent = "0";

            document.getElementById(
                "placarPc"
            ).textContent = "0";

            document.getElementById(
                "resultadoPPT"
            ).textContent =
                "Placar zerado! Escolha uma opção para jogar.";
        };


    /* =====================================================
       24. CLIQUE RÁPIDO
       ===================================================== */

    let jogoCliqueAtivo = false;
    let cliquesRapidos = 0;
    let tempoClique = 10;
    let intervaloClique = null;

    const btnIniciarClique =
        document.getElementById(
            "btnIniciarClique"
        );

    const btnClicar =
        document.getElementById(
            "btnClicar"
        );

    if (btnIniciarClique) {

        btnIniciarClique.addEventListener(
            "click",
            iniciarCliqueRapido
        );
    }

    if (btnClicar) {

        btnClicar.addEventListener(
            "click",
            () => {

                if (!jogoCliqueAtivo) return;

                cliquesRapidos++;

                document.getElementById(
                    "totalCliques"
                ).textContent =
                    cliquesRapidos;
            }
        );
    }

    function iniciarCliqueRapido() {

        clearInterval(intervaloClique);

        jogoCliqueAtivo = true;

        cliquesRapidos = 0;

        tempoClique = 10;

        document.getElementById(
            "totalCliques"
        ).textContent = "0";

        document.getElementById(
            "tempoClique"
        ).textContent = "10";

        document.getElementById(
            "resultadoClique"
        ).textContent =
            "VALENDO! Clique o mais rápido possível! 🔥";

        btnIniciarClique.disabled = true;
        btnClicar.disabled = false;

        intervaloClique =
            setInterval(() => {

                tempoClique--;

                document.getElementById(
                    "tempoClique"
                ).textContent =
                    tempoClique;

                if (tempoClique <= 0) {

                    finalizarCliqueRapido();
                }

            }, 1000);
    }

    function finalizarCliqueRapido() {

        clearInterval(intervaloClique);

        jogoCliqueAtivo = false;

        btnIniciarClique.disabled = false;
        btnClicar.disabled = true;

        document.getElementById(
            "resultadoClique"
        ).innerHTML = `
            ⏰ Fim de jogo!<br>
            Você conseguiu
            <strong>${cliquesRapidos}</strong>
            cliques em 10 segundos!
        `;
    }


    /* =====================================================
       25. QUIZ RELÂMPAGO
       ===================================================== */

    const perguntasQuiz = [
        {
            pergunta: "Qual linguagem é usada para dar interatividade às páginas web?",
            opcoes: [
                "HTML",
                "CSS",
                "JavaScript",
                "SQL"
            ],
            correta: 2
        },
        {
            pergunta: "Qual símbolo é usado para comentário de uma linha em JavaScript?",
            opcoes: [
                "//",
                "<!-- -->",
                "#",
                "/* */"
            ],
            correta: 0
        },
        {
            pergunta: "Qual método adiciona um item ao final de um array?",
            opcoes: [
                "pop()",
                "push()",
                "shift()",
                "add()"
            ],
            correta: 1
        },
        {
            pergunta: "Qual palavra declara uma constante em JavaScript?",
            opcoes: [
                "var",
                "let",
                "constant",
                "const"
            ],
            correta: 3
        },
        {
            pergunta: "Qual método seleciona um elemento pelo ID?",
            opcoes: [
                "getElementById()",
                "queryClass()",
                "selectId()",
                "getId()"
            ],
            correta: 0
        },
        {
            pergunta: "Qual comando mostra uma mensagem no console?",
            opcoes: [
                "print()",
                "console.log()",
                "message()",
                "log.console()"
            ],
            correta: 1
        },
        {
            pergunta: "Qual operador representa igualdade estrita?",
            opcoes: [
                "=",
                "==",
                "===",
                "!="
            ],
            correta: 2
        }
    ];

    let perguntasAtuais = [];
    let perguntaAtual = 0;
    let pontosQuiz = 0;

    window.iniciarQuiz =
        function () {

            perguntasAtuais =
                [...perguntasQuiz]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5);

            perguntaAtual = 0;
            pontosQuiz = 0;

            document.getElementById(
                "pontosQuiz"
            ).textContent = "0";

            document.getElementById(
                "resultadoQuiz"
            ).style.display = "none";

            mostrarPergunta();
        };

    function mostrarPergunta() {

        if (perguntaAtual >= 5) {

            finalizarQuiz();

            return;
        }

        const pergunta =
            perguntasAtuais[perguntaAtual];

        document.getElementById(
            "numPergunta"
        ).textContent =
            perguntaAtual + 1;

        document.getElementById(
            "textoPergunta"
        ).textContent =
            pergunta.pergunta;

        const opcoes =
            document.getElementById(
                "opcoesQuiz"
            );

        opcoes.innerHTML = "";

        pergunta.opcoes.forEach(
            (opcao, index) => {

                const button =
                    document.createElement("button");

                button.textContent =
                    opcao;

                button.addEventListener(
                    "click",
                    () => responderQuiz(index)
                );

                opcoes.appendChild(button);
            }
        );
    }

    function responderQuiz(resposta) {

        const pergunta =
            perguntasAtuais[perguntaAtual];

        const botoes =
            document.querySelectorAll(
                "#opcoesQuiz button"
            );

        botoes.forEach(
            botao => botao.disabled = true
        );

        if (resposta === pergunta.correta) {

            pontosQuiz++;

            botoes[resposta]
                .classList.add(
                    "quiz-correta"
                );

        } else {

            botoes[resposta]
                .classList.add(
                    "quiz-errada"
                );

            botoes[pergunta.correta]
                .classList.add(
                    "quiz-correta"
                );
        }

        document.getElementById(
            "pontosQuiz"
        ).textContent =
            pontosQuiz;

        setTimeout(() => {

            perguntaAtual++;

            mostrarPergunta();

        }, 900);
    }

    function finalizarQuiz() {

        document.getElementById(
            "textoPergunta"
        ).textContent =
            "Quiz finalizado!";

        document.getElementById(
            "opcoesQuiz"
        ).innerHTML = "";

        const resultado =
            document.getElementById(
                "resultadoQuiz"
            );

        resultado.style.display = "block";

        let mensagem;

        if (pontosQuiz === 5) {
            mensagem = "🏆 Perfeito!";
        } else if (pontosQuiz >= 3) {
            mensagem = "👏 Muito bom!";
        } else {
            mensagem = "💪 Continue estudando!";
        }

        resultado.innerHTML = `
            ${mensagem}<br>
            Você fez <strong>${pontosQuiz}/5</strong> pontos.
        `;
    }

    iniciarQuiz();


    /* =====================================================
       26. JOGO DA VELHA VS PC
       ===================================================== */
/* =========================================================
   26. JOGO DA VELHA - PC / PESSOA
   ========================================================= */

let tamanhoVelha = 3;
let ganharVelha = 3;

let tabuleiroVelha = [];

let jogoVelhaAtivo = false;

let modoVelha = "pc";

let jogadorHumano = "X";
let jogadorPC = "O";

let vezVelha = "X";

let dificuldadeVelha = "facil";


/* =========================================================
   INICIAR JOGO
   ========================================================= */

window.iniciarJogoVelha = function () {

    tamanhoVelha = Number(
        document.getElementById(
            "tamanhoTabuleiro"
        ).value
    );

    ganharVelha = Number(
        document.getElementById(
            "qtdParaGanhar"
        ).value
    );

    modoVelha =
        document.getElementById(
            "modoJogo"
        ).value;

    dificuldadeVelha =
        document.getElementById(
            "dificuldadeVelha"
        ).value;

    jogadorHumano =
        document.getElementById(
            "simboloJogador"
        ).value;

    jogadorPC =
        jogadorHumano === "X"
            ? "O"
            : "X";


    /* -----------------------------------------------------
       Verificar quantidade para ganhar
       ----------------------------------------------------- */

    if (ganharVelha > tamanhoVelha) {

        alert(
            "A quantidade para ganhar não pode ser maior que o tamanho do tabuleiro."
        );

        return;
    }


    /* -----------------------------------------------------
       Criar tabuleiro
       ----------------------------------------------------- */

    tabuleiroVelha =
        Array(
            tamanhoVelha *
            tamanhoVelha
        ).fill("");


    jogoVelhaAtivo = true;


    /*
     * No modo pessoa, X começa.
     *
     * No modo PC:
     * Se jogador escolheu X, começa.
     * Se jogador escolheu O, PC começa.
     */

    if (modoVelha === "pessoa") {

        vezVelha = "X";

    } else {

        vezVelha = "X";
    }


    document.getElementById(
        "resultadoVelha"
    ).textContent = "";


    atualizarInformacoesVelha();

    criarTabuleiroVelha();


    /*
     * Se o jogador escolheu O,
     * o PC começa automaticamente.
     */

    if (
        modoVelha === "pc" &&
        jogadorPC === "X"
    ) {

        setTimeout(
            jogadaPCVelha,
            500
        );
    }
};


/* =========================================================
   CRIAR TABULEIRO
   ========================================================= */

function criarTabuleiroVelha() {

    const tabuleiro =
        document.getElementById(
            "tabuleiroVelha"
        );

    tabuleiro.innerHTML = "";


    tabuleiro.style.display = "grid";

    tabuleiro.style.gridTemplateColumns =
        `repeat(${tamanhoVelha}, 1fr)`;


    /*
     * Quanto maior o tabuleiro,
     * menor o espaço entre as casas.
     */

    const gap =
        tamanhoVelha <= 4
            ? "6px"
            : "4px";

    tabuleiro.style.gap = gap;


    tabuleiroVelha.forEach(
        (valor, index) => {

            const celula =
                document.createElement(
                    "button"
                );

            celula.className =
                "velha-celula";


            celula.textContent =
                valor;


            /*
             * Ajustar tamanho da fonte
             */

            if (tamanhoVelha >= 7) {

                celula.style.fontSize =
                    "1.3rem";

            } else if (tamanhoVelha >= 5) {

                celula.style.fontSize =
                    "1.7rem";

            } else {

                celula.style.fontSize =
                    "2.5rem";
            }


            /*
             * Desabilitar casas ocupadas
             */

            if (valor !== "") {

                celula.disabled = true;
            }


            celula.addEventListener(
                "click",
                () => jogarVelha(index)
            );


            tabuleiro.appendChild(
                celula
            );
        }
    );
}


/* =========================================================
   JOGADA DO JOGADOR
   ========================================================= */

function jogarVelha(index) {

    if (!jogoVelhaAtivo) {
        return;
    }


    /*
     * Casa ocupada
     */

    if (tabuleiroVelha[index] !== "") {
        return;
    }


    /*
     * MODO PESSOA
     */

    if (modoVelha === "pessoa") {

        tabuleiroVelha[index] =
            vezVelha;

        criarTabuleiroVelha();


        if (
            verificarVitoriaVelha(
                vezVelha
            )
        ) {

            finalizarVelha(
                `🎉 Jogador ${vezVelha} venceu!`
            );

            return;
        }


        if (
            tabuleiroVelha.every(
                casa => casa !== ""
            )
        ) {

            finalizarVelha(
                "🤝 Deu empate!"
            );

            return;
        }


        /*
         * Trocar jogador
         */

        vezVelha =
            vezVelha === "X"
                ? "O"
                : "X";


        atualizarInformacoesVelha();

        return;
    }


    /*
     * MODO CONTRA PC
     */

    if (
        vezVelha !== jogadorHumano
    ) {
        return;
    }


    /*
     * Jogada do jogador humano
     */

    tabuleiroVelha[index] =
        jogadorHumano;

    criarTabuleiroVelha();


    /*
     * Verificar vitória
     */

    if (
        verificarVitoriaVelha(
            jogadorHumano
        )
    ) {

        finalizarVelha(
            "🎉 Você venceu!"
        );

        return;
    }


    /*
     * Empate
     */

    if (
        tabuleiroVelha.every(
            casa => casa !== ""
        )
    ) {

        finalizarVelha(
            "🤝 Deu empate!"
        );

        return;
    }


    /*
     * Passar para PC
     */

    vezVelha =
        jogadorPC;

    atualizarInformacoesVelha();


    /*
     * Pequeno atraso para parecer
     * que o PC está pensando.
     */

    setTimeout(
        jogadaPCVelha,
        350
    );
}


/* =========================================================
   JOGADA DO PC
   ========================================================= */

function jogadaPCVelha() {

    if (!jogoVelhaAtivo) {
        return;
    }


    if (modoVelha !== "pc") {
        return;
    }


    if (vezVelha !== jogadorPC) {
        return;
    }


    let jogada = null;


    /*
     * ================================================
     * FÁCIL
     * ================================================
     *
     * Escolhe aleatoriamente.
     */

    if (
        dificuldadeVelha === "facil"
    ) {

        jogada =
            escolherCasaAleatoria();
    }


    /*
     * ================================================
     * MÉDIO
     * ================================================
     *
     * 1. Tenta ganhar.
     * 2. Tenta bloquear.
     * 3. Caso contrário, joga aleatoriamente.
     */

    else if (
        dificuldadeVelha === "medio"
    ) {

        jogada =
            encontrarJogadaVencedora(
                jogadorPC
            );


        if (jogada === null) {

            jogada =
                encontrarJogadaVencedora(
                    jogadorHumano
                );
        }


        if (jogada === null) {

            jogada =
                escolherCasaEstrategica();
        }
    }


    /*
     * ================================================
     * DIFÍCIL
     * ================================================
     *
     * 1. Tenta ganhar.
     * 2. Bloqueia.
     * 3. Centro.
     * 4. Cantos.
     * 5. Estratégia.
     */

    else if (
        dificuldadeVelha === "dificil"
    ) {

        jogada =
            encontrarJogadaVencedora(
                jogadorPC
            );


        if (jogada === null) {

            jogada =
                encontrarJogadaVencedora(
                    jogadorHumano
                );
        }


        if (jogada === null) {

            jogada =
                escolherCasaEstrategica();
        }


        if (jogada === null) {

            jogada =
                escolherCasaAleatoria();
        }
    }


    /*
     * ================================================
     * IMPOSSÍVEL
     * ================================================
     *
     * Para 3x3 usa Minimax.
     *
     * Para tabuleiros maiores usa uma
     * inteligência estratégica.
     */

    else {

        if (
            tamanhoVelha === 3 &&
            ganharVelha === 3
        ) {

            jogada =
                melhorJogadaMinimax();

        } else {

            jogada =
                encontrarJogadaVencedora(
                    jogadorPC
                );


            if (jogada === null) {

                jogada =
                    encontrarJogadaVencedora(
                        jogadorHumano
                    );
            }


            if (jogada === null) {

                jogada =
                    escolherCasaEstrategica();
            }


            if (jogada === null) {

                jogada =
                    escolherCasaAleatoria();
            }
        }
    }


    /*
     * Garantia de jogada válida
     */

    if (
        jogada === null ||
        tabuleiroVelha[jogada] !== ""
    ) {

        jogada =
            escolherCasaAleatoria();
    }


    /*
     * Fazer jogada
     */

    tabuleiroVelha[jogada] =
        jogadorPC;


    criarTabuleiroVelha();


    /*
     * Verificar vitória
     */

    if (
        verificarVitoriaVelha(
            jogadorPC
        )
    ) {

        finalizarVelha(
            "🤖 O PC venceu!"
        );

        return;
    }


    /*
     * Verificar empate
     */

    if (
        tabuleiroVelha.every(
            casa => casa !== ""
        )
    ) {

        finalizarVelha(
            "🤝 Deu empate!"
        );

        return;
    }


    /*
     * Voltar para jogador
     */

    vezVelha =
        jogadorHumano;

    atualizarInformacoesVelha();
}


/* =========================================================
   CASA ALEATÓRIA
   ========================================================= */

function escolherCasaAleatoria() {

    const livres =
        obterCasasLivres();

    if (livres.length === 0) {
        return null;
    }


    return livres[
        Math.floor(
            Math.random() *
            livres.length
        )
    ];
}


/* =========================================================
   CASAS LIVRES
   ========================================================= */

function obterCasasLivres() {

    return tabuleiroVelha
        .map(
            (valor, index) =>
                valor === ""
                    ? index
                    : null
        )
        .filter(
            index => index !== null
        );
}


/* =========================================================
   ENCONTRAR JOGADA VENCEDORA
   ========================================================= */

function encontrarJogadaVencedora(
    jogador
) {

    const livres =
        obterCasasLivres();


    for (const index of livres) {

        tabuleiroVelha[index] =
            jogador;


        const venceu =
            verificarVitoriaVelha(
                jogador
            );


        tabuleiroVelha[index] =
            "";


        if (venceu) {
            return index;
        }
    }


    return null;
}


/* =========================================================
   CASA ESTRATÉGICA
   ========================================================= */

function escolherCasaEstrategica() {

    const livres =
        obterCasasLivres();


    if (livres.length === 0) {
        return null;
    }


    /*
     * Centro
     */

    const centro =
        Math.floor(
            (tamanhoVelha *
             tamanhoVelha) / 2
        );


    if (
        tabuleiroVelha[centro] === ""
    ) {

        return centro;
    }


    /*
     * Cantos
     */

    const cantos = [
        0,
        tamanhoVelha - 1,
        tamanhoVelha *
            (tamanhoVelha - 1),
        tamanhoVelha *
            tamanhoVelha - 1
    ];


    const cantosLivres =
        cantos.filter(
            index =>
                index >= 0 &&
                index <
                    tabuleiroVelha.length &&
                tabuleiroVelha[index] === ""
        );


    if (
        cantosLivres.length > 0
    ) {

        return cantosLivres[
            Math.floor(
                Math.random() *
                cantosLivres.length
            )
        ];
    }


    return null;
}


/* =========================================================
   MINIMAX - 3x3
   ========================================================= */

function melhorJogadaMinimax() {

    let melhorPontuacao =
        -Infinity;

    let melhorMovimento = null;


    const livres =
        obterCasasLivres();


    for (const index of livres) {

        tabuleiroVelha[index] =
            jogadorPC;


        const pontuacao =
            minimax(
                false,
                0
            );


        tabuleiroVelha[index] =
            "";


        if (
            pontuacao >
            melhorPontuacao
        ) {

            melhorPontuacao =
                pontuacao;

            melhorMovimento =
                index;
        }
    }


    return melhorMovimento;
}


/* =========================================================
   MINIMAX
   ========================================================= */

function minimax(
    maximizando,
    profundidade
) {

    if (
        verificarVitoriaVelha(
            jogadorPC
        )
    ) {

        return 10 - profundidade;
    }


    if (
        verificarVitoriaVelha(
            jogadorHumano
        )
    ) {

        return profundidade - 10;
    }


    if (
        tabuleiroVelha.every(
            casa => casa !== ""
        )
    ) {

        return 0;
    }


    const livres =
        obterCasasLivres();


    if (maximizando) {

        let melhor =
            -Infinity;


        for (
            const index of livres
        ) {

            tabuleiroVelha[index] =
                jogadorPC;


            const pontuacao =
                minimax(
                    false,
                    profundidade + 1
                );


            tabuleiroVelha[index] =
                "";


            melhor =
                Math.max(
                    melhor,
                    pontuacao
                );
        }


        return melhor;

    } else {

        let melhor =
            Infinity;


        for (
            const index of livres
        ) {

            tabuleiroVelha[index] =
                jogadorHumano;


            const pontuacao =
                minimax(
                    true,
                    profundidade + 1
                );


            tabuleiroVelha[index] =
                "";


            melhor =
                Math.min(
                    melhor,
                    pontuacao
                );
        }


        return melhor;
    }
}


/* =========================================================
   VERIFICAR VITÓRIA
   ========================================================= */

function verificarVitoriaVelha(
    jogador
) {

    const n =
        tamanhoVelha;

    const necessario =
        ganharVelha;


    /*
     * HORIZONTAL
     */

    for (
        let linha = 0;
        linha < n;
        linha++
    ) {

        for (
            let coluna = 0;
            coluna <= n - necessario;
            coluna++
        ) {

            let ganhou = true;


            for (
                let i = 0;
                i < necessario;
                i++
            ) {

                if (
                    tabuleiroVelha[
                        linha * n +
                        coluna +
                        i
                    ] !== jogador
                ) {

                    ganhou = false;

                    break;
                }
            }


            if (ganhou) {
                return true;
            }
        }
    }


    /*
     * VERTICAL
     */

    for (
        let coluna = 0;
        coluna < n;
        coluna++
    ) {

        for (
            let linha = 0;
            linha <= n - necessario;
            linha++
        ) {

            let ganhou = true;


            for (
                let i = 0;
                i < necessario;
                i++
            ) {

                if (
                    tabuleiroVelha[
                        (linha + i) * n +
                        coluna
                    ] !== jogador
                ) {

                    ganhou = false;

                    break;
                }
            }


            if (ganhou) {
                return true;
            }
        }
    }


    /*
     * DIAGONAL \
     */

    for (
        let linha = 0;
        linha <= n - necessario;
        linha++
    ) {

        for (
            let coluna = 0;
            coluna <= n - necessario;
            coluna++
        ) {

            let ganhou = true;


            for (
                let i = 0;
                i < necessario;
                i++
            ) {

                if (
                    tabuleiroVelha[
                        (linha + i) * n +
                        (coluna + i)
                    ] !== jogador
                ) {

                    ganhou = false;

                    break;
                }
            }


            if (ganhou) {
                return true;
            }
        }
    }


    /*
     * DIAGONAL /
     */

    for (
        let linha = 0;
        linha <= n - necessario;
        linha++
    ) {

        for (
            let coluna = necessario - 1;
            coluna < n;
            coluna++
        ) {

            let ganhou = true;


            for (
                let i = 0;
                i < necessario;
                i++
            ) {

                if (
                    tabuleiroVelha[
                        (linha + i) * n +
                        (coluna - i)
                    ] !== jogador
                ) {

                    ganhou = false;

                    break;
                }
            }


            if (ganhou) {
                return true;
            }
        }
    }


    return false;
}


/* =========================================================
   FINALIZAR
   ========================================================= */

function finalizarVelha(
    mensagem
) {

    jogoVelhaAtivo = false;


    document.getElementById(
        "resultadoVelha"
    ).innerHTML =
        `<strong>${mensagem}</strong>`;


    atualizarInformacoesVelha();
}


/* =========================================================
   ATUALIZAR STATUS
   ========================================================= */

function atualizarInformacoesVelha() {

    const vez =
        document.getElementById(
            "vezJogador"
        );


    const simboloExibido =
        document.getElementById(
            "simboloExibido"
        );


    const simboloAdversario =
        document.getElementById(
            "simboloAdversario"
        );


    if (
        modoVelha === "pessoa"
    ) {

        vez.textContent =
            `${vezVelha} - Jogador ${vezVelha}`;


        simboloExibido.textContent =
            "X / O";


        simboloAdversario.textContent =
            "X / O";


        return;
    }


    /*
     * Contra PC
     */

    if (
        vezVelha === jogadorHumano
    ) {

        vez.textContent =
            `${jogadorHumano} - Você`;

    } else {

        vez.textContent =
            `${jogadorPC} - PC`;
    }


    simboloExibido.textContent =
        jogadorHumano;


    simboloAdversario.textContent =
        jogadorPC;
}


/* =========================================================
   MOSTRAR / ESCONDER DIFICULDADE E SÍMBOLO
   ========================================================= */

const modoJogoElement =
    document.getElementById(
        "modoJogo"
    );


if (modoJogoElement) {

    modoJogoElement.addEventListener(
        "change",
        function () {

            const modo =
                this.value;


            const areaDificuldade =
                document.getElementById(
                    "areaDificuldade"
                );


            const areaSimbolo =
                document.getElementById(
                    "areaSimbolo"
                );


            if (
                modo === "pessoa"
            ) {

                areaDificuldade.style.display =
                    "none";

                areaSimbolo.style.display =
                    "none";

            } else {

                areaDificuldade.style.display =
                    "block";

                areaSimbolo.style.display =
                    "block";
            }
        }
    );
}


/* =========================================================
   INICIAR AUTOMATICAMENTE
   ========================================================= */

if (
    document.getElementById(
        "tamanhoTabuleiro"
    )
) {

    iniciarJogoVelha();
}