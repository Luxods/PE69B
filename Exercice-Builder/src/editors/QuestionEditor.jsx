import React from 'react';

const QuestionEditor = ({ content, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium">Question</label>
        <textarea
          className="w-full p-2 border rounded text-sm"
          rows="2"
          value={content.question}
          onChange={(e) => onUpdate({ ...content, question: e.target.value })}
          placeholder="Quelle est la valeur de f(a) ?"
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
            <option value="expression">Expression</option>
            <option value="multiple">Multiple</option>
            <option value="interval">Intervalle</option>
          </select>
        </div>

        {content.answerType === 'numeric' && (
          <div>
            <label className="text-xs font-medium">Tolérance</label>
            <input
              type="number"
              className="w-full p-1 border rounded text-sm"
              value={content.tolerance || 0.01}
              step="0.01"
              onChange={(e) => onUpdate({ ...content, tolerance: parseFloat(e.target.value) })}
            />
          </div>
        )}
      </div>

      <div>
        <label className="text-xs font-medium">Réponse attendue</label>
        <input
          type="text"
          className="w-full p-2 border rounded text-sm font-mono"
          value={content.answer}
          onChange={(e) => onUpdate({ ...content, answer: e.target.value })}
          placeholder="Entrez la réponse correcte"
        />
      </div>

      {content.answerType === 'interval' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium">Borne inférieure</label>
            <input
              type="text"
              className="w-full p-1 border rounded text-sm"
              value={content.lowerBound || ''}
              onChange={(e) => onUpdate({ ...content, lowerBound: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-medium">Borne supérieure</label>
            <input
              type="text"
              className="w-full p-1 border rounded text-sm"
              value={content.upperBound || ''}
              onChange={(e) => onUpdate({ ...content, upperBound: e.target.value })}
            />
          </div>
        </div>
      )}

      <div>
        <label className="text-xs font-medium">Indice (optionnel)</label>
        <input
          type="text"
          className="w-full p-1 border rounded text-sm"
          value={content.hint || ''}
          onChange={(e) => onUpdate({ ...content, hint: e.target.value })}
          placeholder="Pensez à utiliser la formule..."
        />
      </div>

      <div>
        <label className="text-xs font-medium">Points</label>
        <input
          type="number"
          className="w-24 p-1 border rounded text-sm"
          value={content.points || 1}
          min="0"
          step="0.5"
          onChange={(e) => onUpdate({ ...content, points: parseFloat(e.target.value) })}
        />
      </div>
    </div>
  );
};

export default QuestionEditor;