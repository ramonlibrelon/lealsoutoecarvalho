// SCRIPT.JS — comportamento compartilhado por TODAS as páginas do site
// (menu hambúrguer, cabeçalho opaco ao rolar, fade-in, ano do rodapé).

// ======= MENU HAMBÚRGUER (celular) =======
// "getElementById" pega o elemento HTML pelo id definido no HTML.
const botaoMenu = document.getElementById('botao-menu');
// É a lista <ul class="nav-lista"> que desliza na tela (é nela que o CSS
// procura a classe "aberto"), não a tag <nav> que a envolve.
const navLista = document.querySelector('.nav-lista');

botaoMenu.addEventListener('click', () => {
  // "toggle" liga se estava desligado, e desliga se estava ligado.
  // Ele também devolve true/false, que usamos para atualizar o aria-expanded
  // (isso avisa leitores de tela se o menu está aberto ou fechado).
  const aberto = navLista.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu do celular automaticamente ao clicar em algum link dele
document.querySelectorAll('.nav-lista a').forEach((link) => {
  link.addEventListener('click', () => {
    navLista.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
  });
});

// ======= CABEÇALHO FICA OPACO AO ROLAR =======
const cabecalho = document.getElementById('cabecalho');
window.addEventListener('scroll', () => {
  cabecalho.classList.toggle('rolado', window.scrollY > 40);
});

// ======= ANIMAÇÃO DE FADE-IN AO ROLAR =======
// O IntersectionObserver "vigia" os elementos com classe .reveal e avisa
// assim que cada um entra na tela, para adicionarmos a classe .visivel.
const observadorDeRolagem = new IntersectionObserver(
  (elementosObservados) => {
    elementosObservados.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add('visivel');
        observadorDeRolagem.unobserve(item.target); // já apareceu, não precisa mais vigiar
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((elemento) => {
  observadorDeRolagem.observe(elemento);
});

// ======= ANO ATUAL NO RODAPÉ =======
// "new Date()" pega a data de hoje no computador de quem está vendo o site,
// e ".getFullYear()" pega só o ano (ex: 2026). Assim o rodapé nunca fica desatualizado.
document.getElementById('ano-atual').textContent = new Date().getFullYear();
