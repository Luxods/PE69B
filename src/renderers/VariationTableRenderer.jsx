import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const VariationTableRenderer = ({ content, generatedValues }) => {
  const points = content.points || [];
  
  return (
    <div className="variation-table">
      <table className="w-full border border-gray-400 bg-white">
        <thead>
          <tr>
            <td className="border-r border-b border-gray-400 p-2 bg-blue-50 font-bold text-center w-16">
              x
            </td>
            {/* On alterne : valeur - flèche - valeur - flèche - valeur */}
            {points.map((point, i) => (
              <React.Fragment key={i}>
                {/* Colonne pour la valeur */}
                <td className="border-b border-gray-400 p-2 text-center bg-blue-50 font-semibold min-w-[60px]">
                  {evaluateExpression(point.x, generatedValues)}
                </td>
                {/* Colonne pour la variation (sauf après le dernier point) */}
                {i < points.length - 1 && (
                  <td className="border-b border-gray-400 p-2 text-center bg-blue-50 min-w-[80px]">
                    {/* Espace pour la flèche */}
                  </td>
                )}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r border-gray-400 p-2 bg-blue-50 font-bold text-center">
              f(x)
            </td>
            {points.map((point, i) => (
              <React.Fragment key={i}>
                {/* Colonne pour la valeur de f(x) */}
                <td className="p-3 text-center font-semibold">
                  {point.value && evaluateExpression(point.value, generatedValues)}
                </td>
                {/* Colonne pour la variation (entre ce point et le suivant) */}
                {i < points.length - 1 && (
                  <td className="p-2 text-center">
                    {point.variation === 'croissante' && (
                      <span className="text-green-600 text-3xl">↗</span>
                    )}
                    {point.variation === 'décroissante' && (
                      <span className="text-red-600 text-3xl">↘</span>
                    )}
                    {point.variation === 'constante' && (
                      <span className="text-gray-600 text-2xl">→</span>
                    )}
                  </td>
                )}
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VariationTableRenderer;