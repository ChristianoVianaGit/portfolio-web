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

