import React from 'react';
import { MathText } from '../utils/mathRenderer';

const EquationRenderer = ({ content, generatedValues }) => {
  const getEquationContent = () => {
    if (content.type === 'system' && content.system) {
      return content.system;
    }
    return content.latex || content.equation || '';
  };

  const equationContent = getEquationContent();
  const formatForLatex = (text) => {
    if (text && !text.includes('$')) {
      return `$$${text}$$`;
    }
    return text;
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
      {equationContent ? (
        <div className="text-center">
          <MathText 
            content={formatForLatex(equationContent)}
            variables={generatedValues}
            className="text-xl text-gray-800"
            requireBraces={false}  // PAS besoin de {}
          />
        </div>
      ) : (
        <div className="text-center text-gray-400 py-4">
          <p>Aucune équation définie</p>
        </div>
      )}

      {content.showSolution && content.solution && (
        <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
          <p className="text-sm font-semibold text-green-900 mb-1">Solution :</p>
          <MathText 
            content={content.solution.includes('$') ? content.solution : `$${content.solution}$`}
            variables={generatedValues}
            className="text-green-800"
            requireBraces={false}  // PAS besoin de {}
          />
        </div>
      )}
    </div>
  );
};

export default EquationRenderer;