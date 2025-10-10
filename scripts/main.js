// Fonction pour charger un composant HTML dans un élément cible
function loadComponent(id, filePath) {
    fetch(filePath)
        .then(res => res.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(err => console.error(`Erreur chargement ${filePath} :`, err));
}

// Charger les composants
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("sidebar", "components/sidebar.html");
    loadComponent("header", "components/header.html");
    loadComponent("footer", "components/footer.html");
});
