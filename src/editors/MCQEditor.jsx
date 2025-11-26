import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const MCQEditor = ({ content, onUpdate }) => {
  const updateOption = (index, field, value) => {
    const newOpts = [...content.options];
    newOpts[index][field] = value;
    onUpdate({ ...content, options: newOpts });
  };

  const addOption = () => {
    const newOptions = [...content.options, { text: '', correct: false }];
    onUpdate({ ...content, options: newOptions });
  };

  const removeOption = (index) => {
    if (content.options.length <= 2) return;
    const newOptions = content.options.filter((_, i) => i !== index);
    onUpdate({ ...content, options: newOptions });
  };

  const hasCorrectAnswer = content.options.some(opt => opt.correct);

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium">Question QCM</label>
        <textarea
          className="w-full p-2 border rounded text-sm"
          rows="2"
          value={content.question}
          onChange={(e) => onUpdate({ ...content, question: e.target.value })}
          placeholder="Question du QCM. Utilisez {a}, {b} pour les variables"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={content.multipleAnswers || false}
            onChange={(e) => onUpdate({ ...content, multipleAnswers: e.target.checked })}
          />
          Plusieurs réponses possibles
        </label>
        
        <div>
          <label className="text-xs font-medium mr-2">Points :</label>
          <input
            type="number"
            className="w-16 p-1 border rounded text-sm"
            value={content.points || 1}
            min="0.5"
            step="0.5"
            onChange={(e) => onUpdate({ ...content, points: parseFloat(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-medium">Options de réponse</label>
          <button
            onClick={addOption}
            className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
          >
            <Plus size={14} />
            Option
          </button>
        </div>

        {!hasCorrectAnswer && (
          <div className="mb-2 p-2 bg-yellow-50 border border-yellow-300 rounded text-xs text-yellow-800">
            ⚠️ Aucune réponse correcte sélectionnée !
          </div>
        )}

        <div className="space-y-2">
          {content.options.map((opt, i) => (
            <div key={i} className={`flex gap-2 items-center p-2 rounded ${
              opt.correct ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50 border border-gray-200'
            }`}>
              <input
                type={content.multipleAnswers ? "checkbox" : "radio"}
                name="correct-answer"
                checked={opt.correct}
                onChange={(e) => {
                  if (!content.multipleAnswers) {
                    // Radio : une seule bonne réponse
                    content.options.forEach((_, idx) => {
                      updateOption(idx, 'correct', idx === i);
                    });
                  } else {
                    // Checkbox : plusieurs bonnes réponses possibles
                    updateOption(i, 'correct', e.target.checked);
                  }
                }}
              />
              <input
                className="flex-1 p-1 border rounded text-sm"
                value={opt.text}
                onChange={(e) => updateOption(i, 'text', e.target.value)}
                placeholder={`Option ${i + 1} (utilisez {a}, {b} pour les variables)`}
              />
              {opt.correct && (
                <span className="text-green-600 text-sm font-bold">✓</span>
              )}
              {content.options.length > 2 && (
                <button
                  onClick={() => removeOption(i)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

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

      {/* Explication */}
      <div>
        <label className="text-xs font-medium">📝 Explication (après correction)</label>
        <textarea
          className="w-full p-2 border rounded text-sm"
          rows="2"
          value={content.explanation || ''}
          onChange={(e) => onUpdate({ ...content, explanation: e.target.value })}
          placeholder="Explication de la bonne réponse..."
        />
      </div>
    </div>

  );
};

export default MCQEditor;