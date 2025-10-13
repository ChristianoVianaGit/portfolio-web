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

  const themeBtn = document.querySelector(".theme-toggle");
  if (document.body.classList.contains("dark-mode")) {
    themeBtn.textContent = "☀️";
    themeBtn.setAttribute("aria-label", "Alternar para tema claro");
  } else {
    themeBtn.textContent = "🌙";
    themeBtn.setAttribute("aria-label", "Alternar para tema escuro");
  }
}

let currentIndex = 0;

function moveCarousel(direction) {
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".publication-card");

  // Calcular número de cards visíveis dinamicamente
  let visibleCards;
  if (window.innerWidth < 600) {
    visibleCards = 1;
  } else if (window.innerWidth < 1024) {
    visibleCards = 2;
  } else {
    visibleCards = 3;
  }

  const cardWidth = cards[0].offsetWidth + 20;
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

  let visibleCards;
  if (window.innerWidth < 600) {
    visibleCards = 1;
  } else if (window.innerWidth < 1024) {
    visibleCards = 2;
  } else {
    visibleCards = 3;
  }

  const maxIndex = cards.length - visibleCards;

  btnLeft.disabled = currentIndex === 0;
  btnRight.disabled = currentIndex >= maxIndex;

  btnLeft.style.opacity = currentIndex === 0 ? "0.5" : "1";
  btnRight.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
}

window.addEventListener("resize", () => {
  moveCarousel(0);
});

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
  }, 300);
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
  event.preventDefault();
  document.getElementById("modal-sucesso").style.display = "block";
}

document.getElementById("form-contato").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  const nome = formData.get("nome").trim();
  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
    alert("O nome deve conter apenas letras.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar";
    return;
  }

  const telefone = formData.get("telefone").trim();
  if (!/^\d{10,11}$/.test(telefone)) {
    alert("O telefone deve conter apenas números (10 ou 11 dígitos).");
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar";
    return;
  }

  const mensagem = formData.get("mensagem").trim();
  if (/https?:\/\/|www\./i.test(mensagem)) {
    alert("A mensagem não deve conter links.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar";
    return;
  }

  formData.set("nome", nome.replace(/<[^>]*>?/gm, ""));
  formData.set("email", formData.get("email").replace(/<[^>]*>?/gm, ""));
  formData.set("telefone", telefone.replace(/<[^>]*>?/gm, ""));
  formData.set("mensagem", mensagem.replace(/<[^>]*>?/gm, ""));

  if (formData.get("website")) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar";
    return;
  }

  fetch("https://formsubmit.co/viana.cviana@gmail.com", {
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

        submitBtn.textContent = "Enviado ✅";
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar";
        }, 3000); // 3 segundos
      } else {
        alert("Ocorreu um erro ao enviar. Tente novamente.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
      }
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Erro de conexão. Verifique sua internet.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar";
    });
});

fetch("https://vitn0kfkej.execute-api.us-east-1.amazonaws.com/registrar?origem=portfolio");
