import React, { useState } from 'react';
import { MathText } from '../utils/mathRenderer';

const MCQRenderer = ({ content, generatedValues, element }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerToggle = (index) => {
    if (showResult) return; // Bloquer après validation
    
    if (content.multipleAnswers) {
      setSelectedAnswers(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setSelectedAnswers([index]);
    }
  };

  // ✅ Fonction pour extraire le texte d'une option
  const getOptionText = (option) => {
    if (option === null || option === undefined) {
      return '';
    }
    if (typeof option === 'string') {
      return option;
    }
    if (typeof option === 'number') {
      return String(option);
    }
    if (typeof option === 'object') {
      // Gérer les différentes structures possibles
      return option.text ?? option.label ?? option.content ?? option.value ?? '';
    }
    return String(option);
  };

  // ✅ Fonction pour vérifier si une option est correcte
  const isOptionCorrect = (option, index) => {
    if (typeof option === 'object' && option !== null) {
      return option.isCorrect === true || option.correct === true;
    }
    // Si correctAnswers est un tableau d'indices
    if (Array.isArray(content.correctAnswers)) {
      return content.correctAnswers.includes(index);
    }
    // Si correctAnswer est un index unique
    if (content.correctAnswer !== undefined) {
      return content.correctAnswer === index;
    }
    return false;
  };

  const handleValidate = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setShowResult(false);
  };

  // Calculer le résultat
  const getResultStatus = (option, index) => {
    if (!showResult) return null;
    
    const isCorrect = isOptionCorrect(option, index);
    const isSelected = selectedAnswers.includes(index);
    
    if (isSelected && isCorrect) return 'correct';
    if (isSelected && !isCorrect) return 'incorrect';
    if (!isSelected && isCorrect) return 'missed';
    return null;
  };

  const getOptionClassName = (option, index) => {
    const status = getResultStatus(option, index);
    const isSelected = selectedAnswers.includes(index);
    
    const baseClass = 'flex items-center p-3 rounded cursor-pointer transition-colors border';
    
    if (showResult) {
      switch (status) {
        case 'correct':
          return `${baseClass} bg-green-100 border-green-500 ring-2 ring-green-500`;
        case 'incorrect':
          return `${baseClass} bg-red-100 border-red-500`;
        case 'missed':
          return `${baseClass} bg-yellow-100 border-yellow-500 border-dashed`;
        default:
          return `${baseClass} bg-gray-50 border-gray-200`;
      }
    }
    
    return `${baseClass} ${
      isSelected 
        ? 'bg-green-100 border-green-400' 
        : 'bg-white hover:bg-gray-50 border-gray-200'
    }`;
  };

  return (
    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
      {/* Question */}
      <div className="mb-4">
        <MathText 
          content={content.question || ''}
          variables={generatedValues}
          className="font-medium text-gray-800"
        />
      </div>

      {/* Options */}
      <div className="space-y-2">
        {content.options?.map((option, index) => {
          const optionText = getOptionText(option);
          const status = getResultStatus(option, index);
          
          return (
            <label
              key={index}
              className={getOptionClassName(option, index)}
            >
              <input
                type={content.multipleAnswers ? "checkbox" : "radio"}
                name={`mcq-${element?.id || 'default'}`}
                checked={selectedAnswers.includes(index)}
                onChange={() => handleAnswerToggle(index)}
                disabled={showResult}
                className="mr-3 h-4 w-4"
              />
              <span className="flex-1">
                <MathText 
                  content={optionText}
                  variables={generatedValues}
                  className="text-gray-700"
                />
              </span>
              
              {/* Indicateurs de résultat */}
              {showResult && status === 'correct' && (
                <span className="ml-2 text-green-600 font-bold">✓</span>
              )}
              {showResult && status === 'incorrect' && (
                <span className="ml-2 text-red-600 font-bold">✗</span>
              )}
              {showResult && status === 'missed' && (
                <span className="ml-2 text-yellow-600 text-sm">(bonne réponse)</span>
              )}
            </label>
          );
        })}
      </div>

      {/* Boutons d'action */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleValidate}
          disabled={selectedAnswers.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 "
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default MCQRenderer;