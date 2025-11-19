export const chapters = [
  'Analyse', 'Fonctions', 'Suites', 'Probabilités', 
  'Statistiques', 'Géométrie', 'Nombres complexes', 'Algorithme'
];

export const difficulties = ['Facile', 'Moyen', 'Difficile'];

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