const modifierBtn = document.getElementById("modifierBtn");
const sauvegarderBtn = document.getElementById("sauvegarderBtn");
const inputs = document.querySelectorAll(".profil-info input");

modifierBtn.addEventListener("click", () => {
  inputs.forEach(i => i.disabled = false);
  modifierBtn.style.display = "none";
  sauvegarderBtn.style.display = "inline-block";
});

sauvegarderBtn.addEventListener("click", () => {
  inputs.forEach(i => i.disabled = true);
  modifierBtn.style.display = "inline-block";
  sauvegarderBtn.style.display = "none";

  alert("Modifications enregistrées !");
});

