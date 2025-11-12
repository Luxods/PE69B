import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const EquationRenderer = ({ content, generatedValues }) => {
  const evaluatedLatex = evaluateExpression(content.latex, generatedValues);
  const evaluatedSystem = content.system ? evaluateExpression(content.system, generatedValues) : '';

  return (
    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
      {content.type === 'system' && evaluatedSystem ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-700 mb-2">Système d'équations :</p>
          <div className="pl-4 border-l-4 border-gray-400">
            {evaluatedSystem.split('\n').map((eq, i) => (
              <p key={i} className="font-mono text-lg text-gray-800">
                {eq}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-mono text-xl text-gray-800">
            {evaluatedLatex}
          </p>
        </div>
      )}

      {content.showSteps && (
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">Étapes de résolution :</p>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>Identifier le type d'équation</li>
            <li>Appliquer la méthode appropriée</li>
            <li>Simplifier et isoler l'inconnue</li>
            <li>Vérifier la solution</li>
          </ol>
        </div>
      )}

      {content.showSolution && (
        <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
          <p className="text-sm font-semibold text-green-900">
            Solution : {content.solution ? evaluateExpression(content.solution, generatedValues) : 'À déterminer'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EquationRenderer;