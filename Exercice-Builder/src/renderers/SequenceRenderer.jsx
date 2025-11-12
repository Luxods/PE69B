import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const SequenceRenderer = ({ content, generatedValues }) => {
  const evaluatedFormula = evaluateExpression(content.formula, generatedValues);
  const evaluatedU0 = evaluateExpression(content.u0, generatedValues);
  const evaluatedRelation = content.relation ? evaluateExpression(content.relation, generatedValues) : '';
  const evaluatedReason = content.reason ? evaluateExpression(content.reason, generatedValues) : '';

  return (
    <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-purple-900">Type :</span>
          <span className="px-2 py-0.5 bg-purple-200 text-purple-800 rounded text-sm">
            {content.type === 'explicit' && 'Suite explicite'}
            {content.type === 'recursive' && 'Suite récurrente'}
            {content.type === 'arithmetic' && 'Suite arithmétique'}
            {content.type === 'geometric' && 'Suite géométrique'}
          </span>
        </div>

        <p className="font-mono text-lg text-purple-900">
          {evaluatedFormula}
        </p>

        {content.u0 && (
          <p className="text-sm text-purple-700">
            <span className="font-semibold">Premier terme :</span> u₀ = {evaluatedU0}
          </p>
        )}

        {content.relation && content.type === 'recursive' && (
          <p className="text-sm text-purple-700 font-mono">
            {evaluatedRelation}
          </p>
        )}

        {content.reason && (content.type === 'arithmetic' || content.type === 'geometric') && (
          <p className="text-sm text-purple-700">
            <span className="font-semibold">
              {content.type === 'arithmetic' ? 'Raison r' : 'Raison q'}
            </span> = {evaluatedReason}
          </p>
        )}

        {/* Affichage des premiers termes */}
        {content.showTerms && (
          <div className="mt-3 p-2 bg-white rounded border border-purple-300">
            <p className="text-xs font-semibold text-purple-900 mb-1">Premiers termes :</p>
            <div className="flex gap-3 text-sm font-mono">
              {[0, 1, 2, 3, 4].map(n => {
                let value;
                try {
                  if (content.type === 'explicit') {
                    value = eval(evaluatedFormula.replace(/n/g, n));
                  } else if (content.type === 'arithmetic') {
                    value = parseFloat(evaluatedU0) + n * parseFloat(evaluatedReason);
                  } else if (content.type === 'geometric') {
                    value = parseFloat(evaluatedU0) * Math.pow(parseFloat(evaluatedReason), n);
                  }
                  return (
                    <span key={n}>
                      u₍{n}₎ = {value?.toFixed(2)}
                    </span>
                  );
                } catch {
                  return null;
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SequenceRenderer;