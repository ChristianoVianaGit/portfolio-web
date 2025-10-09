function openSidebar() {
  document.getElementById("mySidebar").style.width = "200px";
  document.getElementById("overlay").style.display = "block";
}

function closeSidebar() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("overlay").style.display = "none";
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

let currentIndex = 0;

function moveCarousel(direction) {
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".publication-card");
  const totalCards = cards.length;

  currentIndex += direction;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= totalCards) currentIndex = totalCards - 1;

  const offset = -cards[currentIndex].offsetLeft;
  track.style.transform = `translateX(${offset}px)`;

  atualizarBotoesCarousel();
}

function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  const conteudo = modal.querySelector(".modal-conteudo");

  conteudo.classList.add("fechando");
  modal.classList.add("fechando");

  setTimeout(() => {
    modal.style.display = "none";
    conteudo.classList.remove("fechando");
    modal.classList.remove("fechando");
  }, 300); // tempo igual ao da animação
}

window.onclick = function(event) {
  const modais = document.querySelectorAll(".modal");
  modais.forEach(modal => {
    if (event.target === modal) {
      fecharModal(modal.id);
    }
  });
};

function atualizarBotoesCarousel() {
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");
  const cards = document.querySelectorAll(".publication-card");

  btnLeft.disabled = currentIndex === 0;
  btnRight.disabled = currentIndex === cards.length - 1;

  btnLeft.style.opacity = currentIndex === 0 ? "0.5" : "1";
  btnRight.style.opacity = currentIndex === cards.length - 1 ? "0.5" : "1";
}

window.onload = atualizarBotoesCarousel;

fetch("https://vitn0kfkej.execute-api.us-east-1.amazonaws.com/registrar?origem=portfolio");
