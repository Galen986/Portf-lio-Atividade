// Helper to insert small message after a form/control
function showMessageAfter(el, text, cls = 'message-area') {
  let msg = el.parentElement.querySelector('.js-temp-message');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'js-temp-message ' + cls;
    el.parentElement.appendChild(msg);
  }
  msg.textContent = text;
  return msg;
}

// 1. Dia da Semana
(function(){
  const form = qs('#form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const day = (qs('#day').value || '').trim().toLowerCase();
    if (!day) return showMessageAfter(form, 'Por favor, informe um dia.');
    const days = {
      'domingo':'Domingo','segunda':'Segunda-feira','segunda-feira':'Segunda-feira',
      'terca':'Terça-feira','terça':'Terça-feira','terça-feira':'Terça-feira',
      'quarta':'Quarta-feira','quarta-feira':'Quarta-feira',
      'quinta':'Quinta-feira','quinta-feira':'Quinta-feira',
      'sexta':'Sexta-feira','sexta-feira':'Sexta-feira',
      'sabado':'Sábado','sábado':'Sábado'
    };
    const result = days[day] || 'Dia inválido ou não reconhecido.';
    showMessageAfter(form, typeof result === 'string' ? result : result);
  });
})();

// 2. Positivo ou Negativo
(function(){
  const form = qs('#numberForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const num = Number(qs('#number').value);
    if (Number.isNaN(num)) return showMessageAfter(form, 'Informe um número válido.');
    const res = num === 0 ? 'Zero' : (num > 0 ? 'Positivo' : 'Negativo');
    showMessageAfter(form, res);
  });
})();

// 3. Jogo de Adivinhação
(function(){
  let target = load('guess-target', null);
  if (!target) { target = Math.floor(Math.random()*100)+1; save('guess-target', target); }
  let attempts = load('guess-attempts', 0);
  qs('#mensagem').textContent = `Tente adivinhar entre 1 e 100. Tentativas: ${attempts}`;
  window.adivinhar = function() {
    const input = qs('#palpite');
    const val = Number(input.value);
    if (!val || val < 1 || val > 100) return qs('#mensagem').textContent = 'Informe um palpite entre 1 e 100.';
    attempts++;
    save('guess-attempts', attempts);
    if (val === target) {
      qs('#mensagem').textContent = `Acertou! Número: ${target}. Tentativas: ${attempts}. Gerando novo número...`;
      target = Math.floor(Math.random()*100)+1;
      attempts = 0;
      save('guess-target', target);
      save('guess-attempts', attempts);
    } else {
      qs('#mensagem').textContent = val > target ? 'Muito alto! Tente menor.' : 'Muito baixo! Tente maior.';
      qs('#mensagem').textContent += ` Tentativas: ${attempts}`;
    }
  };
  window.reiniciar = function() {
    target = Math.floor(Math.random()*100)+1;
    attempts = 0;
    save('guess-target', target);
    save('guess-attempts', attempts);
    qs('#mensagem').textContent = 'Jogo reiniciado. Tente adivinhar novamente.';
  };
})();

// 4. Saldo Atual
(function(){
  const form = qs('#balanceForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = Number(qs('#balance').value);
    if (Number.isNaN(v)) return showMessageAfter(form, 'Informe um valor válido.');
    showMessageAfter(form, `Seu saldo: ${fmtBRL(v)}`);
  });
})();

// 5. Boas-vindas
(function(){
  const form = qs('#nameForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = (qs('#name').value || '').trim();
    if (!name) return showMessageAfter(form, 'Por favor, digite seu nome.');
    showMessageAfter(form, `Olá, ${name}! Seja bem-vindo(a)!`);
  });
})();

// 6. Cálculo de IMC
(function(){
  const form = qs('#imcForm');
  const out = qs('#imcResultado');
  window.limparImc = function() {
    form.reset();
    out.textContent = '';
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const peso = Number(qs('#peso').value);
    const altura = Number(qs('#altura').value);
    if (!peso || !altura) return out.textContent = 'Preencha peso e altura.';
    const imc = peso / (altura * altura);
    let categ = '';
    if (imc < 18.5) categ = 'Abaixo do peso';
    else if (imc < 25) categ = 'Peso normal';
    else if (imc < 30) categ = 'Sobrepeso';
    else categ = 'Obesidade';
    out.innerHTML = `IMC: ${imc.toFixed(2)} — ${categ}`;
  });
})();

// 7. Conversor C/F
(function(){
  const form = qs('#tempForm');
  const out = qs('#tempResultado');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const c = Number(qs('#celsius').value);
    if (Number.isNaN(c)) return out.textContent = 'Informe um valor válido.';
    const f = (c * 9/5) + 32;
    out.textContent = `${c.toFixed(1)}°C = ${f.toFixed(1)}°F`;
  });
})();

// 8. Contador de Cliques
(function(){
  const btn = qs('#btnContador');
  const reset = qs('#btnResetContador');
  const display = qs('#contadorCliques');
  let count = load('contadorCliques', 0);
  display.textContent = count;
  btn.addEventListener('click', () => {
    count++;
    display.textContent = count;
    save('contadorCliques', count);
  });
  reset.addEventListener('click', () => {
    count = 0;
    display.textContent = 0;
    save('contadorCliques', count);
  });
})();

// 9. Lista de Tarefas Filtrável
(function(){
  const listEl = qs('#todoList');
  const form = qs('#todoForm');
  const input = qs('#todoInput');
  const filter = qs('#filtroTodo');
  let todos = load('todos', []);
  function render() {
    listEl.innerHTML = '';
    const query = (filter.value || '').toLowerCase();
    todos.filter(t => t.text.toLowerCase().includes(query)).forEach((t, idx) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '8px';
      li.innerHTML = `
        <input type="checkbox" data-i="${idx}" ${t.done ? 'checked' : ''}>
        <span style="flex:1; ${t.done ? 'text-decoration:line-through; opacity:0.7' : ''}">${t.text}</span>
        <button data-del="${idx}" style="background:#dc3545;color:#fff;border:none;padding:4px 8px;border-radius:4px;">Excluir</button>
      `;
      listEl.appendChild(li);
    });
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const txt = (input.value || '').trim();
    if (!txt) return;
    todos.push({ text: txt, done: false, created: Date.now() });
    save('todos', todos);
    input.value = '';
    render();
  });
  listEl.addEventListener('change', e => {
    const idx = e.target.dataset.i;
    if (idx !== undefined) {
      todos[idx].done = e.target.checked;
      save('todos', todos);
      render();
    }
  });
  listEl.addEventListener('click', e => {
    const del = e.target.dataset.del;
    if (del !== undefined) {
      todos.splice(del,1);
      save('todos', todos);
      render();
    }
  });
  filter.addEventListener('input', render);
  render();
})();

// 10. Contador Regressivo
(function(){
  const display = qs('#timerDisplay');
  const startBtn = qs('#btnIniciarTimer');
  const stopBtn = qs('#btnPararTimer');
  const resetBtn = qs('#btnResetTimer');
  let timer = null;
  let remaining = 0;
  function format(ms) {
    const s = Math.max(0, Math.floor(ms/1000));
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    return `${mm}:${ss}`;
  }
  function updateInputsToRemaining() {
    // no-op here
  }
  startBtn.addEventListener('click', () => {
    const m = Number(qs('#minutos').value) || 0;
    const s = Number(qs('#segundos').value) || 0;
    if (!timer) {
      remaining = (m*60 + s) * 1000;
      if (remaining <= 0) return;
      display.textContent = format(remaining);
      timer = setInterval(() => {
        remaining -= 1000;
        display.textContent = format(remaining);
        if (remaining <= 0) {
          clearInterval(timer);
          timer = null;
          display.textContent = '00:00';
          stopBtn.disabled = true;
        }
      }, 1000);
      startBtn.disabled = true;
      stopBtn.disabled = false;
    }
  });
  stopBtn.addEventListener('click', () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });
  resetBtn.addEventListener('click', () => {
    if (timer) { clearInterval(timer); timer = null; }
    qs('#minutos').value = '1';
    qs('#segundos').value = '0';
    display.textContent = '01:00';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
  // init
  display.textContent = '01:00';
  stopBtn.disabled = true;
})();

// 11. Gerador de Senhas
(function(){
  const btnGen = qs('#btnGerarSenha');
  const btnCopy = qs('#btnCopiarSenha');
  const out = qs('#senhaGerada');
  function gen(len, {upper, nums, syms}) {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numChars = '0123456789';
    const symChars = '!@#$%^&*()-_=+[]{};:,.<>?/';
    let chars = lowerChars;
    if (upper) chars += upperChars;
    if (nums) chars += numChars;
    if (syms) chars += symChars;
    if (!chars.length) chars = lowerChars;
    let pw = '';
    for (let i=0;i<len;i++) pw += chars[Math.floor(Math.random()*chars.length)];
    return pw;
  }
  btnGen.addEventListener('click', () => {
    const len = Math.min(20, Math.max(4, Number(qs('#tamanhoSenha').value) || 12));
    const upper = qs('#incluirMaiusculas').checked;
    const nums = qs('#incluirNumeros').checked;
    const syms = qs('#incluirSimbolos').checked;
    const senha = gen(len, {upper, nums, syms});
    out.value = senha;
    save('senhaGerada', senha);
  });
  btnCopy.addEventListener('click', async () => {
    if (!out.value) return;
    try { await navigator.clipboard.writeText(out.value); alert('Senha copiada para a área de transferência.'); }
    catch { alert('Não foi possível copiar automaticamente. Selecione e copie manualmente.'); }
  });
  // restore last
  const last = load('senhaGerada', '');
  if (last) out.value = last;
})();

// 12. Calculadora de Gorjeta
(function(){
  const conta = qs('#contaValor');
  const range = qs('#gorjetaPorcentagem');
  const numP = qs('#numPessoas');
  const out = qs('#gorjetaResultado');
  function calcularGorjeta() {
    const valor = Number(conta.value) || 0;
    const pct = Number(range.value) || 0;
    const pessoas = Math.max(1, Number(numP.value) || 1);
    const gorjeta = valor * (pct/100);
    const total = valor + gorjeta;
    out.innerHTML = `Gorjeta: ${fmtBRL(gorjeta)}<br>Por pessoa: ${fmtBRL(total / pessoas)}<br>Total: ${fmtBRL(total)}`;
  }
  qs('#btnCalcularGorjeta').addEventListener('click', calcularGorjeta);
  conta.addEventListener('input', calcularGorjeta);
  numP.addEventListener('input', calcularGorjeta);
  range.addEventListener('input', calcularGorjeta);
  calcularGorjeta();
})();

// 13. Editor de Estilos
(function(){
  const corTexto = qs('#corTexto');
  const tamanho = qs('#tamanhoFonte');
  const bloco = qs('#blocoExemplo');
  corTexto.addEventListener('input', () => bloco.style.color = corTexto.value);
  tamanho.addEventListener('input', () => bloco.style.fontSize = tamanho.value + 'px');
})();

// 14. Validador de Login
(function(){
  const form = qs('#loginForm');
  const emailIn = qs('#loginEmail');
  const passIn = qs('#loginSenha');
  const emailError = qs('#emailError');
  const senhaError = qs('#senhaError');
  form.addEventListener('submit', e => {
    e.preventDefault();
    emailError.textContent = '';
    senhaError.textContent = '';
    const email = (emailIn.value || '').trim();
    const senha = passIn.value || '';
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) emailError.textContent = 'Email inválido.';
    if (senha.length < 6) senhaError.textContent = 'Senha deve ter ao menos 6 caracteres.';
    if (emailValid && senha.length >= 6) {
      alert('Login válido (simulado).');
      form.reset();
    }
  });
})();

// 15. Catálogo de Produtos Filtrável
(function(){
  const lista = qs('#listaProdutos');
  const filtro = qs('#filtroProduto');
  let produtos = load('produtosCatalogo', [
    { name: 'Camiseta', price: 29.9 },
    { name: 'Caneca', price: 19.9 },
    { name: 'Notebook', price: 2499.9 },
    { name: 'Fone de Ouvido', price: 199.99 },
    { name: 'Teclado', price: 129.5 }
  ]);
  function render() {
    const q = (filtro.value || '').toLowerCase();
    lista.innerHTML = '';
    produtos.filter(p => p.name.toLowerCase().includes(q)).forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} — ${fmtBRL(p.price)}`;
      lista.appendChild(li);
    });
  }
  filtro.addEventListener('input', render);
  render();
})();

// 16. Calculadora de Média
(function(){
  const form = qs('#notaForm');
  const input = qs('#notaInput');
  const lista = qs('#listaNotas');
  const mediaOut = qs('#mediaResultado');
  let notas = load('notas', []);
  function render() {
    lista.innerHTML = '';
    notas.forEach((n,i) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.innerHTML = `<span>Nota ${i+1}: ${n.toFixed(1)}</span><button data-del="${i}" style="background:#dc3545;color:#fff;border:none;padding:2px 6px;border-radius:4px;">X</button>`;
      lista.appendChild(li);
    });
    const media = notas.length ? (notas.reduce((a,b)=>a+b,0)/notas.length) : 0;
    mediaOut.textContent = media.toFixed(1);
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = Number(input.value);
    if (Number.isNaN(n) || n < 0 || n > 10) return;
    notas.push(n);
    save('notas', notas);
    input.value = '';
    render();
  });
  lista.addEventListener('click', e => {
    const del = e.target.dataset.del;
    if (del !== undefined) {
      notas.splice(del,1);
      save('notas', notas);
      render();
    }
  });
  render();
})();

// 17. Gerador de Cores RGB
(function(){
  const btn = qs('#btnGerarCor');
  const box = qs('#corBox');
  const code = qs('#codigoCor');
  function gerar() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    box.style.backgroundColor = rgb;
    code.textContent = rgb.toUpperCase();
    code.style.color = (r*0.299 + g*0.587 + b*0.114) > 186 ? '#000' : '#fff';
  }
  btn.addEventListener('click', gerar);
  gerar();
})();

// 18. Conversor de Unidades
(function(){
  const btn = qs('#btnConverterUnidade');
  const tipo = qs('#tipoConversao');
  const valor = qs('#valorOriginal');
  const out = qs('#conversaoResultado');
  btn.addEventListener('click', () => {
    const v = Number(valor.value) || 0;
    if (tipo.value === 'km_mi') {
      out.textContent = `${v} km = ${(v * 0.621371).toFixed(4)} mi`;
    } else {
      out.textContent = `${v} L = ${(v * 0.264172).toFixed(4)} gal (US)`;
    }
  });
})();

// 19. Contador de Texto
(function(){
  const area = qs('#textoInput');
  const chars = qs('#contadorCaracteres');
  const words = qs('#contadorPalavras');
  function update() {
    const text = area.value || '';
    chars.textContent = text.length;
    const w = text.trim() ? text.trim().split(/\s+/).length : 0;
    words.textContent = w;
  }
  area.addEventListener('input', update);
  update();
})();

// 20. Calculadora de Mercado
(function(){
  const form = qs('#mercadoForm');
  const nome = qs('#produtoNome');
  const qtd = qs('#produtoQtd');
  const valor = qs('#produtoValor');
  const list = qs('#listaMercado');
  const desconto = qs('#descontoMercado');
  const out = qs('#totalMercado');
  let items = load('marketItems', []);
  function render() {
    list.innerHTML = '';
    items.forEach((it,i) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.innerHTML = `<span>${it.name} x${it.qtd} — ${fmtBRL(it.valor)}</span><div><button data-del="${i}" style="background:#dc3545;color:#fff;border:none;padding:2px 6px;border-radius:4px;">X</button></div>`;
      list.appendChild(li);
    });
    calcularTotal();
  }
  function calcularTotal() {
    const subtotal = items.reduce((s,it)=>s + (it.qtd * it.valor), 0);
    const pct = Math.min(100, Math.max(0, Number(desconto.value) || 0));
    const desc = subtotal * (pct/100);
    const total = subtotal - desc;
    out.innerHTML = `Subtotal: ${fmtBRL(subtotal)}<br>Desconto: ${fmtBRL(desc)}<br><strong>Total: ${fmtBRL(total)}</strong>`;
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = (nome.value || '').trim();
    const q = Math.max(1, Number(qtd.value) || 1);
    const v = Math.max(0, Number(valor.value) || 0);
    if (!n) return;
    items.push({ name: n, qtd: q, valor: v });
    save('marketItems', items);
    nome.value = '';
    qtd.value = 1;
    valor.value = '';
    render();
  });
  list.addEventListener('click', e => {
    const del = e.target.dataset.del;
    if (del !== undefined) {
      items.splice(del,1);
      save('marketItems', items);
      render();
    }
  });
  desconto.addEventListener('input', () => { calcularTotal(); save('marketDiscount', desconto.value); });
  desconto.value = load('marketDiscount', desconto.value);
  render();
})();

// 21. Rateio de Contas
(function(){
  const form = qs('#rateioForm');
  const nome = qs('#nomePessoa');
  const pct = qs('#porcentagemPessoa');
  const list = qs('#listaPessoas');
  const valorInp = qs('#valorConta');
  const out = qs('#resultadoRateio');
  const aviso = qs('#avisoRateio');
  let pessoas = load('rateioPessoas', []);
  function render() {
    list.innerHTML = '';
    pessoas.forEach((p,i) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.innerHTML = `<span>${p.name} — ${p.pct}%</span><div><button data-del="${i}" style="background:#dc3545;color:#fff;border:none;padding:2px 6px;border-radius:4px;">X</button></div>`;
      list.appendChild(li);
    });
    calcular();
  }
  function calcular() {
    const total = Number(valorInp.value) || 0;
    const sumPct = pessoas.reduce((s,p)=>s+p.pct,0);
    if (pessoas.length === 0) return out.textContent = 'Adicione pessoas para calcular o rateio.';
    if (sumPct !== 100) {
      aviso.textContent = `Soma das porcentagens = ${sumPct}%. Deve ser exatamente 100%.`;
    } else {
      aviso.textContent = '';
    }
    let html = '';
    pessoas.forEach(p => {
      const valor = total * (p.pct/100);
      html += `${p.name}: ${fmtBRL(valor)} (${p.pct}%)<br>`;
    });
    out.innerHTML = html;
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = (nome.value || '').trim();
    const p = Math.min(100, Math.max(0, Number(pct.value) || 0));
    if (!n) return;
    pessoas.push({ name: n, pct: p });
    save('rateioPessoas', pessoas);
    nome.value=''; pct.value='25';
    render();
  });
  list.addEventListener('click', e => {
    const del = e.target.dataset.del;
    if (del !== undefined) {
      pessoas.splice(del,1);
      save('rateioPessoas', pessoas);
      render();
    }
  });
  valorInp.addEventListener('input', calcular);
  render();
})();

// 22. Jogo da Memória
(function(){
  const board = qs('#tabuleiroMemoria');
  const result = qs('#resultadoMemoria');
  const clicksDisplay = qs('#clicksMemoria');
  let cards = [];
  let flipped = [];
  let matched = new Set();
  let clicks = 0;
  function createPairs(nPairs=8) {
    const base = Array.from({length:nPairs}, (_,i) => i+1);
    const arr = base.concat(base).sort(()=>Math.random()-0.5);
    return arr;
  }
  window.iniciarJogoMemoria = function() {
    cards = createPairs(8);
    matched = new Set();
    flipped = [];
    clicks = 0;
    clicksDisplay.textContent = clicks;
    render();
    result.textContent = '';
  };
  function render() {
    board.innerHTML = '';
    board.style.gridTemplateColumns = 'repeat(4, 1fr)';
    cards.forEach((val, idx) => {
      const btn = document.createElement('button');
      btn.className = 'mem-card';
      btn.style.padding = '20px';
      btn.style.fontSize = '1.2rem';
      btn.dataset.i = idx;
      if (matched.has(idx)) {
        btn.textContent = val;
        btn.disabled = true;
        btn.style.background = '#28a745';
        btn.style.color = '#fff';
      } else if (flipped.includes(idx)) {
        btn.textContent = val;
      } else {
        btn.textContent = '?';
      }
      board.appendChild(btn);
    });
  }
  board.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const i = Number(btn.dataset.i);
    if (matched.has(i) || flipped.includes(i)) return;
    flipped.push(i);
    clicks++;
    clicksDisplay.textContent = clicks;
    if (flipped.length === 2) {
      const [a,b] = flipped;
      if (cards[a] === cards[b]) {
        matched.add(a); matched.add(b);
        flipped = [];
        render();
        if (matched.size === cards.length) result.textContent = `Você venceu em ${clicks} cliques!`;
      } else {
        render();
        setTimeout(()=>{ flipped = []; render(); }, 700);
      }
    } else {
      render();
    }
  });
  // start automatically
  window.iniciarJogoMemoria();
})();

// 23. Pedra Papel Tesoura
(function(){
  const placarVoce = qs('#placarVoce');
  const placarPc = qs('#placarPc');
  const res = qs('#resultadoPPT');
  let placar = load('pptPlacar', {you:0,pc:0});
  function render() {
    placarVoce.textContent = placar.you;
    placarPc.textContent = placar.pc;
  }
  window.jogar = function(choice) {
    const options = ['pedra','papel','tesoura'];
    const pc = options[Math.floor(Math.random()*options.length)];
    let outcome = '';
    if (choice === pc) outcome = 'Empate';
    else if ((choice==='pedra' && pc==='tesoura') || (choice==='papel' && pc==='pedra') || (choice==='tesoura' && pc==='papel')) {
      outcome = 'Você venceu!';
      placar.you++;
    } else {
      outcome = 'PC venceu!';
      placar.pc++;
    }
    res.textContent = `Você: ${choice} — PC: ${pc}. ${outcome}`;
    save('pptPlacar', placar);
    render();
  };
  window.resetarPlacarPPT = function() {
    placar = {you:0,pc:0};
    save('pptPlacar', placar);
    render();
    qs('#resultadoPPT').textContent = 'Placar zerado.';
  };
  render();
})();

// 24. Clique Rápido
(function(){
  const btnStart = qs('#btnIniciarClique');
  const btnClick = qs('#btnClicar');
  const tempoDisplay = qs('#tempoClique');
  const totalDisplay = qs('#totalCliques');
  const resultado = qs('#resultadoClique');
  let total = 0;
  let timer = null;
  btnStart.addEventListener('click', () => {
    const t = Number(tempoDisplay.textContent) || 10;
    total = 0;
    totalDisplay.textContent = total;
    btnClick.disabled = false;
    btnStart.disabled = true;
    resultado.textContent = 'Clique!';
    timer = setTimeout(() => {
      btnClick.disabled = true;
      btnStart.disabled = false;
      resultado.textContent = `Tempo esgotado! Total de cliques: ${total}`;
    }, t*1000);
  });
  btnClick.addEventListener('click', () => {
    total++;
    totalDisplay.textContent = total;
  });
})();

// 25. Quiz Relâmpago
(function(){
  const area = qs('#areaPergunta');
  const texto = qs('#textoPergunta');
  const opcoes = qs('#opcoesQuiz');
  const pontosEl = qs('#pontosQuiz');
  const numPerg = qs('#numPergunta');
  const resultado = qs('#resultadoQuiz');
  let perguntas = [
    {q:'Qual a capital do Brasil?', options:['Brasília','São Paulo','Rio de Janeiro','Salvador'], a:0},
    {q:'2 + 2 * 2 = ?', options:['6','8','4','10'], a:0},
    {q:'Linguagem principal para web (front-end)?', options:['Python','Java','JavaScript','C++'], a:2},
    {q:'Qual é o mês com menos dias?', options:['Fevereiro','Abril','Junho','Setembro'], a:0},
    {q:'HTML é usado para?', options:['Estilizar páginas','Estruturar conteúdo','Programar lógica','Banco de dados'], a:1}
  ];
  let index = 0, pontos = 0;
  function render() {
    const p = perguntas[index];
    texto.textContent = p.q;
    opcoes.innerHTML = '';
    p.options.forEach((opt,i) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.style.margin = '4px 0';
      btn.addEventListener('click', () => {
        if (i === p.a) { pontos++; }
        index++;
        pontosEl.textContent = pontos;
        numPerg.textContent = Math.min(index+1, perguntas.length);
        if (index >= perguntas.length) {
          area.style.display = 'none';
          resultado.style.display = 'block';
          resultado.textContent = `Quiz finalizado! Pontos: ${pontos}/${perguntas.length}`;
        } else render();
      });
      opcoes.appendChild(btn);
    });
    pontosEl.textContent = pontos;
    numPerg.textContent = index+1;
  }
  window.iniciarQuiz = function() {
    index = 0; pontos = 0;
    perguntas = perguntas.sort(()=>Math.random()-0.5).slice(0,5);
    area.style.display = 'block';
    resultado.style.display = 'none';
    render();
  };
  // start
  window.iniciarQuiz();
})();

// 26. Jogo da Velha vs PC (suave/aleatório)
(function(){
  const boardEl = qs('#tabuleiroVelha');
  const vezEl = qs('#vezJogador');
  const result = qs('#resultadoVelha');
  const sizeSel = qs('#tamanhoTabuleiro');
  const qtdWinSel = qs('#qtdParaGanhar');
  let board = [];
  let size = 3;
  let toWin = 3;
  let turn = 'X'; // X = player, O = PC
  function initBoard(s) {
    size = s;
    board = Array.from({length:s}, () => Array.from({length:s}, () => ''));
    boardEl.innerHTML = '';
    boardEl.style.display = 'grid';
    boardEl.style.gridTemplateColumns = `repeat(${s}, 1fr)`;
    boardEl.style.gap = '6px';
    for (let r=0;r<s;r++) for (let c=0;c<s;c++) {
      const cell = document.createElement('button');
      cell.style.height = '50px';
      cell.style.fontSize = '1.2rem';
      cell.dataset.r = r; cell.dataset.c = c;
      cell.addEventListener('click', onCellClick);
      boardEl.appendChild(cell);
    }
    turn = 'X';
    vezEl.textContent = 'X - Você';
    result.textContent = '';
  }
  function onCellClick(e) {
    const r = Number(e.currentTarget.dataset.r);
    const c = Number(e.currentTarget.dataset.c);
    if (board[r][c] || turn !== 'X') return;
    board[r][c] = 'X';
    renderBoard();
    if (checkWin('X')) { result.textContent = 'Você venceu!'; return; }
    if (isFull()) { result.textContent = 'Empate!'; return; }
    turn = 'O';
    vezEl.textContent = 'O - PC';
    setTimeout(pcMove, 300);
  }
  function pcMove() {
    // Simple AI: try to win, block, otherwise random
    const move = findBestMove('O') || findBestMove('X') || randomMove();
    if (move) {
      board[move.r][move.c] = 'O';
      renderBoard();
      if (checkWin('O')) { result.textContent = 'PC venceu!'; return; }
      if (isFull()) { result.textContent = 'Empate!'; return; }
    }
    turn = 'X';
    vezEl.textContent = 'X - Você';
  }
  function randomMove() {
    const empties = [];
    for (let r=0;r<size;r++) for (let c=0;c<size;c++) if (!board[r][c]) empties.push({r,c});
    if (!empties.length) return null;
    return empties[Math.floor(Math.random()*empties.length)];
  }
  // Very simple pattern checker to try 1-move win/block by checking lines
  function findBestMove(player) {
    for (let r=0;r<size;r++) for (let c=0;c<size;c++) {
      if (!board[r][c]) {
        board[r][c] = player;
        const canWin = checkWin(player);
        board[r][c] = '';
        if (canWin) return {r,c};
      }
    }
    return null;
  }
  function isFull() { return board.flat().every(x=>x); }
  function checkWin(player) {
    const k = parseInt(qtdWinSel.value,10) || toWin;
    // check rows
    for (let r=0;r<size;r++) {
      for (let c=0;c<=size-k;c++) {
        let ok=true;
        for (let t=0;t<k;t++) if (board[r][c+t] !== player) { ok=false; break; }
        if (ok) return true;
      }
    }
    // cols
    for (let c=0;c<size;c++) {
      for (let r=0;r<=size-k;r++) {
        let ok=true;
        for (let t=0;t<k;t++) if (board[r+t][c] !== player) { ok=false; break; }
        if (ok) return true;
      }
    }
    // diag down-right
    for (let r=0;r<=size-k;r++) for (let c=0;c<=size-k;c++) {
      let ok=true;
      for (let t=0;t<k;t++) if (board[r+t][c+t] !== player) { ok=false; break; }
      if (ok) return true;
    }
    // diag up-right
    for (let r=k-1;r<size;r++) for (let c=0;c<=size-k;c++) {
      let ok=true;
      for (let t=0;t<k;t++) if (board[r-t][c+t] !== player) { ok=false; break; }
      if (ok) return true;
    }
    return false;
  }
  function renderBoard() {
    const cells = qsa('#tabuleiroVelha button');
    cells.forEach(btn => {
      const r = Number(btn.dataset.r), c = Number(btn.dataset.c);
      const val = board[r][c];
      btn.textContent = val;
      btn.disabled = !!val || !!result.textContent;
      btn.style.background = val === 'X' ? '#007bff' : val === 'O' ? '#6c757d' : '';
      btn.style.color = val ? '#fff' : '';
    });
  }
  window.iniciarJogoVelha = function() {
    initBoard(Number(sizeSel.value) || 3);
  };
  sizeSel.addEventListener('change', () => iniciarJogoVelha());
  qtdWinSel.addEventListener('change', () => { iniciarJogoVelha(); });
  // init
  iniciarJogoVelha();
})();

// Accessibility: ensure game buttons that rely on onclick in HTML are available globally
window.adivinhar = window.adivinhar || function(){};
window.reiniciar = window.reiniciar || function(){};
window.limparImc = window.limparImc || function(){};
window.iniciarJogoMemoria = window.iniciarJogoMemoria || function(){};
window.jogar = window.jogar || function(){};
window.resetarPlacarPPT = window.resetarPlacarPPT || function(){};
window.iniciarQuiz = window.iniciarQuiz || function(){};
window.iniciarJogoVelha = window.iniciarJogoVelha || function(){};