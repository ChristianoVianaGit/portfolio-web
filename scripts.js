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

document.getElementById("form-contato").addEventListener("submit", function () {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();

  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
    alert("O nome deve conter apenas letras.");
    return false;
  }

  const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  if (!telefoneRegex.test(telefone)) {
    alert("Informe um telefone válido. Exemplos: (11) 91234-5678 ou 11912345678.");
    return false;
  }

  const website = document.querySelector("input[name='website']").value;
  if (website) {
    return false;
  }

  return true;
});

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("sucesso") === "true") {
    document.getElementById("modal-sucesso").style.display = "block";

    // Remove o parâmetro sem recarregar a página
    history.replaceState({}, document.title, window.location.pathname);
  }
});

// fetch("https://vitn0kfkej.execute-api.us-east-1.amazonaws.com/registrar?origem=portfolio");
