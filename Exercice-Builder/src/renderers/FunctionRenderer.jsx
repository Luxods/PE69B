import React from 'react';
import { MathText } from '../utils/mathRenderer';

const FunctionRenderer = ({ content, generatedValues }) => {
  // Construire la fonction avec LaTeX
  const functionText = content.name 
    ? `$${content.name}(${content.variable || 'x'}) = ${content.expression}$`
    : `$f(x) = ${content.expression}$`;

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2">
        <span className="text-xl">📈</span>
        <MathText 
          content={functionText} 
          variables={generatedValues}
          className="text-blue-900 font-medium text-lg"
        />
      </div>
      
      {content.domain && (
        <div className="mt-2 ml-7">
          <MathText 
            content={`Domaine: $${content.domain}$`}
            variables={generatedValues}
            className="text-sm text-blue-700"
          />
        </div>
      )}
    </div>
  );
};

export default FunctionRenderer;