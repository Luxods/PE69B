import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Code, Save, Download, Upload, RefreshCw, Play } from 'lucide-react';
import './style.css';


const AdvancedMathEngine = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    title: '',
    difficulty: 'Facile',
    chapter: 'Analyse',
    variables: [],
    elements: []
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [generatedValues, setGeneratedValues] = useState({});

  const chapters = [
    'Analyse', 'Fonctions', 'Suites', 'Probabilités', 
    'Statistiques', 'Géométrie', 'Nombres complexes', 'Algorithme'
  ];
  
  const difficulties = ['Facile', 'Moyen', 'Difficile', 'Très difficile'];

  const elementTypes = [
    { type: 'text', label: 'Texte/Énoncé', icon: '📝', chapters: 'all' },
    { type: 'function', label: 'Fonction', icon: '📈', chapters: ['Analyse', 'Fonctions'] },
    { type: 'graph', label: 'Graphe', icon: '📊', chapters: ['Analyse', 'Fonctions', 'Suites'] },
    { type: 'variation_table', label: 'Tableau de variations', icon: '📋', chapters: ['Analyse', 'Fonctions'] },
    { type: 'sign_table', label: 'Tableau de signes', icon: '±', chapters: ['Analyse', 'Fonctions'] },
    { type: 'proba_tree', label: 'Arbre de probabilité', icon: '🌳', chapters: ['Probabilités'] },
    { type: 'sequence', label: 'Suite', icon: '🔢', chapters: ['Suites'] },
    { type: 'complex_plane', label: 'Plan complexe', icon: '🔷', chapters: ['Nombres complexes'] },
    { type: 'vector', label: 'Vecteur', icon: '➡️', chapters: ['Géométrie'] },
    { type: 'stats_table', label: 'Tableau statistique', icon: '📊', chapters: ['Statistiques', 'Probabilités'] },
    { type: 'equation', label: 'Équation', icon: '∑', chapters: 'all' },
    { type: 'question', label: 'Question', icon: '❓', chapters: 'all' },
    { type: 'mcq', label: 'QCM', icon: '☑️', chapters: 'all' }
  ];

  // Génération de valeurs aléatoires
  const generateRandomValues = (variables) => {
    const values = {};
    variables.forEach(v => {
      if (v.type === 'integer') {
        values[v.name] = Math.floor(Math.random() * (v.max - v.min + 1)) + v.min;
      } else if (v.type === 'decimal') {
        values[v.name] = (Math.random() * (v.max - v.min) + v.min).toFixed(v.decimals || 2);
      } else if (v.type === 'choice') {
        values[v.name] = v.choices[Math.floor(Math.random() * v.choices.length)];
      }
    });
    return values;
  };

  // Évaluation d'expressions avec variables
  const evaluateExpression = (expr, values) => {
    try {
      let evaluated = expr;
      Object.keys(values).forEach(key => {
        evaluated = evaluated.replace(new RegExp(`\\b${key}\\b`, 'g'), values[key]);
      });
      return evaluated;
    } catch (e) {
      return expr;
    }
  };

  const addVariable = () => {
    setCurrentExercise({
      ...currentExercise,
      variables: [...currentExercise.variables, {
        id: Date.now(),
        name: 'a',
        type: 'integer',
        min: 1,
        max: 10,
        decimals: 2,
        choices: []
      }]
    });
  };

  const updateVariable = (id, updates) => {
    setCurrentExercise({
      ...currentExercise,
      variables: currentExercise.variables.map(v => 
        v.id === id ? { ...v, ...updates } : v
      )
    });
  };

  const deleteVariable = (id) => {
    setCurrentExercise({
      ...currentExercise,
      variables: currentExercise.variables.filter(v => v.id !== id)
    });
  };

  const regenerateValues = () => {
    const newValues = generateRandomValues(currentExercise.variables);
    setGeneratedValues(newValues);
  };

  useEffect(() => {
    if (currentExercise.variables.length > 0) {
      regenerateValues();
    }
  }, [currentExercise.variables.length]);

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      content: getDefaultContent(type)
    };
    setCurrentExercise({
      ...currentExercise,
      elements: [...currentExercise.elements, newElement]
    });
  };

  const getDefaultContent = (type) => {
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

  const updateElement = (id, content) => {
    setCurrentExercise({
      ...currentExercise,
      elements: currentExercise.elements.map(el => 
        el.id === id ? { ...el, content } : el
      )
    });
  };

  const deleteElement = (id) => {
    setCurrentExercise({
      ...currentExercise,
      elements: currentExercise.elements.filter(el => el.id !== id)
    });
  };

  const saveExercise = () => {
    if (currentExercise.title && currentExercise.elements.length > 0) {
      setExercises([...exercises, { ...currentExercise, id: Date.now() }]);
      setCurrentExercise({
        title: '',
        difficulty: 'Facile',
        chapter: 'Analyse',
        variables: [],
        elements: []
      });
      alert('✅ Exercice sauvegardé !');
    } else {
      alert('⚠️ Veuillez ajouter un titre et au moins un élément');
    }
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(exercises, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'exercices-terminale.json';
    link.click();
    alert('📥 Exercices exportés en JSON !');
  };

  const renderVariationTable = (content) => {
    return (
      <div className="border-2 border-gray-800 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="border-r-2 border-gray-800 p-2 bg-blue-50">x</th>
              {content.points.map((pt, i) => (
                <th key={i} className="p-2 bg-blue-50">{evaluateExpression(pt.x, generatedValues)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-r-2 border-gray-800 p-2 font-medium bg-blue-50">f(x)</td>
              {content.points.map((pt, i) => (
                <td key={i} className="p-3 text-center relative">
                  <div className="font-bold">{evaluateExpression(pt.value, generatedValues)}</div>
                  {pt.variation === 'croissante' && (
                    <div className="text-green-600 text-2xl">↗</div>
                  )}
                  {pt.variation === 'décroissante' && (
                    <div className="text-red-600 text-2xl">↘</div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderSignTable = (content) => {
    return (
      <div className="border-2 border-gray-800 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="border-r-2 border-gray-800 p-2 bg-yellow-50">x</th>
              {content.points.map((pt, i) => (
                <th key={i} className="p-2 bg-yellow-50">{evaluateExpression(pt.x, generatedValues)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-r-2 border-gray-800 p-2 font-medium bg-yellow-50">signe</td>
              {content.points.map((pt, i) => (
                <td key={i} className="p-3 text-center text-2xl font-bold">
                  {pt.sign === '+' && <span className="text-green-600">+</span>}
                  {pt.sign === '-' && <span className="text-red-600">−</span>}
                  {pt.sign === '0' && <span className="text-gray-600">0</span>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderProbaTree = (content) => {
    return (
      <svg width="500" height="300" className="border border-gray-300 bg-white rounded">
        <line x1="50" y1="150" x2="150" y2="100" stroke="#3a7bd5" strokeWidth="2" />
        <line x1="50" y1="150" x2="150" y2="200" stroke="#3a7bd5" strokeWidth="2" />
        
        {/* Niveau 1 */}
        <circle cx="50" cy="150" r="5" fill="#3a7bd5" />
        <text x="160" y="95" fontSize="14" fontWeight="bold">A</text>
        <text x="120" y="120" fontSize="12" fill="#666">
          {evaluateExpression(content.levels[0].branches[0].proba, generatedValues)}
        </text>
        <text x="160" y="205" fontSize="14" fontWeight="bold">Ā</text>
        <text x="120" y="180" fontSize="12" fill="#666">
          {evaluateExpression(content.levels[0].branches[1].proba, generatedValues)}
        </text>

        {/* Niveau 2 depuis A */}
        <line x1="180" y1="100" x2="280" y2="70" stroke="#3a7bd5" strokeWidth="2" />
        <line x1="180" y1="100" x2="280" y2="130" stroke="#3a7bd5" strokeWidth="2" />
        <text x="290" y="75" fontSize="14" fontWeight="bold">B</text>
        <text x="240" y="85" fontSize="12" fill="#666">
          {evaluateExpression(content.levels[1].branches[0].proba, generatedValues)}
        </text>
        <text x="290" y="135" fontSize="14" fontWeight="bold">B̄</text>
        <text x="240" y="120" fontSize="12" fill="#666">
          {evaluateExpression(content.levels[1].branches[1].proba, generatedValues)}
        </text>

        {/* Niveau 2 depuis Ā */}
        <line x1="180" y1="200" x2="280" y2="170" stroke="#3a7bd5" strokeWidth="2" />
        <line x1="180" y1="200" x2="280" y2="230" stroke="#3a7bd5" strokeWidth="2" />
        <text x="290" y="175" fontSize="14" fontWeight="bold">B</text>
        <text x="240" y="185" fontSize="12" fill="#666">
          {evaluateExpression(content.levels[1].branches[2].proba, generatedValues)}
        </text>
        <text x="290" y="235" fontSize="14" fontWeight="bold">B̄</text>
        <text x="240" y="220" fontSize="12" fill="#666">
          {evaluateExpression(content.levels[1].branches[3].proba, generatedValues)}
        </text>
      </svg>
    );
  };

  const renderGraph = (content) => {
    const { xMin, xMax, yMin, yMax, expression } = content;
    const points = [];
    const steps = 200;
    
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (xMax - xMin) * i / steps;
      try {
        let expr = evaluateExpression(expression, generatedValues);
        expr = expr.replace(/x/g, `(${x})`).replace(/\^/g, '**');
        expr = expr.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos');
        expr = expr.replace(/exp/g, 'Math.exp').replace(/ln/g, 'Math.log');
        const y = eval(expr);
        if (!isNaN(y) && isFinite(y)) {
          points.push({ x, y });
        }
      } catch (e) {
        console.error('Erreur:', e);
      }
    }

    const width = 500;
    const height = 350;
    const padding = 50;
    
    const scaleX = (x) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const scaleY = (y) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    return (
      <svg width={width} height={height} className="border-2 border-gray-300 bg-white rounded">
        {/* Grille */}
        {content.showGrid && Array.from({ length: 11 }).map((_, i) => {
          const x = xMin + (xMax - xMin) * i / 10;
          return (
            <line
              key={`grid-v-${i}`}
              x1={scaleX(x)}
              y1={padding}
              x2={scaleX(x)}
              y2={height - padding}
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Axes */}
        <line x1={padding} y1={scaleY(0)} x2={width - padding} y2={scaleY(0)} 
              stroke="#000" strokeWidth="2" />
        <line x1={scaleX(0)} y1={padding} x2={scaleX(0)} y2={height - padding} 
              stroke="#000" strokeWidth="2" />
        
        {/* Courbe */}
        <polyline
          points={points.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')}
          fill="none"
          stroke="#3a7bd5"
          strokeWidth="3"
        />
        
        {/* Labels */}
        <text x={width - padding + 15} y={scaleY(0) + 5} fontSize="14" fontWeight="bold">x</text>
        <text x={scaleX(0) + 5} y={padding - 15} fontSize="14" fontWeight="bold">y</text>
        
        {/* Graduations */}
        <text x={scaleX(xMin)} y={height - 20} fontSize="12">{xMin}</text>
        <text x={scaleX(xMax) - 20} y={height - 20} fontSize="12">{xMax}</text>
      </svg>
    );
  };

  const renderComplexPlane = (content) => {
    const width = 400;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30;

    return (
      <svg width={width} height={height} className="border-2 border-gray-300 bg-white rounded">
        {/* Axes */}
        <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="#666" strokeWidth="2" />
        <line x1={centerX} y1="0" x2={centerX} y2={height} stroke="#666" strokeWidth="2" />
        
        {/* Grille */}
        {Array.from({ length: 11 }).map((_, i) => {
          const offset = (i - 5) * scale;
          return (
            <g key={i}>
              <line x1={centerX + offset} y1="0" x2={centerX + offset} y2={height} 
                    stroke="#e0e0e0" strokeWidth="1" />
              <line x1="0" y1={centerY + offset} x2={width} y2={centerY + offset} 
                    stroke="#e0e0e0" strokeWidth="1" />
            </g>
          );
        })}
        
        {/* Points */}
        {content.points.map((pt, i) => {
          const re = parseFloat(evaluateExpression(pt.re, generatedValues)) || 0;
          const im = parseFloat(evaluateExpression(pt.im, generatedValues)) || 0;
          const x = centerX + re * scale;
          const y = centerY - im * scale;
          
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#3a7bd5" />
              <text x={x + 10} y={y - 10} fontSize="14" fontWeight="bold">{pt.name}</text>
              <line x1={centerX} y1={centerY} x2={x} y2={y} 
                    stroke="#3a7bd5" strokeWidth="2" strokeDasharray="5,5" />
            </g>
          );
        })}
        
        {/* Labels */}
        <text x={width - 30} y={centerY - 10} fontSize="14" fontWeight="bold">Re</text>
        <text x={centerX + 10} y="20" fontSize="14" fontWeight="bold">Im</text>
      </svg>
    );
  };

  const renderElementPreview = (element) => {
    const { type, content } = element;

    switch(type) {
      case 'text':
        return <p className="text-gray-700 leading-relaxed">{evaluateExpression(content.text, generatedValues)}</p>;
      
      case 'function':
        return (
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="font-mono text-xl">
              f(x) = {evaluateExpression(content.expression, generatedValues)}
            </p>
            {content.domain && (
              <p className="text-sm text-gray-600 mt-2">Domaine : {content.domain}</p>
            )}
          </div>
        );
      
      case 'graph':
        return renderGraph(content);
      
      case 'variation_table':
        return renderVariationTable(content);
      
      case 'sign_table':
        return renderSignTable(content);
      
      case 'proba_tree':
        return renderProbaTree(content);
      
      case 'sequence':
        return (
          <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <p className="font-mono text-lg">
              {evaluateExpression(content.formula, generatedValues)}
            </p>
            {content.u0 && (
              <p className="text-sm text-gray-600 mt-2">
                u₀ = {evaluateExpression(content.u0, generatedValues)}
              </p>
            )}
          </div>
        );
      
      case 'complex_plane':
        return renderComplexPlane(content);
      
      case 'vector':
        return (
          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            {content.vectors.map((v, i) => (
              <p key={i} className="font-mono text-lg">
                {v.name} = ({evaluateExpression(v.x, generatedValues)}; {evaluateExpression(v.y, generatedValues)}
                {content.dimension === '3D' && `; ${evaluateExpression(v.z, generatedValues)}`})
              </p>
            ))}
          </div>
        );
      
      case 'stats_table':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-800">
              <thead>
                <tr className="bg-gray-100">
                  {content.headers.map((h, i) => (
                    <th key={i} className="border border-gray-800 p-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="border border-gray-800 p-2 text-center">
                        {evaluateExpression(cell, generatedValues)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'equation':
        return (
          <div className="p-4 bg-gray-50 rounded-lg text-center border-2 border-gray-300">
            <p className="font-mono text-xl">{evaluateExpression(content.latex, generatedValues)}</p>
          </div>
        );
      
      case 'question':
        return (
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="font-medium mb-3">❓ {evaluateExpression(content.question, generatedValues)}</p>
            <input
              type="text"
              className="w-full p-2 border-2 border-gray-300 rounded"
              placeholder="Votre réponse..."
              disabled
            />
            <p className="text-xs text-gray-500 mt-2">Type: {content.answerType}</p>
          </div>
        );
      
      case 'mcq':
        return (
          <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
            <p className="font-medium mb-3">☑️ {evaluateExpression(content.question, generatedValues)}</p>
            <div className="space-y-2">
              {content.options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2 p-2 hover:bg-indigo-100 rounded cursor-pointer">
                  <input type="radio" name={`mcq-${element.id}`} disabled />
                  <span>{evaluateExpression(opt.text, generatedValues)}</span>
                  {opt.correct && <span className="text-green-600 text-xs">(✓ Correct)</span>}
                </label>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const filteredElementTypes = elementTypes.filter(et => 
    et.chapters === 'all' || et.chapters.includes(currentExercise.chapter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">
                🎓 Moteur d'Exercices Infinies - Terminale
              </h1>
              <p className="text-gray-600">
                Créez des exercices avec des variables aléatoires pour un contenu illimité !
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {previewMode ? <Code size={18} /> : <Eye size={18} />}
                {previewMode ? 'Éditer' : 'Aperçu'}
              </button>
              {previewMode && currentExercise.variables.length > 0 && (
                <button
                  onClick={regenerateValues}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <RefreshCw size={18} />
                  Régénérer
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panneau principal */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
            {!previewMode ? (
              <div className="space-y-6">
                {/* Métadonnées */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-2">📋 Informations</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                      value={currentExercise.title}
                      onChange={(e) => setCurrentExercise({...currentExercise, title: e.target.value})}
                      placeholder="Ex: Étude de fonction avec paramètre"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Chapitre</label>
                      <select
                        className="w-full p-2 border-2 border-gray-300 rounded-lg"
                        value={currentExercise.chapter}
                        onChange={(e) => setCurrentExercise({...currentExercise, chapter: e.target.value})}
                      >
                        {chapters.map(ch => <option key={ch}>{ch}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Difficulté</label>
                      <select
                        className="w-full p-2 border-2 border-gray-300 rounded-lg"
                        value={currentExercise.difficulty}
                        onChange={(e) => setCurrentExercise({...currentExercise, difficulty: e.target.value})}
                      >
                        {difficulties.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Variables aléatoires */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">🎲 Variables aléatoires</h2>
                    <button
                      onClick={addVariable}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm"
                    >
                      <Plus size={16} />
                      Variable
                    </button>
                  </div>

                  {currentExercise.variables.length === 0 ? (
                    <p className="text-gray-400 text-center py-4 bg-gray-50 rounded-lg">
                      Ajoutez des variables pour créer des exercices infinis (a, b, c...)
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {currentExercise.variables.map((variable) => (
                        <div key={variable.id} className="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
                          <div className="flex items-center gap-3 mb-2">
                            <input
                              type="text"
                              className="w-20 p-1 border rounded"
                              value={variable.name}
                              onChange={(e) => updateVariable(variable.id, { name: e.target.value })}
                              placeholder="a"
                            />
                            <select
                              className="p-1 border rounded"
                              value={variable.type}
                              onChange={(e) => updateVariable(variable.id, { type: e.target.value })}
                            >
                              <option value="integer">Entier</option>
                              <option value="decimal">Décimal</option>
                              <option value="choice">Choix</option>
                            </select>
                            <button
                              onClick={() => deleteVariable(variable.id)}
                              className="ml-auto text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          {variable.type === 'integer' || variable.type === 'decimal' ? (
                            <div className="flex gap-2">
                              <input
                                type="number"
                                className="flex-1 p-1 border rounded"
                                placeholder="Min"
                                value={variable.min}
                                onChange={(e) => updateVariable(variable.id, { min: parseFloat(e.target.value) })}
                              />
                              <input
                                type="number"
                                className="flex-1 p-1 border rounded"
                                placeholder="Max"
                                value={variable.max}
                                onChange={(e) => updateVariable(variable.id, { max: parseFloat(e.target.value) })}
                              />
                              {variable.type === 'decimal' && (
                                <input
                                  type="number"
                                  className="w-20 p-1 border rounded"
                                  placeholder="Déc."
                                  value={variable.decimals}
                                  onChange={(e) => updateVariable(variable.id, { decimals: parseInt(e.target.value) })}
                                />
                              )}
                            </div>
                          ) : (
                            <input
                              type="text"
                              className="w-full p-1 border rounded"
                              placeholder="Valeurs séparées par des virgules: sin,cos,tan"
                              value={variable.choices.join(',')}
                              onChange={(e) => updateVariable(variable.id, { 
                                choices: e.target.value.split(',').map(s => s.trim()) 
                              })}
                            />
                          )}
                          
                          {generatedValues[variable.name] !== undefined && (
                            <div className="mt-2 text-sm text-purple-700 font-medium">
                              Valeur actuelle: {generatedValues[variable.name]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Éléments */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                      📝 Éléments de l'exercice
                    </h2>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Ajouter un élément</label>
                    <div className="flex flex-wrap gap-2">
                      {filteredElementTypes.map(et => (
                        <button
                          key={et.type}
                          onClick={() => addElement(et.type)}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition text-sm"
                        >
                          <span>{et.icon}</span>
                          <span>{et.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {currentExercise.elements.length === 0 ? (
                    <p className="text-gray-400 text-center py-8 bg-gray-50 rounded-lg">
                      Ajoutez des éléments pour construire votre exercice
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {currentExercise.elements.map((element, index) => (
                        <div key={element.id} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700">
                              {elementTypes.find(et => et.type === element.type)?.icon}{' '}
                              {elementTypes.find(et => et.type === element.type)?.label} #{index + 1}
                            </span>
                            <button
                              onClick={() => deleteElement(element.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          {renderElementEditor(element)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={saveExercise}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition font-medium text-lg"
                >
                  <Save size={20} />
                  Sauvegarder l'exercice
                </button>
              </div>
            ) : (
              // Mode Aperçu
              <div className="space-y-6">
                <div className="border-b-2 pb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{currentExercise.title}</h3>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      📚 {currentExercise.chapter}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      ⭐ {currentExercise.difficulty}
                    </span>
                  </div>
                  
                  {currentExercise.variables.length > 0 && (
                    <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm font-medium text-purple-900 mb-1">
                        🎲 Valeurs générées :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(generatedValues).map(([key, value]) => (
                          <span key={key} className="px-2 py-1 bg-white rounded border border-purple-300 text-sm">
                            <strong>{key}</strong> = {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {currentExercise.elements.map((element, index) => (
                  <div key={element.id} className="space-y-2">
                    {renderElementPreview(element)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Panneau latéral */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">💾 Exercices</h2>
              {exercises.length > 0 && (
                <button
                  onClick={exportJSON}
                  className="text-sm px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-1"
                >
                  <Download size={14} />
                  JSON
                </button>
              )}
            </div>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {exercises.length === 0 ? (
                <p className="text-gray-400 text-center py-8 text-sm">
                  Aucun exercice sauvegardé
                </p>
              ) : (
                exercises.map((ex) => (
                  <div key={ex.id} className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition">
                    <h4 className="font-medium text-gray-800 text-sm">{ex.title}</h4>
                    <div className="flex flex-wrap gap-1 mt-2 text-xs">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                        {ex.chapter}
                      </span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">
                        {ex.difficulty}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {ex.variables.length > 0 && (
                        <span className="mr-2">🎲 {ex.variables.length} var.</span>
                      )}
                      <span>📝 {ex.elements.length} élém.</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Guide rapide */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-900 text-sm mb-2">💡 Guide rapide</h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Créez des variables (a, b, c...)</li>
                <li>• Utilisez {'{a}'}, {'{b}'} dans les textes</li>
                <li>• Régénérez pour tester l'aléatoire</li>
                <li>• Exportez en JSON pour votre app</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderElementEditor(element) {
    const { type, content, id } = element;

    const commonTextarea = (value, field) => (
      <textarea
        className="w-full p-2 border-2 border-gray-300 rounded-lg font-mono text-sm"
        rows="2"
        value={value}
        onChange={(e) => updateElement(id, { ...content, [field]: e.target.value })}
      />
    );

    switch(type) {
      case 'text':
        return commonTextarea(content.text, 'text');

      case 'function':
        return (
          <div className="space-y-2">
            <div>
              <label className="text-xs font-medium">Expression</label>
              <input
                type="text"
                className="w-full p-2 border rounded font-mono"
                value={content.expression}
                onChange={(e) => updateElement(id, { ...content, expression: e.target.value })}
                placeholder="a*sin(x)+b"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Domaine</label>
              <input
                type="text"
                className="w-full p-1 border rounded text-sm"
                value={content.domain}
                onChange={(e) => updateElement(id, { ...content, domain: e.target.value })}
              />
            </div>
          </div>
        );

      case 'graph':
        return (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border rounded font-mono"
              value={content.expression}
              onChange={(e) => updateElement(id, { ...content, expression: e.target.value })}
              placeholder="a*x^2+b"
            />
            <div className="grid grid-cols-4 gap-1">
              {['xMin', 'xMax', 'yMin', 'yMax'].map(field => (
                <input
                  key={field}
                  type="number"
                  placeholder={field}
                  className="p-1 border rounded text-sm"
                  value={content[field]}
                  onChange={(e) => updateElement(id, { ...content, [field]: parseFloat(e.target.value) })}
                />
              ))}
            </div>
          </div>
        );

      case 'variation_table':
        return (
          <div className="text-xs">
            <p className="mb-2">Points de variation (x, valeur, variation)</p>
            {content.points.map((pt, i) => (
              <div key={i} className="flex gap-1 mb-1">
                <input
                  className="flex-1 p-1 border rounded"
                  value={pt.x}
                  onChange={(e) => {
                    const newPoints = [...content.points];
                    newPoints[i].x = e.target.value;
                    updateElement(id, { ...content, points: newPoints });
                  }}
                  placeholder="x"
                />
                <input
                  className="flex-1 p-1 border rounded"
                  value={pt.value}
                  onChange={(e) => {
                    const newPoints = [...content.points];
                    newPoints[i].value = e.target.value;
                    updateElement(id, { ...content, points: newPoints });
                  }}
                  placeholder="f(x)"
                />
                <select
                  className="flex-1 p-1 border rounded"
                  value={pt.variation}
                  onChange={(e) => {
                    const newPoints = [...content.points];
                    newPoints[i].variation = e.target.value;
                    updateElement(id, { ...content, points: newPoints });
                  }}
                >
                  <option value="">-</option>
                  <option value="croissante">↗</option>
                  <option value="décroissante">↘</option>
                </select>
              </div>
            ))}
          </div>
        );

      case 'sign_table':
        return (
          <div className="text-xs">
            <p className="mb-2">Points et signes</p>
            {content.points.map((pt, i) => (
              <div key={i} className="flex gap-1 mb-1">
                <input
                  className="flex-1 p-1 border rounded"
                  value={pt.x}
                  onChange={(e) => {
                    const newPoints = [...content.points];
                    newPoints[i].x = e.target.value;
                    updateElement(id, { ...content, points: newPoints });
                  }}
                  placeholder="x"
                />
                <select
                  className="flex-1 p-1 border rounded"
                  value={pt.sign}
                  onChange={(e) => {
                    const newPoints = [...content.points];
                    newPoints[i].sign = e.target.value;
                    updateElement(id, { ...content, points: newPoints });
                  }}
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="0">0</option>
                </select>
              </div>
            ))}
          </div>
        );

      case 'proba_tree':
        return (
          <div className="text-xs">
            <p className="text-gray-600">Arbre 2 niveaux configuré par défaut</p>
            <p className="text-gray-500 mt-1">Modifiez les probabilités dans le code JSON exporté</p>
          </div>
        );

      case 'sequence':
        return (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border rounded font-mono"
              value={content.formula}
              onChange={(e) => updateElement(id, { ...content, formula: e.target.value })}
              placeholder="U_n = a*n + b"
            />
            <input
              type="text"
              className="w-full p-1 border rounded text-sm"
              value={content.u0}
              onChange={(e) => updateElement(id, { ...content, u0: e.target.value })}
              placeholder="u0 = ..."
            />
          </div>
        );

      case 'complex_plane':
        return (
          <div className="text-xs space-y-1">
            {content.points.map((pt, i) => (
              <div key={i} className="flex gap-1">
                <input
                  className="w-16 p-1 border rounded"
                  value={pt.name}
                  onChange={(e) => {
                    const newPts = [...content.points];
                    newPts[i].name = e.target.value;
                    updateElement(id, { ...content, points: newPts });
                  }}
                  placeholder="z1"
                />
                <input
                  className="flex-1 p-1 border rounded"
                  value={pt.re}
                  onChange={(e) => {
                    const newPts = [...content.points];
                    newPts[i].re = e.target.value;
                    updateElement(id, { ...content, points: newPts });
                  }}
                  placeholder="Re"
                />
                <input
                  className="flex-1 p-1 border rounded"
                  value={pt.im}
                  onChange={(e) => {
                    const newPts = [...content.points];
                    newPts[i].im = e.target.value;
                    updateElement(id, { ...content, points: newPts });
                  }}
                  placeholder="Im"
                />
              </div>
            ))}
          </div>
        );

      case 'vector':
        return (
          <div className="text-xs">
            {content.vectors.map((v, i) => (
              <div key={i} className="flex gap-1 mb-1">
                <input
                  className="w-12 p-1 border rounded"
                  value={v.name}
                  onChange={(e) => {
                    const newVecs = [...content.vectors];
                    newVecs[i].name = e.target.value;
                    updateElement(id, { ...content, vectors: newVecs });
                  }}
                />
                <input
                  className="flex-1 p-1 border rounded"
                  value={v.x}
                  onChange={(e) => {
                    const newVecs = [...content.vectors];
                    newVecs[i].x = e.target.value;
                    updateElement(id, { ...content, vectors: newVecs });
                  }}
                  placeholder="x"
                />
                <input
                  className="flex-1 p-1 border rounded"
                  value={v.y}
                  onChange={(e) => {
                    const newVecs = [...content.vectors];
                    newVecs[i].y = e.target.value;
                    updateElement(id, { ...content, vectors: newVecs });
                  }}
                  placeholder="y"
                />
              </div>
            ))}
          </div>
        );

      case 'stats_table':
        return (
          <div className="text-xs">
            <p className="mb-1">En-têtes (séparés par virgules)</p>
            <input
              className="w-full p-1 border rounded mb-2"
              value={content.headers.join(',')}
              onChange={(e) => updateElement(id, { 
                ...content, 
                headers: e.target.value.split(',').map(s => s.trim()) 
              })}
            />
            <p className="mb-1">Lignes</p>
            {content.rows.map((row, i) => (
              <input
                key={i}
                className="w-full p-1 border rounded mb-1"
                value={row.join(',')}
                onChange={(e) => {
                  const newRows = [...content.rows];
                  newRows[i] = e.target.value.split(',').map(s => s.trim());
                  updateElement(id, { ...content, rows: newRows });
                }}
              />
            ))}
          </div>
        );

      case 'equation':
        return (
          <input
            type="text"
            className="w-full p-2 border rounded font-mono"
            value={content.latex}
            onChange={(e) => updateElement(id, { ...content, latex: e.target.value })}
            placeholder="a*x^2 + b*x + c = 0"
          />
        );

      case 'question':
        return (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={content.question}
              onChange={(e) => updateElement(id, { ...content, question: e.target.value })}
              placeholder="Question"
            />
            <div className="flex gap-2">
              <select
                className="p-2 border rounded"
                value={content.answerType}
                onChange={(e) => updateElement(id, { ...content, answerType: e.target.value })}
              >
                <option value="numeric">Numérique</option>
                <option value="text">Texte</option>
                <option value="expression">Expression</option>
              </select>
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                value={content.answer}
                onChange={(e) => updateElement(id, { ...content, answer: e.target.value })}
                placeholder="Réponse attendue"
              />
            </div>
          </div>
        );

      case 'mcq':
        return (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={content.question}
              onChange={(e) => updateElement(id, { ...content, question: e.target.value })}
              placeholder="Question"
            />
            <div className="text-xs">
              {content.options.map((opt, i) => (
                <div key={i} className="flex gap-1 mb-1">
                  <input
                    type="checkbox"
                    checked={opt.correct}
                    onChange={(e) => {
                      const newOpts = [...content.options];
                      newOpts[i].correct = e.target.checked;
                      updateElement(id, { ...content, options: newOpts });
                    }}
                  />
                  <input
                    className="flex-1 p-1 border rounded"
                    value={opt.text}
                    onChange={(e) => {
                      const newOpts = [...content.options];
                      newOpts[i].text = e.target.value;
                      updateElement(id, { ...content, options: newOpts });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <p className="text-gray-400">Éditeur non disponible</p>;
    }
  }
};

export default AdvancedMathEngine;