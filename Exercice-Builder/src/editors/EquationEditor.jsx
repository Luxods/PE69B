import React from 'react';

const EquationEditor = ({ element, updateElement }) => {
  const content = element.content || {};

  // Fonction pour changer le type et nettoyer les champs inutiles
  const handleTypeChange = (newType) => {
    // Créer un nouveau contenu selon le type
    let newContent = {
      type: newType,
      showSteps: content.showSteps || false,
      showSolution: content.showSolution || false
    };

    // Garder la solution si elle existe
    if (content.solution) {
      newContent.solution = content.solution;
    }

    // Garder les étapes personnalisées si elles existent
    if (content.steps) {
      newContent.steps = content.steps;
    }

    // Initialiser le champ approprié selon le type
    if (newType === 'system') {
      newContent.system = '';
      // Supprimer les champs inutiles
      delete newContent.latex;
      delete newContent.equation;
    } else {
      newContent.latex = '';
      // Supprimer les champs inutiles
      delete newContent.system;
      delete newContent.equation;
    }

    updateElement({
      ...element,
      content: newContent
    });
  };

  const updateContent = (field, value) => {
    updateElement({
      ...element,
      content: { ...content, [field]: value }
    });
  };

  const addStep = () => {
    const steps = content.steps || [];
    updateContent('steps', [...steps, '']);
  };

  const updateStep = (index, value) => {
    const steps = [...(content.steps || [])];
    steps[index] = value;
    updateContent('steps', steps);
  };

  const removeStep = (index) => {
    const steps = content.steps.filter((_, i) => i !== index);
    updateContent('steps', steps);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Type d'équation</label>
        <select 
          className="w-full p-2 border rounded"
          value={content.type || 'simple'}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="simple">Équation simple</option>
          <option value="system">Système d'équations</option>
        </select>
      </div>

      {content.type === 'system' ? (
        <div>
          <label className="block text-sm font-medium mb-1">
            Système d'équations (LaTeX ou une équation par ligne)
          </label>
          <textarea 
            className="w-full p-2 border rounded font-mono text-sm"
            rows={4}
            value={content.system || ''}
            onChange={(e) => updateContent('system', e.target.value)}
            placeholder={'Exemple avec LaTeX:\n\\begin{cases}\n{a}x + {b}y = {c} \\\\\n{d}x + {e}y = {f}\n\\end{cases}\n\nOu simple:\n{a}x + {b}y = {c}\n{d}x + {e}y = {f}'}
          />
          <p className="text-xs text-gray-600 mt-1">
            Utilisez \begin{`{cases}`} pour un système LaTeX ou séparez les équations par des retours à la ligne
          </p>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-1">
            Équation (format LaTeX)
          </label>
          <input 
            type="text"
            className="w-full p-2 border rounded font-mono"
            value={content.latex || ''}
            onChange={(e) => updateContent('latex', e.target.value)}
            placeholder="Ex: {a}x^2 + {b}x + {c} = 0"
          />
          <p className="text-xs text-gray-600 mt-1">
            Utilisez {`{variable}`} pour les valeurs dynamiques, $ $ pour inline, $$ $$ pour bloc
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={content.showSteps || false}
            onChange={(e) => updateContent('showSteps', e.target.checked)}
          />
          <span className="text-sm">Afficher les étapes</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={content.showSolution || false}
            onChange={(e) => updateContent('showSolution', e.target.checked)}
          />
          <span className="text-sm">Afficher la solution</span>
        </label>
      </div>

      {content.showSteps && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Étapes personnalisées (optionnel)
          </label>
          <div className="space-y-2">
            {(content.steps || []).map((step, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded text-sm"
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  placeholder={`Étape ${index + 1} (peut contenir du LaTeX)`}
                />
                <button
                  onClick={() => removeStep(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addStep}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              + Ajouter une étape
            </button>
          </div>
        </div>
      )}

      {content.showSolution && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Solution (format LaTeX)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded font-mono"
            value={content.solution || ''}
            onChange={(e) => updateContent('solution', e.target.value)}
            placeholder="Ex: x = \\frac{-{b} \\pm \\sqrt{{b}^2 - 4{a}{c}}}{2{a}}"
          />
        </div>
      )}

      {/* Aperçu LaTeX */}
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-xs font-semibold mb-2 text-gray-600">Aide LaTeX :</p>
        <div className="text-xs space-y-1 font-mono">
          <p>• Fraction: \frac{`{num}`}{`{den}`}</p>
          <p>• Racine: \sqrt{`{x}`}</p>
          <p>• Puissance: x^{`{n}`}</p>
          <p>• Système: \begin{`{cases}`}...\end{`{cases}`}</p>
          <p>• Symboles: \leq, \geq, \neq, \pm, \infty</p>
        </div>
      </div>
    </div>
  );
};

export default EquationEditor;