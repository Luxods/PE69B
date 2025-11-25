export const chapters = [
  'Analyse', 'Fonctions', 'Suites', 'Probabilités', 
  'Statistiques', 'Géométrie', 'Nombres complexes', 'Algorithme'
];

export const difficulties = ['Facile', 'Moyen', 'Difficile'];

export const COMPETENCES_BY_CHAPTER = {
  'Analyse': [
    'Calculer une limite',
    'Étudier la continuité',
    'Calculer une dérivée',
    'Étudier les variations',
    'Déterminer les extremums',
    'Étudier la convexité',
    'Calculer une primitive',
    'Calculer une intégrale',
    'Interpréter graphiquement'
  ],
  
  'Fonctions': [
    'Déterminer le domaine de définition',
    'Étudier la parité',
    'Étudier la périodicité',
    'Résoudre une équation',
    'Résoudre une inéquation',
    'Étudier le signe',
    'Tracer la courbe représentative',
    'Déterminer une asymptote',
    'Utiliser la composition'
  ],
  
  'Suites': [
    'Calculer les premiers termes',
    'Étudier la monotonie',
    'Étudier les variations',
    'Démontrer par récurrence',
    'Calculer une limite',
    'Étudier la convergence',
    'Reconnaître une suite arithmétique',
    'Reconnaître une suite géométrique',
    'Utiliser un algorithme'
  ],
  
  'Probabilités': [
    'Modéliser une situation',
    'Utiliser un arbre pondéré',
    'Calculer une probabilité',
    'Calculer une probabilité conditionnelle',
    'Utiliser la formule des probabilités totales',
    'Reconnaître une loi de probabilité',
    'Utiliser une loi binomiale',
    'Utiliser une loi normale',
    'Calculer une espérance',
    'Calculer une variance'
  ],
  
  'Statistiques': [
    'Calculer la moyenne',
    'Calculer la médiane',
    'Calculer les quartiles',
    'Calculer l\'écart-type',
    'Calculer la variance',
    'Interpréter un diagramme',
    'Tracer un diagramme',
    'Étudier une série statistique',
    'Utiliser une régression linéaire'
  ],
  
  'Géométrie': [
    'Calculer un produit scalaire',
    'Calculer une norme',
    'Déterminer une équation de droite',
    'Déterminer une équation de plan',
    'Étudier l\'orthogonalité',
    'Étudier le parallélisme',
    'Calculer une distance',
    'Utiliser la colinéarité',
    'Résoudre un problème de géométrie dans l\'espace'
  ],
  
  'Nombres complexes': [
    'Calculer avec les nombres complexes',
    'Déterminer la forme algébrique',
    'Déterminer la forme exponentielle',
    'Déterminer le module',
    'Déterminer l\'argument',
    'Utiliser la conjugaison',
    'Résoudre une équation',
    'Interpréter géométriquement',
    'Utiliser les transformations'
  ],
  
  'Algorithme': [
    'Écrire un algorithme',
    'Analyser un algorithme',
    'Utiliser une boucle',
    'Utiliser une condition',
    'Utiliser une variable',
    'Programmer en Python',
    'Tester un algorithme',
    'Optimiser un algorithme'
  ]
};

export const getCompetencesByChapter = (chapter) => {
  return COMPETENCES_BY_CHAPTER[chapter] || [];
};

export const getAllCompetences = () => {
  return Object.values(COMPETENCES_BY_CHAPTER).flat();
};

export const searchCompetences = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return getAllCompetences().filter(comp => 
    comp.toLowerCase().includes(term)
  );
};

export const elementTypes = [
  { type: 'text', label: 'Texte/Énoncé', icon: '📝', chapters: 'all' },
  { type: 'function', label: 'Fonction', icon: '📈', chapters: ['Analyse', 'Fonctions'] },
  { type: 'graph', label: 'Graphe', icon: '📊', chapters: ['Analyse', 'Fonctions', 'Suites'] },
  { type: 'variation_table', label: 'Tableau de variations', icon: '📋', chapters: ['Analyse', 'Fonctions'] },
  { type: 'sign_table', label: 'Tableau de signes', icon: '±', chapters: ['Analyse', 'Fonctions'] },
  { type: 'proba_tree', label: 'Arbre de probabilité', icon: '🌳', chapters: ['Probabilités'] },
  { type: 'sequence', label: 'Suite', icon: '🔢', chapters: ['Suites'] },
  { type: 'discrete_graph', label: 'Graphe Discret', icon: '📊', chapters: ['Analyse', 'Fonctions', 'Suites'] },
  { type: 'complex_plane', label: 'Plan complexe', icon: '🔷', chapters: ['Nombres complexes'] },
  { type: 'vector', label: 'Vecteur', icon: '➡️', chapters: ['Géométrie'] },
  { type: 'stats_table', label: 'Tableau statistique', icon: '📊', chapters: ['Statistiques', 'Probabilités'] },
  { type: 'equation', label: 'Équation', icon: '∑', chapters: 'all' },
  { type: 'question', label: 'Question', icon: '❓', chapters: 'all' },
  { type: 'mcq', label: 'QCM', icon: '☑️', chapters: 'all' }
];


