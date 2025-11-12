import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const StatsTableRenderer = ({ content, generatedValues }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-2 border-gray-800">
        <thead>
          <tr className="bg-gray-100">
            {content.headers.map((h, i) => (
              <th key={i} className="border border-gray-800 p-2 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, j) => (
                <td key={j} className="border border-gray-800 p-2 text-center">
                  {evaluateExpression(cell, generatedValues)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Calculs statistiques optionnels */}
      {content.showCalculations && (
        <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">Calculs :</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Total effectif : À calculer</div>
            <div>Moyenne : À calculer</div>
            <div>Médiane : À calculer</div>
            <div>Écart-type : À calculer</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsTableRenderer;