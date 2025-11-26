export const getDefaultContent = (type) => {
  switch(type) {
    case 'text':
      return { text: 'Énoncé de l\'exercice. Utilisez {a}, {b}... pour les variables.' };
    case 'function':
      return { 
        expression: 'a*sin(x)+b',
        domain: ']-∞; +∞[',
        latex: true
      };
    case 'graph':
      return {
        expression: 'a*x^2+b*x+c',
        xMin: -5,
        xMax: 5,
        yMin: -10,
        yMax: 10,
        showGrid: true,
        showAxes: true
      };
    case 'variation_table':
      return {
        points: [
          { x: '-∞', value: '', variation: 'croissante' },
          { x: '0', value: 'b', variation: 'décroissante' },
          { x: '+∞', value: '', variation: '' }
        ]
      };
    case 'sign_table':
      return {
        points: [
          { x: '-∞', sign: '-' },
          { x: 'a', sign: '0' },
          { x: '+∞', sign: '+' }
        ]
      };
    case 'proba_tree':
      return {
        nodes: [
          // Racine
          { id: 0, label: 'Départ', x: 50, y: 150, isRoot: true },
          
          // Niveau 1
          { id: 1, label: 'A', x: 200, y: 100, parent: 0, proba: '0.6' },
          { id: 2, label: 'non A', x: 200, y: 200, parent: 0, proba: '0.4' },
          
          // Niveau 2 - branches de A
          { id: 3, label: 'B', x: 350, y: 50, parent: 1, proba: '0.3' },
          { id: 4, label: 'non B', x: 350, y: 130, parent: 1, proba: '0.7' },
          
          // Niveau 2 - branches de non A
          { id: 5, label: 'B', x: 350, y: 180, parent: 2, proba: '0.5' },
          { id: 6, label: 'non B', x: 350, y: 260, parent: 2, proba: '0.5' }
        ]
      };
    case 'sequence':
      return {
        type: 'explicit',
        formula: 'U_n = a*n + b',  // Seulement pour type explicit
        u0: '1',
        relation: '',              // Seulement pour type recursive
        reason: '',                // Seulement pour arithmetic/geometric
        showTerms: true,
        termsCount: 5
      };
    case 'complex_plane':
      return {
        points: [
          { name: 'z1', re: 'a', im: 'b' },
          { name: 'z2', re: 'c', im: 'd' }
        ]
      };
    case 'vector':
      return {
        vectors: [
          { name: 'u', x: 'a', y: 'b', z: '0' }
        ],
        dimension: '2D'
      };
    case 'stats_table':
      return {
        headers: ['Valeur', 'Effectif', 'Fréquence'],
        rows: [
          ['a', '10', ''],
          ['b', '15', '']
        ]
      };
    case 'equation':
      return { latex: 'a x^2 + b x + c = 0' };
    case 'question':
      return { 
        question: 'Calculez la valeur de f(a).',
        answerType: 'numeric',
        answer: '',
        tolerance: 0.01
      };
    case 'mcq':
      return {
        question: 'Quelle est la dérivée de f(x) = a*sin(x) ?',
        options: [
          { text: 'a*cos(x)', correct: true },
          { text: 'a*sin(x)', correct: false },
          { text: '-a*cos(x)', correct: false },
          { text: 'cos(x)', correct: false }
        ]
      };
    default:
      return {};
  }
};