import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const FunctionRenderer = ({ content, generatedValues }) => {
  const evaluatedExpression = evaluateExpression(content.expression, generatedValues);
  
  return (
    <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
      <p className="font-mono text-xl text-blue-900">
        f(x) = {evaluatedExpression}
      </p>
      {content.domain && (
        <p className="text-sm text-blue-700 mt-2">
          <span className="font-semibold">Domaine de définition :</span> {content.domain}
        </p>
      )}
    </div>
  );
};

export default FunctionRenderer;