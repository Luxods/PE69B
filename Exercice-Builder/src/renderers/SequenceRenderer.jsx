import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';


const SequenceRenderer = ({ content, generatedValues }) => {
  // Fonction pour formater avec indices HTML
  const formatMathExpression = (text) => {
    if (!text) return '';
    return text
      .replace(/U_\(n\+1\)/g, 'U<sub>n+1</sub>')
      .replace(/U_\(n-1\)/g, 'U<sub>n-1</sub>')
      .replace(/U_n\+1/g, 'U<sub>n+1</sub>')
      .replace(/U_n-1/g, 'U<sub>n-1</sub>')
      .replace(/U_n/g, 'U<sub>n</sub>')
      .replace(/U_(\d+)/g, 'U<sub>$1</sub>')
      .replace(/\^n/g, '<sup>n</sup>')
      .replace(/\^(\d+)/g, '<sup>$1</sup>');
  };

  // Calculer les premiers termes
  const calculateTerms = () => {
    const terms = [];
    const u0 = parseFloat(evaluateExpression(content.u0, generatedValues)) || 0;
    const numTerms = content.termsCount || 5;

    switch(content.type) {
      case 'explicit':
        if (!content.formula) return [];
        for (let n = 0; n < numTerms; n++) {
          try {
            let formula = evaluateExpression(content.formula, generatedValues);
            // Remplacer n par la valeur
            formula = formula.replace(/\bn\b/g, n);
            const value = eval(formula.replace(/\^/g, '**'));
            terms.push({ n, value: isNaN(value) ? '?' : value.toFixed(2) });
          } catch {
            terms.push({ n, value: '?' });
          }
        }
        break;

      case 'recursive':
        if (!content.relation) return [];
        terms.push({ n: 0, value: u0.toFixed(2) });
        let current = u0;
        for (let n = 1; n < numTerms; n++) {
          try {
            let relation = evaluateExpression(content.relation, generatedValues);
            // Remplacer U_n par la valeur courante
            relation = relation.replace(/U_n/g, current);
            const value = eval(relation.replace(/\^/g, '**'));
            current = value;
            terms.push({ n, value: isNaN(value) ? '?' : value.toFixed(2) });
          } catch {
            terms.push({ n, value: '?' });
          }
        }
        break;

      case 'arithmetic':
        const r = parseFloat(evaluateExpression(content.reason, generatedValues)) || 0;
        for (let n = 0; n < numTerms; n++) {
          const value = u0 + n * r;
          terms.push({ n, value: value.toFixed(2) });
        }
        break;

      case 'geometric':
        const q = parseFloat(evaluateExpression(content.reason, generatedValues)) || 1;
        for (let n = 0; n < numTerms; n++) {
          const value = u0 * Math.pow(q, n);
          terms.push({ n, value: value.toFixed(2) });
        }
        break;

      default:
        break;
    }

    return terms;
  };

  const evaluatedU0 = evaluateExpression(content.u0, generatedValues);
  const evaluatedFormula = content.formula ? evaluateExpression(content.formula, generatedValues) : '';
  const evaluatedRelation = content.relation ? evaluateExpression(content.relation, generatedValues) : '';
  const evaluatedReason = content.reason ? evaluateExpression(content.reason, generatedValues) : '';

  return (
    <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
      <div className="space-y-3">
        {/* Type de suite */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-purple-900">Type :</span>
          <span className="px-2 py-0.5 bg-purple-200 text-purple-800 rounded text-sm">
            {content.type === 'explicit' && 'Suite explicite'}
            {content.type === 'recursive' && 'Suite récurrente'}
            {content.type === 'arithmetic' && 'Suite arithmétique'}
            {content.type === 'geometric' && 'Suite géométrique'}
          </span>
        </div>

        {/* Formule ou relation selon le type */}
        {content.type === 'explicit' && evaluatedFormula && (
          <div className="p-2 bg-white rounded border border-purple-300">
            <p className="text-xs font-semibold text-purple-700 mb-1">Formule :</p>
            <p 
              className="font-mono text-lg text-purple-900"
              dangerouslySetInnerHTML={{ __html: formatMathExpression(evaluatedFormula) }}
            />
          </div>
        )}

        {content.type === 'recursive' && evaluatedRelation && (
          <div className="p-2 bg-white rounded border border-purple-300">
            <p className="text-xs font-semibold text-purple-700 mb-1">Relation de récurrence :</p>
            <p 
              className="font-mono text-lg text-purple-900"
              dangerouslySetInnerHTML={{ __html: formatMathExpression(evaluatedRelation) }}
            />
          </div>
        )}

        {content.type === 'arithmetic' && evaluatedReason && (
          <div className="p-2 bg-white rounded border border-purple-300">
            <p className="text-xs font-semibold text-purple-700 mb-1">Suite arithmétique :</p>
            <p className="font-mono text-purple-900">
              U<sub>n</sub> = U<sub>0</sub> + n × r
            </p>
            <p className="text-sm text-purple-700 mt-1">
              avec r = {evaluatedReason}
            </p>
          </div>
        )}

        {content.type === 'geometric' && evaluatedReason && (
          <div className="p-2 bg-white rounded border border-purple-300">
            <p className="text-xs font-semibold text-purple-700 mb-1">Suite géométrique :</p>
            <p className="font-mono text-purple-900">
              U<sub>n</sub> = U<sub>0</sub> × q<sup>n</sup>
            </p>
            <p className="text-sm text-purple-700 mt-1">
              avec q = {evaluatedReason}
            </p>
          </div>
        )}

        {/* Premier terme */}
        {evaluatedU0 && (
          <div>
            <span className="text-sm font-semibold text-purple-900">Premier terme : </span>
            <span className="font-mono">U<sub>0</sub> = {evaluatedU0}</span>
          </div>
        )}

        {/* Affichage des premiers termes calculés */}
        {content.showTerms && (
          <div className="p-3 bg-white rounded border border-purple-300">
            <p className="text-xs font-semibold text-purple-900 mb-2">Premiers termes :</p>
            <div className="flex flex-wrap gap-3">
              {calculateTerms().map(({ n, value }) => (
                <div key={n} className="px-2 py-1 bg-purple-100 rounded">
                  <span className="font-mono text-sm">
                    U<sub>{n}</sub> = {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SequenceRenderer;