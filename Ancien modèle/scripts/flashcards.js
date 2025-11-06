// Liste des flashcards (tu peux en ajouter facilement)
const flashcards = [
  {
    question: "Définition d'une fonction dérivable en un point",
    answer: "Une fonction f est dérivable en a si la limite du taux d'accroissement existe en a."
  },
  {
    question: "Dérivée de sin(x)",
    answer: "cos(x)"
  },
  {
    question: "Dérivée de ln(x)",
    answer: "1 / x"
  },
  {
    question: "Formule du binôme de Newton",
    answer: "(a + b)^n = Σ C(n, k) * a^(n−k) * b^k"
  }
];

// Création dynamique des cartes
const container = document.getElementById("flashcards-container");

flashcards.forEach(card => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("flashcard");

  cardElement.innerHTML = `
    <div class="flashcard-inner">
      <div class="flashcard-front">${card.question}</div>
      <div class="flashcard-back">${card.answer}</div>
    </div>
  `;

  cardElement.addEventListener("click", () => {
    cardElement.classList.toggle("flipped");
  });

  container.appendChild(cardElement);
});
