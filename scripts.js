// Fonction pour filtrer les modules par semestre
function filterModules(semester) {
  const rows = document.querySelectorAll("#programme tbody tr");
  rows.forEach(row => {
      if (semester === "all" || row.getAttribute("data-semester") === semester) {
          row.style.display = ""; // Afficher la ligne
      } else {
          row.style.display = "none"; // Masquer la ligne
      }
  });
}

// Appliquer le filtre par défaut (Semestre 1) au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionner le semestre 1 par défaut
  document.getElementById("semesterFilter").value = "S1";
  // Appliquer le filtre
  filterModules("S1");
});

// Gérer le changement de filtre
document.getElementById("semesterFilter").addEventListener("change", function (e) {
  filterModules(e.target.value);
});
