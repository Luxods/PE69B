import React, { useState } from 'react';
import { MathText } from '../utils/mathRenderer';

const QuestionRenderer = ({ content, generatedValues }) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
      <div className="flex items-start gap-2">
        <span className="text-xl">❓</span>
        <MathText 
          content={content?.question || ''} 
          variables={generatedValues}
          className="font-medium text-gray-800"
          requireBraces={true}  // Nécessite {}
        />
      </div>
      
      {content?.hint && (
        <div className="mt-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            💡 {showHint ? 'Masquer' : 'Indice'}
          </button>
          
          {showHint && (
            <div className="mt-2 p-3 bg-blue-50 rounded">
              <MathText 
                content={content.hint} 
                variables={generatedValues}
                className="text-sm text-blue-800"
                requireBraces={true}  // Nécessite {}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;