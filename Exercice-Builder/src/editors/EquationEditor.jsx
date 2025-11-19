import React from 'react';

const EquationEditor = ({ content, onUpdate }) => {
  // Initialiser le contenu s'il n'existe pas
  const safeContent = content || {
    type: 'simple',
    latex: '',
    showSteps: false,
    showSolution: false
  };

  // Fonction pour changer le type et nettoyer les champs inutiles
  const handleTypeChange = (newType) => {
    let newContent = {
      type: newType,
      showSteps: safeContent.showSteps || false,
      showSolution: safeContent.showSolution || false
    };

    if (safeContent.solution) {
      newContent.solution = safeContent.solution;
    }

    if (safeContent.steps) {
      newContent.steps = safeContent.steps;
    }

    if (newType === 'system') {
      newContent.system = safeContent.system || '';
    } else {
      newContent.latex = safeContent.latex || '';
    }

    onUpdate(newContent);
  };

  const updateContent = (field, value) => {
    onUpdate({ ...safeContent, [field]: value });
  };

  const addStep = () => {
    const steps = safeContent.steps || [];
    updateContent('steps', [...steps, '']);
  };

  const updateStep = (index, value) => {
    const steps = [...(safeContent.steps || [])];
    steps[index] = value;
    updateContent('steps', steps);
  };

  const removeStep = (index) => {
    const steps = (safeContent.steps || []).filter((_, i) => i !== index);
    updateContent('steps', steps);
  };

  return (
    <div className="space-y-4">
      {/* Le reste du JSX reste identique */}
      <div>
        <label className="block text-sm font-medium mb-1">Type d'équation</label>
        <select 
          className="w-full p-2 border rounded"
          value={safeContent.type || 'simple'}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="simple">Équation simple</option>
          <option value="system">Système d'équations</option>
        </select>
      </div>

      {safeContent.type === 'system' ? (
        <div>
          <label className="block text-sm font-medium mb-1">
            Système d'équations (LaTeX)
          </label>
          <textarea 
            className="w-full p-2 border rounded font-mono text-sm"
            rows={4}
            value={safeContent.system || ''}
            onChange={(e) => updateContent('system', e.target.value)}
            placeholder={'Exemple avec LaTeX:\n\\begin{cases}\n{a}x + {b}y = {c} \\\\\n{d}x + {e}y = {f}\n\\end{cases}\n'}
          />
          <p className="text-xs text-gray-600 mt-1">
            Utilisez \begin{`{cases}`} pour un système LaTeX et \end{'cases'}
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
            value={safeContent.latex || ''}
            onChange={(e) => updateContent('latex', e.target.value)}
            placeholder="Ex: a*x^2 + b*x + c = 0"
          />
          <p className="text-xs text-gray-600 mt-1">
            Utilisez {`{variable}`} pour les valeurs dynamiques
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={safeContent.showSteps || false}
            onChange={(e) => updateContent('showSteps', e.target.checked)}
          />
          <span className="text-sm">Afficher les étapes</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={safeContent.showSolution || false}
            onChange={(e) => updateContent('showSolution', e.target.checked)}
          />
          <span className="text-sm">Afficher la solution</span>
        </label>
      </div>

      {safeContent.showSteps && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Étapes personnalisées (optionnel)
          </label>
          <div className="space-y-2">
            {(safeContent.steps || []).map((step, index) => (
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
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addStep}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              type="button"
            >
              + Ajouter une étape
            </button>
          </div>
        </div>
      )}

      {safeContent.showSolution && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Solution (format LaTeX)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded font-mono"
            value={safeContent.solution || ''}
            onChange={(e) => updateContent('solution', e.target.value)}
            placeholder="Ex: x = \\frac{-{b} \\pm \\sqrt{{b}^2 - 4{a}{c}}}{2{a}}"
          />
        </div>
      )}
    </div>
  );
};

export default EquationEditor;