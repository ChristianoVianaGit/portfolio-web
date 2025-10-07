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

  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}

fetch("https://vitn0kfkej.execute-api.us-east-1.amazonaws.com/registrar?origem=portfolio")

