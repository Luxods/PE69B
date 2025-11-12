import React, { useState } from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const QuestionRenderer = ({ content, generatedValues }) => {
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const evaluatedQuestion = evaluateExpression(content.question, generatedValues);
  const evaluatedHint = content.hint ? evaluateExpression(content.hint, generatedValues) : '';
  const evaluatedAnswer = content.answer ? evaluateExpression(content.answer, generatedValues) : '';

  return (
    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="font-medium text-gray-800 flex items-center gap-2">
            <span className="text-xl">❓</span>
            {evaluatedQuestion}
          </p>
          {content.points && (
            <span className="text-xs text-gray-600 mt-1">
              ({content.points} point{content.points > 1 ? 's' : ''})
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {content.answerType === 'interval' ? (
          <div className="flex items-center gap-2">
            <span className="text-sm">[</span>
            <input
              type="text"
              className="w-24 p-2 border-2 border-gray-300 rounded"
              placeholder="min"
              disabled
            />
            <span className="text-sm">;</span>
            <input
              type="text"
              className="w-24 p-2 border-2 border-gray-300 rounded"
              placeholder="max"
              disabled
            />
            <span className="text-sm">]</span>
          </div>
        ) : content.answerType === 'multiple' ? (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border-2 border-gray-300 rounded"
              placeholder="Réponse 1..."
              disabled
            />
            <input
              type="text"
              className="w-full p-2 border-2 border-gray-300 rounded"
              placeholder="Réponse 2..."
              disabled
            />
          </div>
        ) : (
          <input
            type={content.answerType === 'numeric' ? 'number' : 'text'}
            className="w-full p-2 border-2 border-gray-300 rounded focus:border-yellow-500 outline-none"
            placeholder={
              content.answerType === 'numeric' ? 'Entrez un nombre...' :
              content.answerType === 'expression' ? 'Entrez une expression...' :
              'Votre réponse...'
            }
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled
          />
        )}

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Type : {
              content.answerType === 'numeric' ? 'Numérique' :
              content.answerType === 'text' ? 'Texte' :
              content.answerType === 'expression' ? 'Expression' :
              content.answerType === 'interval' ? 'Intervalle' :
              'Multiple'
            }
            {content.answerType === 'numeric' && content.tolerance && (
              <span className="ml-2">(±{content.tolerance})</span>
            )}
          </span>

          {evaluatedHint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              💡 Indice
            </button>
          )}
        </div>

        {showHint && evaluatedHint && (
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Indice :</strong> {evaluatedHint}
            </p>
          </div>
        )}

        {/* Affichage de la réponse en mode preview pour les tests */}
        <div className="p-2 bg-gray-100 rounded text-xs text-gray-600">
          <strong>Réponse attendue :</strong> {evaluatedAnswer}
        </div>
      </div>
    </div>
  );
};

export default QuestionRenderer;