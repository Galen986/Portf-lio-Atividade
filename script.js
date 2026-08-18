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
    if (!body || !themeToggleBtn || !themeColorMeta) return; // Proteção
    if (isDark) {
        body.classList.add(DARK_THEME_CLASS);
        themeToggleBtn.textContent = '☀️'; 
        themeToggleBtn.setAttribute('aria-pressed', 'true');
        themeColorMeta.setAttribute('content', DARK_THEME_COLOR);
    } else {
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
// Funções Globais
// =======================================================================

// 3. Jogo de Adivinhação
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
let jogoEncerrado = false;

window.adivinhar = function() {
  // ... seu código está ok
}

window.reiniciar = function() {
  // ... seu código está ok
}

window.limparImc = function() {
    // ... seu código está ok
}

// =======================================================================
// Lógica Principal
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Carrega o tema ao iniciar
    if(body && themeToggleBtn && themeColorMeta){
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = savedTheme
            ? savedTheme === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark);

        themeToggleBtn.addEventListener('click', () => {
            const isDark = body.classList.contains(DARK_THEME_CLASS);
            applyTheme(!isDark);
        });
    }

    // ... todo seu código dos cards 1 ao 21 está perfeito ...

    // 22. Jogo da Memória - OK
    // ... seu código está ok

    // 23. Pedra Papel Tesoura - OK
    // ... seu código está ok

    // 24. Clique Rápido - OK
    // ... seu código está ok

    // 25. Quiz Relâmpago - OK
    // ... seu código está ok

    // 26. Jogo da Velha vs PC - CORRIGIDO NOME
    let tabuleiro = [];
    let jogadorAtual = 'X';
    let tamanho = 3;
    let qtdParaGanhar = 3;
    let jogoAtivo = true;
    let celulasVitoria = [];

    const tabuleiroVelha = document.getElementById('tabuleiroVelha');
    const vezJogador = document.getElementById('vezJogador');
    const resultadoVelha = document.getElementById('resultadoVelha');
    const selectTamanho = document.getElementById('tamanhoTabuleiro');
    const selectQtdGanhar = document.getElementById('qtdParaGanhar');

    if(selectTamanho && selectQtdGanhar){
        selectTamanho.addEventListener('change', () => {
            tamanho = parseInt(selectTamanho.value);
            selectQtdGanhar.innerHTML = '';
            for(let i = 3; i <= tamanho; i++){
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                selectQtdGanhar.appendChild(option);
            }
        });
    }

    window.iniciarJogoVelha = function() {
        if(!selectTamanho || !selectQtdGanhar) return;
        tamanho = parseInt(selectTamanho.value);
        qtdParaGanhar = parseInt(selectQtdGanhar.value);
        tabuleiro = Array(tamanho).fill(null).map(() => Array(tamanho).fill(''));
        jogadorAtual = 'X';
        jogoAtivo = true;
        celulasVitoria = [];

        vezJogador.textContent = 'X - Você';
        resultadoVelha.innerHTML = `Tabuleiro ${tamanho}x${tamanho}. Faça ${qtdParaGanhar} em sequência para ganhar!`;

        renderizarTabuleiro();
    }

    function renderizarTabuleiro() {
        if(!tabuleiroVelha) return;
        // ... resto igual
    }

    function fazerJogada(e) {
        // ... resto igual
        jogarVelha(linha, coluna, 'X'); // MUDOU AQUI
        if(jogoAtivo) {
            setTimeout(jogadaPC, 500);
        }
    }

    function jogadaPC() {
        // ...
        setTimeout(() => {
            jogarVelha(jogada.l, jogada.c, 'O'); // MUDOU AQUI
        }, 500);
    }

    function jogarVelha(l, c, jogador) { // MUDOU O NOME AQUI
        // ... resto igual
    }

    // ... resto das funções verificarVitoria, etc continuam iguais

    if(selectTamanho){
        selectTamanho.dispatchEvent(new Event('change'));
        iniciarJogoVelha();
    }
});