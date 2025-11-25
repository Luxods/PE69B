import React, { useState } from 'react';
import { MathText } from '../utils/mathRenderer';
import { Check, X, Eye, EyeOff } from 'lucide-react';

const EquationRenderer = ({ content, generatedValues, isInteractive = true }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showSolutionOverride, setShowSolutionOverride] = useState(false);

  const getEquationContent = () => {
    if (content.type === 'system' && content.system) {
      return content.system;
    }
    return content.latex || content.equation || '';
  };

  const formatForLatex = (text) => {
    if (text && !text.includes('$')) {
      return `$$${text}$$`;
    }
    return text;
  };

  // Remplacer les variables dans la réponse correcte
  const getCorrectAnswer = () => {
    if (!content.correctAnswer) return '';
    let answer = content.correctAnswer;
    Object.entries(generatedValues || {}).forEach(([key, value]) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      answer = answer.replace(regex, value);
    });
    return answer;
  };

  // Vérifier la réponse (simplifié - peut être amélioré)
  const checkAnswer = () => {
    const correct = getCorrectAnswer().toLowerCase().replace(/\s/g, '');
    const user = userAnswer.toLowerCase().replace(/\s/g, '');
    return correct === user;
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const equationContent = getEquationContent();

  return (
    <div className="space-y-4">
      {/* Équation principale */}
      <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
        {equationContent ? (
          <div className="text-center">
            <MathText 
              content={formatForLatex(equationContent)}
              variables={generatedValues}
              className="text-xl text-gray-800"
              requireBraces={false}
            />
          </div>
        ) : (
          <div className="text-center text-gray-400 py-4">
            <p>Aucune équation définie</p>
          </div>
        )}
      </div>

      {/* Champ de réponse */}
      {content.requireAnswer && isInteractive && (
        <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Votre réponse :
              </label>
              {content.answerHint && (
                <p className="text-xs text-gray-500 mb-2">{content.answerHint}</p>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  className={`flex-1 p-2 border-2 rounded font-mono ${
                    showResult 
                      ? checkAnswer() 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-red-400 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    setShowResult(false);
                  }}
                  placeholder={
                    content.answerType === 'number' ? 'Entrez un nombre' :
                    content.answerType === 'set' ? 'Ex: {-2, 3}' :
                    content.answerType === 'interval' ? 'Ex: [-1, 5[' :
                    content.answerType === 'vector' ? 'Ex: (2, -3)' :
                    'Ex: x = 2'
                  }
                  disabled={showResult && checkAnswer()}
                />
                {!showResult && (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={!userAnswer.trim()}
                  >
                    Vérifier
                  </button>
                )}
              </div>
            </div>

            {/* Résultat de la vérification */}
            {showResult && (
              <div className={`flex items-center gap-2 p-2 rounded ${
                checkAnswer() 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {checkAnswer() ? (
                  <>
                    <Check size={20} />
                    <span className="font-medium">Correct !</span>
                  </>
                ) : (
                  <>
                    <X size={20} />
                    <span className="font-medium">Incorrect</span>
                    {content.correctAnswer && (
                      <button
                        onClick={() => setUserAnswer(getCorrectAnswer())}
                        className="ml-auto text-sm underline hover:no-underline"
                      >
                        Voir la réponse
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Solution */}
      {(content.showSolution || (showResult && !checkAnswer())) && content.solution && (
        <div className="relative">
          {!content.showSolution && (
            <button
              onClick={() => setShowSolutionOverride(!showSolutionOverride)}
              className="absolute top-2 right-2 p-1 text-green-700 hover:bg-green-100 rounded"
            >
              {showSolutionOverride ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          <div className={`p-3 bg-green-50 rounded border border-green-200 ${
            !content.showSolution && !showSolutionOverride ? 'filter blur-sm' : ''
          }`}>
            <p className="text-sm font-semibold text-green-900 mb-1">Solution détaillée :</p>
            <MathText 
              content={content.solution.includes('$') ? content.solution : `$${content.solution}$`}
              variables={generatedValues}
              className="text-green-800"
              requireBraces={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EquationRenderer;