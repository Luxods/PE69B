import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const VariationTableRenderer = ({ content, generatedValues }) => {
  return (
    <div className="border-2 border-gray-800 rounded overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="border-r-2 border-gray-800 p-2 bg-blue-50 w-20">x</th>
            {content.points.map((pt, i) => (
              <th key={i} className="p-2 bg-blue-50 text-center">
                {evaluateExpression(pt.x, generatedValues)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r-2 border-gray-800 p-2 font-medium bg-blue-50">f(x)</td>
            {content.points.map((pt, i) => (
              <td key={i} className="p-3 text-center relative">
                {pt.value && (
                  <div className="font-bold text-gray-800 mb-2">
                    {evaluateExpression(pt.value, generatedValues)}
                  </div>
                )}
                {pt.variation === 'croissante' && (
                  <div className="text-green-600 text-3xl">↗</div>
                )}
                {pt.variation === 'décroissante' && (
                  <div className="text-red-600 text-3xl">↘</div>
                )}
                {pt.variation === 'constante' && (
                  <div className="text-gray-600 text-2xl">→</div>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VariationTableRenderer;