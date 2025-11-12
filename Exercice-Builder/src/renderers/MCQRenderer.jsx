import React, { useState } from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const MCQRenderer = ({ content, generatedValues, element }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const evaluatedQuestion = evaluateExpression(content.question, generatedValues);

  return (
    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
      <p className="font-medium mb-3 flex items-center gap-2">
        <span className="text-xl">☑️</span>
        {evaluatedQuestion}
      </p>
      
      <div className="space-y-2">
        {content.options.map((opt, i) => {
          const evaluatedText = evaluateExpression(opt.text, generatedValues);
          return (
            <label 
              key={i} 
              className={`
                flex items-center gap-3 p-3 rounded cursor-pointer transition
                ${selectedOption === i ? 'bg-indigo-100 border-2 border-indigo-400' : 'bg-white hover:bg-indigo-50 border-2 border-transparent'}
              `}
            >
              <input 
                type="radio" 
                name={`mcq-${element.id}`} 
                checked={selectedOption === i}
                onChange={() => setSelectedOption(i)}
                className="w-4 h-4"
                disabled
              />
              <span className="flex-1">{evaluatedText}</span>
              {opt.correct && (
                <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded">
                  ✓ Correct
                </span>
              )}
            </label>
          );
        })}
      </div>
      
      {selectedOption !== null && (
        <div className={`mt-3 p-2 rounded text-sm ${
          content.options[selectedOption].correct 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {content.options[selectedOption].correct 
            ? '✅ Bonne réponse !' 
            : '❌ Mauvaise réponse, réessayez.'}
        </div>
      )}
    </div>
  );
};

export default MCQRenderer;