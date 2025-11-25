import React from 'react';
import { Info } from 'lucide-react';

const EquationEditor = ({ content, onUpdate }) => {
  // Initialiser le contenu s'il n'existe pas
  const safeContent = content || {
    type: 'simple',
    latex: '',
    showSteps: false,
    showSolution: false,
    requireAnswer: false,
    answerType: 'expression',
    correctAnswer: '',
    answerHint: ''
  };

  // Fonction pour changer le type et nettoyer les champs inutiles
  const handleTypeChange = (newType) => {
    let newContent = {
      type: newType,
      showSteps: safeContent.showSteps || false,
      showSolution: safeContent.showSolution || false,
      requireAnswer: safeContent.requireAnswer || false,
      answerType: safeContent.answerType || 'expression',
      correctAnswer: safeContent.correctAnswer || '',
      answerHint: safeContent.answerHint || ''
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
      {/* Type d'équation */}
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

      {/* Équation */}
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
            Utilisez \begin{`{cases}`} pour un système LaTeX et \end{`{cases}`}
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
            placeholder="Ex: {a}x^2 + {b}x + {c} = 0"
          />
          <p className="text-xs text-gray-600 mt-1">
            Utilisez {`{variable}`} pour les valeurs dynamiques
          </p>
        </div>
      )}

      {/* Champ de réponse */}
      <div className="space-y-3 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-blue-900">Champ de réponse</h4>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={safeContent.requireAnswer || false}
              onChange={(e) => updateContent('requireAnswer', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Activer le champ de réponse</span>
          </label>
        </div>

        {safeContent.requireAnswer && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Type de réponse attendu
              </label>
              <select
                className="w-full p-2 border border-blue-200 rounded bg-white"
                value={safeContent.answerType || 'expression'}
                onChange={(e) => updateContent('answerType', e.target.value)}
              >
                <option value="number">Nombre</option>
                <option value="expression">Expression mathématique</option>
                <option value="set">Ensemble de solutions</option>
                <option value="interval">Intervalle</option>
                <option value="vector">Vecteur/Coordonnées</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Réponse correcte (LaTeX)
              </label>
              <input
                type="text"
                className="w-full p-2 border border-blue-200 rounded font-mono"
                value={safeContent.correctAnswer || ''}
                onChange={(e) => updateContent('correctAnswer', e.target.value)}
                placeholder={
                  safeContent.answerType === 'number' ? 'Ex: 42 ou {result}' :
                  safeContent.answerType === 'set' ? 'Ex: \\{-2, 3\\}' :
                  safeContent.answerType === 'interval' ? 'Ex: [-1, 5[' :
                  safeContent.answerType === 'vector' ? 'Ex: (2, -3)' :
                  'Ex: x = 2 ou x = \\frac{-b}{2a}'
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Indication (optionnel)
              </label>
              <input
                type="text"
                className="w-full p-2 border border-blue-200 rounded"
                value={safeContent.answerHint || ''}
                onChange={(e) => updateContent('answerHint', e.target.value)}
                placeholder="Ex: Donner la valeur exacte, Arrondir à 10^-2 près..."
              />
            </div>

            <div className="flex items-start gap-2 p-2 bg-blue-100 rounded">
              <Info size={16} className="text-blue-700 mt-0.5" />
              <div className="text-xs text-blue-700">
                La réponse peut contenir des variables dynamiques avec {`{variable}`}.
                Le système vérifiera automatiquement la réponse de l'élève.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Étapes */}
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

      {/* Solution */}
      {safeContent.showSolution && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Solution complète (format LaTeX)
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