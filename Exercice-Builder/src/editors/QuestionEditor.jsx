import React from 'react';

const QuestionEditor = ({ content, onUpdate }) => {
  // Fonction pour formater l'aperçu
  const formatPreview = (text) => {
    if (!text) return '';
    return text.replace(/\{(\w+)\}/g, '<span class="text-purple-600 font-bold">{$1}</span>');
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium">Question</label>
        <textarea
          className="w-full p-2 border rounded text-sm"
          rows="2"
          value={content.question}
          onChange={(e) => onUpdate({ ...content, question: e.target.value })}
          placeholder="Quelle est la valeur de f(a) ? Utilisez {a}, {b} pour les variables"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium">Type de réponse</label>
          <select
            className="w-full p-1 border rounded text-sm"
            value={content.answerType}
            onChange={(e) => onUpdate({ ...content, answerType: e.target.value })}
          >
            <option value="numeric">Numérique</option>
            <option value="text">Texte</option>
            <option value="expression">Expression mathématique</option>
            <option value="multiple">Réponses multiples</option>
            <option value="interval">Intervalle</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium">Points</label>
          <input
            type="number"
            className="w-full p-1 border rounded text-sm"
            value={content.points || 1}
            min="0.5"
            step="0.5"
            onChange={(e) => onUpdate({ ...content, points: parseFloat(e.target.value) })}
          />
        </div>
      </div>

      {/* RÉPONSE ATTENDUE - IMPORTANT */}
      {content.answerType === 'numeric' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium text-green-700">✅ Réponse correcte</label>
            <input
              type="text"
              className="w-full p-2 border-2 border-green-200 rounded text-sm font-mono bg-green-50"
              value={content.answer || ''}
              onChange={(e) => onUpdate({ ...content, answer: e.target.value })}
              placeholder="Ex: 2*a+b ou 42"
            />
          </div>
          <div>
            <label className="text-xs font-medium">Tolérance (±)</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-sm"
              value={content.tolerance || 0.01}
              step="0.01"
              min="0"
              onChange={(e) => onUpdate({ ...content, tolerance: parseFloat(e.target.value) })}
            />
          </div>
        </div>
      )}

      {content.answerType === 'interval' && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-green-700">✅ Intervalle correct</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="text"
                className="w-full p-2 border-2 border-green-200 rounded text-sm bg-green-50"
                value={content.lowerBound || ''}
                onChange={(e) => onUpdate({ ...content, lowerBound: e.target.value })}
                placeholder="Borne min (ex: -a)"
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-2 border-2 border-green-200 rounded text-sm bg-green-50"
                value={content.upperBound || ''}
                onChange={(e) => onUpdate({ ...content, upperBound: e.target.value })}
                placeholder="Borne max (ex: a+2)"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium">Tolérance</label>
            <input
              type="number"
              className="w-24 p-1 border rounded text-sm"
              value={content.tolerance || 0.01}
              step="0.01"
              min="0"
              onChange={(e) => onUpdate({ ...content, tolerance: parseFloat(e.target.value) })}
            />
          </div>
        </div>
      )}

      {(content.answerType === 'text' || content.answerType === 'expression') && (
        <div>
          <label className="text-xs font-medium text-green-700">✅ Réponse correcte</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-green-200 rounded text-sm font-mono bg-green-50"
            value={content.answer || ''}
            onChange={(e) => onUpdate({ ...content, answer: e.target.value })}
            placeholder={content.answerType === 'expression' ? "Ex: 2*x+3" : "Texte attendu"}
          />
        </div>
      )}

      {content.answerType === 'multiple' && (
        <div>
          <label className="text-xs font-medium text-green-700">✅ Réponses correctes (séparées par des virgules)</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-green-200 rounded text-sm bg-green-50"
            value={content.answer || ''}
            onChange={(e) => onUpdate({ ...content, answer: e.target.value })}
            placeholder="Ex: a, 2*a, a+b"
          />
        </div>
      )}

      {/* Indice optionnel */}
      <div>
        <label className="text-xs font-medium">💡 Indice (optionnel)</label>
        <input
          type="text"
          className="w-full p-1 border rounded text-sm"
          value={content.hint || ''}
          onChange={(e) => onUpdate({ ...content, hint: e.target.value })}
          placeholder="Pensez à utiliser la formule..."
        />
      </div>

      {/* Explication de la solution */}
      <div>
        <label className="text-xs font-medium">📝 Explication (affichée après correction)</label>
        <textarea
          className="w-full p-2 border rounded text-sm"
          rows="2"
          value={content.explanation || ''}
          onChange={(e) => onUpdate({ ...content, explanation: e.target.value })}
          placeholder="Explication détaillée de la solution..."
        />
      </div>

      {/* Aperçu de la réponse avec variables */}
      {content.answer && (
        <div className="p-2 bg-blue-50 rounded text-xs">
          <p className="text-blue-800 font-semibold mb-1">📋 Aperçu :</p>
          <p>Question : <span dangerouslySetInnerHTML={{ __html: formatPreview(content.question) }} /></p>
          <p className="text-green-700">Réponse : <span className="font-mono">{content.answer}</span></p>
          {content.hint && <p className="text-gray-600">Indice : {content.hint}</p>}
        </div>
      )}
    </div>
  );
};

export default QuestionEditor;