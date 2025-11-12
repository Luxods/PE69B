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
        levels: [
          {
            name: 'Niveau 1',
            branches: [
              { label: 'A', proba: '0.6' },
              { label: 'non A', proba: '0.4' }
            ]
          },
          {
            name: 'Niveau 2',
            branches: [
              { parent: 'A', label: 'B', proba: '0.3' },
              { parent: 'A', label: 'non B', proba: '0.7' },
              { parent: 'non A', label: 'B', proba: '0.5' },
              { parent: 'non A', label: 'non B', proba: '0.5' }
            ]
          }
        ]
      };
    case 'sequence':
      return {
        type: 'explicit',
        formula: 'U_n = a*n + b',
        u0: 'a',
        relation: ''
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