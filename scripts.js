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
  const visibleCards = 3; // número de cards visíveis
  const cardWidth = cards[0].offsetWidth + 20; // largura do card + gap

  const maxIndex = cards.length - visibleCards;
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const offset = -(currentIndex * cardWidth);
  track.style.transform = `translateX(${offset}px)`;

  atualizarBotoesCarousel();
}

function atualizarBotoesCarousel() {
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");
  const cards = document.querySelectorAll(".publication-card");
  const visibleCards = 3;
  const maxIndex = cards.length - visibleCards;

  btnLeft.disabled = currentIndex === 0;
  btnRight.disabled = currentIndex >= maxIndex;

  btnLeft.style.opacity = currentIndex === 0 ? "0.5" : "1";
  btnRight.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
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

window.onload = atualizarBotoesCarousel;

function mostrarModal(event) {
  event.preventDefault(); // impede envio real do formulário
  document.getElementById("modal-sucesso").style.display = "block";
}

document.getElementById("form-contato").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // 1. Verificar se o nome tem apenas letras
  const nome = formData.get("nome").trim();
  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
    alert("O nome deve conter apenas letras.");
    return;
  }

  // 2. Impedir envio se o telefone tiver letras
  const telefone = formData.get("telefone").trim();
  if (!/^\d{10,11}$/.test(telefone)) {
    alert("O telefone deve conter apenas números (10 ou 11 dígitos).");
    return;
  }

  // 3. Validar que a mensagem não contenha links
  const mensagem = formData.get("mensagem").trim();
  if (/https?:\/\/|www\./i.test(mensagem)) {
    alert("A mensagem não deve conter links.");
    return;
  }

  // 4. Sanitizar entrada (remove tags HTML)
  formData.set("nome", nome.replace(/<[^>]*>?/gm, ""));
  formData.set("email", formData.get("email").replace(/<[^>]*>?/gm, ""));
  formData.set("telefone", telefone.replace(/<[^>]*>?/gm, ""));
  formData.set("mensagem", mensagem.replace(/<[^>]*>?/gm, ""));

  // 5. Evitar spam com honeypot
  if (formData.get("website")) {
    return; // campo oculto preenchido → provável bot
  }

  // Enviar via Formsubmit
  fetch("https://formsubmit.co/viana.cviana@gmaiil.com", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        document.getElementById("modal-sucesso").style.display = "block";
      } else {
        alert("Ocorreu um erro ao enviar. Tente novamente.");
      }
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Erro de conexão. Verifique sua internet.");
    });
});

fetch("https://vitn0kfkej.execute-api.us-east-1.amazonaws.com/registrar?origem=portfolio");
