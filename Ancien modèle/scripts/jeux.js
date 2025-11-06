// Fonction pour lancer un jeu
function lancerJeu(typeJeu) {
    // Pour l'instant, on redirige vers une page dédiée ou on affiche un modal
    // Dans une vraie application, on créerait des pages séparées pour chaque jeu
    
    const jeux = {
        'quiz': {
            titre: 'Quiz Rapide',
            url: '/jeux/quiz.html'
        },
        'calcul': {
            titre: 'Calcul Mental',
            url: '/jeux/calcul-mental.html'
        },
        'derivees': {
            titre: 'Dérivées Challenge',
            url: '/jeux/derivees.html'
        },
        'probas': {
            titre: 'Probabilités Master',
            url: '/jeux/probabilites.html'
        },
        'geometrie': {
            titre: 'Géométrie 3D',
            url: '/jeux/geometrie.html'
        },
        'suites': {
            titre: 'Suites Logiques',
            url: '/jeux/suites.html'
        }
    };

    const jeu = jeux[typeJeu];
    
    if (jeu) {
        // Pour le moment, afficher un message
        // Dans une version complète, rediriger vers le jeu
        alert(`Lancement du jeu "${jeu.titre}"!\n\nCe jeu sera bientôt disponible. 🎮`);
        
        // Simulation du chargement
        const card = document.querySelector(`[data-jeu="${typeJeu}"]`);
        if (card) {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        }
        
        // Dans une vraie application, décommenter :
        // window.location.href = jeu.url;
    }
}

// Animation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.jeu-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Charger les scores depuis le localStorage (simulation)
    chargerScores();
});

// Fonction pour charger les scores
function chargerScores() {
    // Dans une vraie application, on récupérerait les scores depuis une base de données
    // Ici, on simule avec des données statiques ou localStorage
    
    const scoresLocaux = localStorage.getItem('mathsTermScores');
    
    if (scoresLocaux) {
        try {
            const scores = JSON.parse(scoresLocaux);
            afficherScores(scores);
        } catch (e) {
            console.error('Erreur lors du chargement des scores:', e);
        }
    }
}

// Fonction pour afficher les scores
function afficherScores(scores) {
    const tbody = document.getElementById('leaderboard-body');
    
    if (!tbody || !scores || scores.length === 0) return;
    
    tbody.innerHTML = '';
    
    scores.slice(0, 10).forEach((score, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.joueur}</td>
            <td>${score.jeu}</td>
            <td>${score.points} pts</td>
        `;
        tbody.appendChild(tr);
    });
}

// Fonction pour ajouter un score
function ajouterScore(joueur, jeu, points) {
    let scores = [];
    
    const scoresLocaux = localStorage.getItem('mathsTermScores');
    if (scoresLocaux) {
        scores = JSON.parse(scoresLocaux);
    }
    
    scores.push({
        joueur: joueur,
        jeu: jeu,
        points: points,
        date: new Date().toISOString()
    });
    
    // Trier par points décroissants
    scores.sort((a, b) => b.points - a.points);
    
    // Garder seulement les 50 meilleurs scores
    scores = scores.slice(0, 50);
    
    localStorage.setItem('mathsTermScores', JSON.stringify(scores));
    afficherScores(scores);
}

// Exemple de jeu simple : Quiz interactif
class QuizJeu {
    constructor() {
        this.score = 0;
        this.questionActuelle = 0;
        this.questions = [
            {
                question: "Quelle est la dérivée de x² ?",
                reponses: ["2x", "x", "2", "x²"],
                correcte: 0
            },
            {
                question: "Combien vaut ln(e) ?",
                reponses: ["0", "1", "e", "∞"],
                correcte: 1
            },
            {
                question: "Quelle est la limite de 1/x quand x tend vers +∞ ?",
                reponses: ["1", "∞", "0", "-∞"],
                correcte: 2
            }
        ];
    }
    
    demarrer() {
        this.score = 0;
        this.questionActuelle = 0;
        // Logique du jeu...
    }
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { lancerJeu, ajouterScore, QuizJeu };
}