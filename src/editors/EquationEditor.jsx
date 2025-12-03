import React from 'react';
import { Info, AlertTriangle } from 'lucide-react';

const EquationEditor = ({ content, onUpdate }) => {
  const safeContent = content || {
    type: 'simple',
    latex: '',
    requireAnswer: false,
    answerType: 'expression',
    correctAnswer: '',
    answerHint: '',
    // Options pour équations du second degré
    isQuadratic: false,
    requirePositiveDiscriminant: false,
    discriminantVariables: { a: 'a', b: 'b', c: 'c' }
  };

  const handleTypeChange = (newType) => {
    let newContent = {
      type: newType,
      showSolution: safeContent.showSolution || false,
      requireAnswer: safeContent.requireAnswer || false,
      answerType: safeContent.answerType || 'expression',
      correctAnswer: safeContent.correctAnswer || '',
      answerHint: safeContent.answerHint || '',
      isQuadratic: safeContent.isQuadratic || false,
      requirePositiveDiscriminant: safeContent.requirePositiveDiscriminant || false,
      discriminantVariables: safeContent.discriminantVariables || { a: 'a', b: 'b', c: 'c' }
    };

    if (safeContent.solution) {
      newContent.solution = safeContent.solution;
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

  const updateDiscriminantVariable = (coef, varName) => {
    const newVars = { ...safeContent.discriminantVariables, [coef]: varName };
    updateContent('discriminantVariables', newVars);
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
        <>
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

          {/* Options pour équation du second degré */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={safeContent.isQuadratic || false}
                onChange={(e) => updateContent('isQuadratic', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-purple-900">
                Équation du second degré (ax² + bx + c = 0)
              </span>
            </label>

            {safeContent.isQuadratic && (
              <div className="space-y-3 pl-6">
                {/* Contrainte discriminant */}
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={safeContent.requirePositiveDiscriminant || false}
                    onChange={(e) => updateContent('requirePositiveDiscriminant', e.target.checked)}
                    className="mt-0.5 rounded"
                  />
                  <div>
                    <span className="text-sm font-medium text-purple-800">
                      Forcer Δ {'>='} 0 (deux solutions réelles)
                    </span>
                    <p className="text-xs text-purple-600 mt-0.5">
                      Les variables seront régénérées jusqu'à obtenir b² - 4ac {'>='} 0
                    </p>
                  </div>
                </label>

                {/* Configuration des variables */}
                {safeContent.requirePositiveDiscriminant && (
                  <div className="p-3 bg-purple-100 rounded">
                    <p className="text-xs font-medium text-purple-800 mb-2">
                      Noms des variables pour a, b et c :
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        className="px-2 py-1 text-sm border border-purple-300 rounded bg-white"
                        value={safeContent.discriminantVariables?.a || 'a'}
                        onChange={(e) => updateDiscriminantVariable('a', e.target.value)}
                        placeholder="Variable a"
                      />
                      <input
                        type="text"
                        className="px-2 py-1 text-sm border border-purple-300 rounded bg-white"
                        value={safeContent.discriminantVariables?.b || 'b'}
                        onChange={(e) => updateDiscriminantVariable('b', e.target.value)}
                        placeholder="Variable b"
                      />
                      <input
                        type="text"
                        className="px-2 py-1 text-sm border border-purple-300 rounded bg-white"
                        value={safeContent.discriminantVariables?.c || 'c'}
                        onChange={(e) => updateDiscriminantVariable('c', e.target.value)}
                        placeholder="Variable c"
                      />
                    </div>
                    <div className="mt-2 flex items-start gap-1">
                      <AlertTriangle size={12} className="text-purple-700 mt-0.5" />
                      <p className="text-xs text-purple-700">
                        Assurez-vous que ces variables existent avec des plages appropriées
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Champ de réponse */}
      <div className="space-y-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-blue-900">Réponse attendue</h4>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={safeContent.requireAnswer || false}
              onChange={(e) => updateContent('requireAnswer', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Demander une réponse</span>
          </label>
        </div>

        {safeContent.requireAnswer && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-blue-900 mb-1">
                  Type de réponse
                </label>
                <select
                  className="w-full p-2 border border-blue-300 rounded bg-white text-sm"
                  value={safeContent.answerType || 'expression'}
                  onChange={(e) => updateContent('answerType', e.target.value)}
                >
                  <option value="number">Nombre</option>
                  <option value="expression">Expression</option>
                  <option value="set">Ensemble</option>
                  <option value="interval">Intervalle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-blue-900 mb-1">
                  Indication
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-blue-300 rounded text-sm"
                  value={safeContent.answerHint || ''}
                  onChange={(e) => updateContent('answerHint', e.target.value)}
                  placeholder="Ex: 2 décimales"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-900 mb-1">
                Réponse correcte (avec variables {`{}`})
              </label>
              <input
                type="text"
                className="w-full p-2 border border-blue-300 rounded font-mono text-sm"
                value={safeContent.correctAnswer || ''}
                onChange={(e) => updateContent('correctAnswer', e.target.value)}
                placeholder={
                  safeContent.answerType === 'number' ? 'Ex: {result}' :
                  safeContent.answerType === 'set' ? 
                    (safeContent.isQuadratic ? 
                      'Ex: {x1}, {x2} ou \\{\\frac{-{b}-\\sqrt{\\Delta}}{2{a}}, \\frac{-{b}+\\sqrt{\\Delta}}{2{a}}\\}' : 
                      'Ex: \\{-2, 3\\}') :
                  safeContent.answerType === 'interval' ? 'Ex: ]-∞, {x1}] ∪ [{x2}, +∞[' :
                  'Ex: x = \\frac{-{b}}{2{a}}'
                }
              />
              {safeContent.isQuadratic && safeContent.requirePositiveDiscriminant && (
                <p className="text-xs text-purple-600 mt-1">
                  💡 Vous pouvez utiliser {`{x1}`} et {`{x2}`} pour les solutions calculées automatiquement
                </p>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default EquationEditor;