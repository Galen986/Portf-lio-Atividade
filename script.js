// =======================================================================
// ARQUIVO COMPLETO - 26 MINI APLICAÇÕES JS
// =======================================================================

// VARIAVEIS GLOBAIS TEMA
const body = document.getElementById('body-principal');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeColorMeta = document.getElementById('theme-color-meta');
const DARK_THEME_CLASS = 'dark-theme';
const LIGHT_THEME_COLOR = '#ffffff';
const DARK_THEME_COLOR = '#1a1a1a';

// FUNÇÃO AUXILIAR MOEDA
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// APLICA TEMA
function applyTheme(isDark) {
    if (!body ||!themeToggleBtn ||!themeColorMeta) return;
    if (isDark) {
        body.classList.add(DARK_THEME_CLASS);
        themeToggleBtn.textContent = '☀️';
        themeColorMeta.setAttribute('content', DARK_THEME_COLOR);
    } else {
        body.classList.remove(DARK_THEME_CLASS);
        themeToggleBtn.textContent = '🌙';
        themeColorMeta.setAttribute('content', LIGHT_THEME_COLOR);
    }
    localStorage.setItem('theme', isDark? 'dark' : 'light');
}

// =======================================================================
// DOM CARREGADO
// =======================================================================
document.addEventListener('DOMContentLoaded', () => {

    // TEMA
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark);
    themeToggleBtn?.addEventListener('click', () => { applyTheme(!body.classList.contains(DARK_THEME_CLASS)); });

    // BUSCA GERAL
    document.getElementById('busca-listas')?.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        document.querySelectorAll('.card').forEach(card => {
            const titulo = card.querySelector('h3')?.textContent.toLowerCase() || '';
            card.style.display = titulo.includes(termo)? 'block' : 'none';
        });
    });

    // ===================================================================
    // CARD 1: DIA DA SEMANA
    // ===================================================================
    document.getElementById("form")?.addEventListener("submit", function(e) {
        e.preventDefault();
        const dia = document.getElementById("day").value.trim().toLowerCase();
        if (!dia) return alert("Digite um dia!");
        alert((dia.includes("sabado") || dia.includes("domingo"))? "Bom fim de semana! 🎉" : "Boa semana! 💼");
        this.reset();
    });

    // ===================================================================
    // CARD 2: POSITIVO OU NEGATIVO
    // ===================================================================
    document.getElementById("numberForm")?.addEventListener("submit", function(e){
        e.preventDefault();
        const num = Number(document.getElementById("number").value);
        alert(num > 0? "Positivo ✅" : num < 0? "Negativo ❌" : "Zero 0️⃣");
        this.reset();
    });

    // ===================================================================
    // CARD 3: JOGO DE ADIVINHAÇÃO
    // ===================================================================
    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let tentativas = 0;
    let jogoEncerrado = false;

    window.adivinhar = function() {
        if (jogoEncerrado) return document.getElementById('mensagem').textContent = "Clique em Reiniciar!";
        const palpite = Number(document.getElementById('palpite').value);
        tentativas++;
        if (palpite < numeroSecreto) document.getElementById('mensagem').textContent = `Tente um número MAIOR ⬆️`;
        else if (palpite > numeroSecreto) document.getElementById('mensagem').textContent = `Tente um número MENOR ⬇️`;
        else {
            document.getElementById('mensagem').textContent = `🎉 Acertou em ${tentativas} tentativas!`;
            jogoEncerrado = true;
            document.getElementById('palpite').disabled = true;
            document.getElementById('btnAdivinhar').disabled = true;
        }
        document.getElementById('palpite').value = "";
    }

    window.reiniciar = function() {
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        tentativas = 0; jogoEncerrado = false;
        document.getElementById('mensagem').textContent = "";
        document.getElementById('palpite').disabled = false;
        document.getElementById('btnAdivinhar').disabled = false;
    }

    // ===================================================================
    // CARD 4: SALDO ATUAL
    // ===================================================================
    document.getElementById("balanceForm")?.addEventListener("submit", function(e){
        e.preventDefault();
        const saldo = Number(document.getElementById("balance").value);
        alert(`Seu saldo: ${formatCurrency(saldo)} 💰`);
        this.reset();
    });

    // ===================================================================
    // CARD 5: BOAS-VINDAS
    // ===================================================================
    document.getElementById("nameForm")?.addEventListener("submit", function(e){
        e.preventDefault();
        const nome = document.getElementById("name").value.trim();
        alert(nome? `Bem-vindo(a), ${nome}! 👋` : "Digite seu nome!");
        this.reset();
    });

    // ===================================================================
    // CARD 6: CALCULO DE IMC
    // ===================================================================
    document.getElementById("imcForm")?.addEventListener("submit", function(e) {
        e.preventDefault();
        const peso = parseFloat(document.getElementById("peso").value);
        const altura = parseFloat(document.getElementById("altura").value);
        const imc = (peso / (altura * altura)).toFixed(2);
        let status = imc < 18.5? 'Abaixo do peso' : imc < 24.9? 'Normal ✅' : imc < 29.9? 'Sobrepeso' : 'Obesidade';
        document.getElementById("imcResultado").innerHTML = `IMC: <strong>${imc}</strong> - ${status}`;
        document.getElementById("btnCalcularImc").disabled = true;
    });

    window.limparImc = function() {
        document.getElementById('peso').value = '';
        document.getElementById('altura').value = '';
        document.getElementById('imcResultado').innerHTML = '';
        document.getElementById("btnCalcularImc").disabled = false;
    }

    // ===================================================================
    // CARD 7: CONVERSOR C PARA F
    // ===================================================================
    document.getElementById("tempForm")?.addEventListener("submit", function(e) {
        e.preventDefault();
        const c = parseFloat(document.getElementById("celsius").value);
        const f = ((c * 9/5) + 32).toFixed(1);
        document.getElementById("tempResultado").innerHTML = `${c}°C = <strong>${f}°F</strong> 🔥`;
    });

    // ===================================================================
    // CARD 8: CONTADOR DE CLIQUES
    // ===================================================================
    let contador = 0;
    document.getElementById("btnContador")?.addEventListener('click', () => {
        document.getElementById("contadorCliques").textContent = ++contador;
    });
    document.getElementById("btnResetContador")?.addEventListener('click', () => {
        contador = 0;
        document.getElementById("contadorCliques").textContent = 0;
    });

    // ===================================================================
    // CARD 9: LISTA DE TAREFAS
    // ===================================================================
    let tarefas = [];
    function renderizarTarefas() {
        const lista = document.getElementById("todoList");
        const filtro = document.getElementById("filtroTodo").value.toLowerCase();
        lista.innerHTML = tarefas.filter(t => t.toLowerCase().includes(filtro))
           .map((t, i) => `<li>${t} <button onclick="removerTarefa(${i})">❌</button></li>`).join('');
    }
    window.removerTarefa = (i) => { tarefas.splice(i,1); renderizarTarefas(); }
    document.getElementById("todoForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        tarefas.push(document.getElementById("todoInput").value);
        document.getElementById("todoInput").value = '';
        renderizarTarefas();
    });
    document.getElementById("filtroTodo")?.addEventListener('input', renderizarTarefas);

    // ===================================================================
    // CARD 10: CONTADOR REGRESSIVO
    // ===================================================================
    let timerInterval;
    function atualizarTimer() {
        let min = document.getElementById('minutos').value.padStart(2,'0');
        let seg = document.getElementById('segundos').value.padStart(2,'0');
        document.getElementById('timerDisplay').textContent = `${min}:${seg}`;
    }
    document.getElementById('btnIniciarTimer')?.addEventListener('click', () => {
        let total = (+document.getElementById('minutos').value * 60) + +document.getElementById('segundos').value;
        timerInterval = setInterval(() => {
            total--;
            let m = Math.floor(total/60).toString().padStart(2,'0');
            let s = (total%60).toString().padStart(2,'0');
            document.getElementById('timerDisplay').textContent = `${m}:${s}`;
            if(total <= 0) clearInterval(timerInterval);
        }, 1000);
    });
    document.getElementById('btnPararTimer')?.addEventListener('click', () => clearInterval(timerInterval));
    document.getElementById('btnResetTimer')?.addEventListener('click', atualizarTimer);

    // ===================================================================
    // CARD 11: GERADOR DE SENHAS
    // ===================================================================
    document.getElementById('btnGerarSenha')?.addEventListener('click', () => {
        const tam = +document.getElementById('tamanhoSenha').value;
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        if(document.getElementById('incluirMaiusculas').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(document.getElementById('incluirNumeros').checked) chars += '0123456789';
        if(document.getElementById('incluirSimbolos').checked) chars += '!@#$%';
        let senha = '';
        for(let i=0; i<tam; i++) senha += chars[Math.floor(Math.random() * chars.length)];
        document.getElementById('senhaGerada').value = senha;
    });
    document.getElementById('btnCopiarSenha')?.addEventListener('click', () => {
        navigator.clipboard.writeText(document.getElementById('senhaGerada').value);
        alert("Copiado!");
    });

    // ===================================================================
    // CARD 12: CALCULADORA DE GORJETA
    // ===================================================================
    window.calcularGorjeta = function() {
        const conta = +document.getElementById('contaValor').value;
        const perc = +document.getElementById('gorjetaPorcentagem').value;
        const pessoas = +document.getElementById('numPessoas').value;
        const gorjeta = conta * (perc/100);
        const total = conta + gorjeta;
        document.getElementById('gorjetaResultado').innerHTML = `
            Gorjeta: ${formatCurrency(gorjeta)}<br>
            Total: ${formatCurrency(total)}<br>
            Por pessoa: ${formatCurrency(total/pessoas)}
        `;
    }
    calcularGorjeta();

    // ===================================================================
    // CARD 13: EDITOR DE ESTILOS
    // ===================================================================
    document.getElementById('corTexto')?.addEventListener('input', (e) => {
        document.getElementById('blocoExemplo').style.color = e.target.value;
    });
    document.getElementById('tamanhoFonte')?.addEventListener('input', (e) => {
        document.getElementById('blocoExemplo').style.fontSize = e.target.value + 'px';
    });

    // ===================================================================
    // CARD 14: VALIDADOR DE LOGIN
    // ===================================================================
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;
        document.getElementById('emailError').textContent = email.includes('@')? '' : 'Email inválido';
        document.getElementById('senhaError').textContent = senha.length >= 6? '' : 'Min 6 caracteres';
        if(email.includes('@') && senha.length >= 6) alert('Login OK!');
    });

    // ===================================================================
    // CARD 15: CATALOGO DE PRODUTOS
    // ===================================================================
    const produtos = [
        {nome: "Notebook Gamer", categoria: "Eletrônicos"},
        {nome: "Mouse Óptico", categoria: "Acessórios"},
        {nome: "Monitor 24pol", categoria: "Eletrônicos"}
    ];
    function renderizarProdutos(lista) {
        document.getElementById('listaProdutos').innerHTML = lista.map(p => `<li>${p.nome} - ${p.categoria}</li>`).join('');
    }
    document.getElementById('filtroProduto')?.addEventListener('input', (e) => {
        renderizarProdutos(produtos.filter(p => p.nome.toLowerCase().includes(e.target.value.toLowerCase())));
    });
    renderizarProdutos(produtos);

    // ===================================================================
    // CARD 16: CALCULADORA DE MEDIA
    // ===================================================================
    let notas = [];
    document.getElementById('notaForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        notas.push(+document.getElementById('notaInput').value);
        const media = (notas.reduce((a,b)=>a+b,0)/notas.length).toFixed(1);
        document.getElementById('mediaResultado').textContent = media;
        document.getElementById('listaNotas').innerHTML += `<li>Nota: ${notas[notas.length-1]}</li>`;
    });

    // ===================================================================
    // CARD 17: GERADOR DE CORES RGB
    // ===================================================================
    document.getElementById('btnGerarCor')?.addEventListener('click', () => {
        const r = Math.floor(Math.random()*256);
        const g = Math.floor(Math.random()*256);
        const b = Math.floor(Math.random()*256);
        document.getElementById('corBox').style.backgroundColor = `rgb(${r},${g},${b})`;
        document.getElementById('codigoCor').textContent = `RGB(${r}, ${g}, ${b})`;
    });

    // ===================================================================
    // CARD 18: CONVERSOR DE UNIDADES
    // ===================================================================
    document.getElementById('btnConverterUnidade')?.addEventListener('click', () => {
        const valor = +document.getElementById('valorOriginal').value;
        const tipo = document.getElementById('tipoConversao').value;
        const resultado = tipo === 'km_mi'? (valor * 0.621371).toFixed(2) + ' Milhas' : (valor * 0.264172).toFixed(2) + ' Galões';
        document.getElementById('conversaoResultado').innerHTML = `Resultado: <strong>${resultado}</strong>`;
    });

    // ===================================================================
    // CARD 19: CONTADOR DE TEXTO
    // ===================================================================
    document.getElementById('textoInput')?.addEventListener('input', (e) => {
        const texto = e.target.value;
        document.getElementById('contadorCaracteres').textContent = texto.length;
        document.getElementById('contadorPalavras').textContent = texto.trim().split(/\s+/).filter(w=>w).length;
    });

    // ===================================================================
    // CARD 20: CALCULADORA DE MERCADO
    // ===================================================================
    let itensMercado = [];
    function renderizarMercado() {
        const subtotal = itensMercado.reduce((acc,i) => acc + (i.qtd * i.valor), 0);
        const desconto = subtotal * (+document.getElementById('descontoMercado').value / 100);
        document.getElementById('listaMercado').innerHTML = itensMercado.map((i, idx) =>
            `<li>${i.nome} ${i.qtd}x ${formatCurrency(i.valor)} <button onclick="removerItemMercado(${idx})">X</button></li>`
        ).join('');
        document.getElementById('totalMercado').innerHTML = `
            Subtotal: ${formatCurrency(subtotal)}<br>
            Desconto: -${formatCurrency(desconto)}<br>
            <strong>Total: ${formatCurrency(subtotal - desconto)}</strong>
        `;
    }
    window.removerItemMercado = (i) => { itensMercado.splice(i,1); renderizarMercado(); }
    document.getElementById('mercadoForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        itensMercado.push({
            nome: document.getElementById('produtoNome').value,
            qtd: +document.getElementById('produtoQtd').value,
            valor: +document.getElementById('produtoValor').value
        });
        renderizarMercado();
    });
    document.getElementById('descontoMercado')?.addEventListener('input', renderizarMercado);

    // ===================================================================
    // CARD 21: RATEIO DE CONTAS
    // ===================================================================
    let pessoasRateio = [];
    function renderizarRateio() {
        const total = +document.getElementById('valorConta').value;
        document.getElementById('listaPessoas').innerHTML = pessoasRateio.map((p,i) =>
            `<li>${p.nome} - ${p.porcentagem}% <button onclick="removerPessoaRateio(${i})">X</button></li>`
        ).join('');
        document.getElementById('resultadoRateio').innerHTML = pessoasRateio.map(p =>
            `${p.nome}: ${formatCurrency(total * p.porcentagem / 100)}`
        ).join('<br>');
    }
    window.removerPessoaRateio = (i) => { pessoasRateio.splice(i,1); renderizarRateio(); }
    document.getElementById('rateioForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        pessoasRateio.push({
            nome: document.getElementById('nomePessoa').value,
            porcentagem: +document.getElementById('porcentagemPessoa').value
        });
        renderizarRateio();
    });
    document.getElementById('valorConta')?.addEventListener('input', renderizarRateio);

    // ===================================================================
    // CARD 22: JOGO DA MEMORIA
    // ===================================================================
    const emojis = ['🍎','🍌','🍇','🍓','🍊','🍉','🍍','🥝'];
    let cartasMemoria = [...emojis,...emojis].sort(() => Math.random() - 0.5);
    let carta1 = null; let paresMemoria = 0; let clicksMemoria = 0;

    window.iniciarJogoMemoria = function() {
        cartasMemoria = [...emojis,...emojis].sort(() => Math.random() - 0.5);
        document.getElementById('tabuleiroMemoria').innerHTML = '';
        carta1 = null; paresMemoria = 0; clicksMemoria = 0;
        document.getElementById('clicksMemoria').textContent = 0;
        cartasMemoria.forEach(emoji => {
            const div = document.createElement('div');
            div.className = 'carta';
            div.dataset.emoji = emoji;
            div.textContent = '?';
            div.onclick = function() {
                if(this.classList.contains('virada')) return;
                this.textContent = emoji; this.classList.add('virada');
                clicksMemoria++; document.getElementById('clicksMemoria').textContent = clicksMemoria;
                if(!carta1) carta1 = this;
                else {
                    if(carta1.dataset.emoji === emoji) {
                        paresMemoria++; if(paresMemoria === 8) document.getElementById('resultadoMemoria').textContent = 'Venceu! 🎉';
                        carta1 = null;
                    } else {
                        setTimeout(() => {
                            this.textContent = '?'; carta1.textContent = '?';
                            this.classList.remove('virada'); carta1.classList.remove('virada');
                            carta1 = null;
                        }, 800);
                    }
                }
            }
            document.getElementById('tabuleiroMemoria').appendChild(div);
        });
    }
    iniciarJogoMemoria();

    // ===================================================================
    // CARD 23: PEDRA PAPEL TESOURA
    // ===================================================================
    let placarVoce = 0, placarPc = 0;
    window.jogarPPT = function(escolha) {
        const opcoes = ['pedra','papel','tesoura'];
        const pc = opcoes[Math.floor(Math.random()*3)];
        let resultado = escolha === pc? 'Empate 🤝' :
            ((escolha==='pedra'&&pc==='tesoura')||(escolha==='papel'&&pc==='pedra')||(escolha==='tesoura'&&pc==='papel'))
           ? (++placarVoce, 'Você Ganhou! 🎉') : (++placarPc, 'PC Ganhou! 🤖');
        document.getElementById('placarVoce').textContent = placarVoce;
        document.getElementById('placarPc').textContent = placarPc;
        document.getElementById('resultadoPPT').innerHTML = `Você: ${escolha}<br>PC: ${pc}<br><strong>${resultado}</strong>`;
    }
    window.resetarPlacarPPT = () => { placarVoce=0; placarPc=0; document.getElementById('placarVoce').textContent=0; document.getElementById('placarPc').textContent=0; }

    // ===================================================================
    // CARD 24: CLIQUE RAPIDO
    // ===================================================================
    let tempoClique = 10, totalClicks = 0, rodandoClique = false;
    document.getElementById('btnIniciarClique')?.addEventListener('click', () => {
        tempoClique = 10; totalClicks = 0; rodandoClique = true;
        document.getElementById('btnIniciarClique').disabled = true;
        document.getElementById('btnClicar').disabled = false;
        const interval = setInterval(() => {
            document.getElementById('tempoClique').textContent = --tempoClique;
            if(tempoClique <= 0) {
                clearInterval(interval); rodandoClique = false;
                document.getElementById('btnIniciarClique').disabled = false;
                document.getElementById('btnClicar').disabled = true;
                document.getElementById('resultadoClique').innerHTML = `Total: ${totalClicks} cliques`;
            }
        }, 1000);
    });
    document.getElementById('btnClicar')?.addEventListener('click', () => {
        if(rodandoClique) document.getElementById('totalCliques').textContent = ++totalClicks;
    });

    // ===================================================================
    // CARD 25: QUIZ RELAMPAGO
    // ===================================================================
    const perguntasQuiz = [
        {p:"Capital do Brasil?", o:["SP","Brasília","RJ"], r:1},
        {p:"2 + 2 * 2?", o:["6","8","4"], r:0},
        {p:"Linguagem Web?", o:["Python","JavaScript","C++"], r:1}
    ];
    let idxQuiz = 0, pontosQuiz = 0;
    window.iniciarQuiz = function() {
        idxQuiz = 0; pontosQuiz = 0; document.getElementById('pontosQuiz').textContent = 0;
        mostrarPerguntaQuiz();
    }
    function mostrarPerguntaQuiz() {
        if(idxQuiz >= perguntasQuiz.length) {
            document.getElementById('areaPergunta').style.display = 'none';
            document.getElementById('resultadoQuiz').style.display = 'block';
            document.getElementById('resultadoQuiz').innerHTML = `Fim! Você fez ${pontosQuiz}/${perguntasQuiz.length}`;
            return;
        }
        const q = perguntasQuiz[idxQuiz];
        document.getElementById('numPergunta').textContent = idxQuiz + 1;
        document.getElementById('textoPergunta').textContent = q.p;
        document.getElementById('opcoesQuiz').innerHTML = q.o.map((op,i) => `<button onclick="verificarRespostaQuiz(${i})">${op}</button>`).join('');
    }
    window.verificarRespostaQuiz = function(i) {
        if(i === perguntasQuiz[idxQuiz].r) { pontosQuiz++; document.getElementById('pontosQuiz').textContent = pontosQuiz; }
        idxQuiz++; mostrarPerguntaQuiz();
    }
    iniciarQuiz();

    // ===================================================================
    // CARD 26: JOGO DA VELHA VS PC
    // ===================================================================
    let tabuleiroVelha = [];
    let jogadorVelha = 'X';
    let tamanhoVelha = 3;

    document.getElementById('tamanhoTabuleiro')?.addEventListener('change', (e) => {
        tamanhoVelha = +e.target.value;
        document.getElementById('qtdParaGanhar').innerHTML = Array.from({length: tamanhoVelha-2}, (_,i) => `<option>${i+3}</option>`).join('');
    });

    window.iniciarJogoVelha = function() {
        tamanhoVelha = +document.getElementById('tamanhoTabuleiro').value;
        tabuleiroVelha = Array(tamanhoVelha).fill().map(() => Array(tamanhoVelha).fill(''));
        jogadorVelha = 'X';
        renderizarTabuleiroVelha();
    }

    function renderizarTabuleiroVelha() {
        const tab = document.getElementById('tabuleiroVelha');
        tab.innerHTML = ''; tab.style.gridTemplateColumns = `repeat(${tamanhoVelha}, 1fr)`;
        for(let i=0; i<tamanhoVelha; i++) {
            for(let j=0; j<tamanhoVelha; j++) {
                const celula = document.createElement('div');
                celula.className = 'celula-velha';
                celula.textContent = tabuleiroVelha[i][j];
                celula.onclick = () => jogarVelha(i,j);
                tab.appendChild(celula);
            }
        }
    }

    function jogarVelha(l,c) {
        if(tabuleiroVelha[l][c]) return;
        tabuleiroVelha[l][c] = 'X';
        renderizarTabuleiroVelha();
        setTimeout(jogadaPCVelha, 500);
    }

    function jogadaPCVelha() {
        let vazias = [];
        for(let i=0; i<tamanhoVelha; i++) for(let j=0; j<tamanhoVelha; j++) if(!tabuleiroVelha[i][j]) vazias.push([i,j]);
        const [l,c] = vazias[Math.floor(Math.random()*vazias.length)];
        tabuleiroVelha[l][c] = 'O';
        renderizarTabuleiroVelha();
    }

    iniciarJogoVelha();

}); // FIM DOM