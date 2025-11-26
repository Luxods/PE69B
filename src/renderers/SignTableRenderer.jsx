import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const SignTableRenderer = ({ content, generatedValues }) => {
  const points = content.points || [];
  
  return (
    <div className="sign-table">
      <table className="w-full border border-gray-400 bg-white">
        <thead>
          <tr>
            <td className="border-r border-b border-gray-400 p-2 bg-yellow-50 font-bold text-center w-16">
              x
            </td>
            {/* On alterne : valeur - signe - valeur - signe - valeur */}
            {points.map((point, i) => (
              <React.Fragment key={i}>
                {/* Colonne pour la valeur */}
                <td className="border-b border-gray-400 p-2 text-center bg-yellow-50 font-semibold min-w-[60px]">
                  {evaluateExpression(point.x, generatedValues)}
                </td>
                {/* Colonne pour le signe (sauf après le dernier point) */}
                {i < points.length - 1 && (
                  <td className="border-b border-gray-400 p-2 text-center bg-yellow-50 min-w-[80px]">
                    {/* Espace pour le signe */}
                  </td>
                )}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r border-gray-400 p-2 bg-yellow-50 font-bold text-center">
              f(x)
            </td>
            {points.map((point, i) => (
              <React.Fragment key={i}>
                {/* Valeur en ce point (généralement 0 ou || pour valeur interdite) */}
                <td className="p-3 text-center">
                  {point.isZero && (
                    <span className="text-gray-600 text-xl font-bold">0</span>
                  )}
                  {point.isForbidden && (
                    <span className="text-gray-400 text-xl">||</span>
                  )}
                </td>
                {/* Signe dans l'intervalle suivant */}
                {i < points.length - 1 && (
                  <td className="p-3 text-center">
                    {point.sign === '+' && (
                      <span className="text-green-600 text-2xl font-bold">+</span>
                    )}
                    {point.sign === '-' && (
                      <span className="text-red-600 text-2xl font-bold">−</span>
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

export default SignTableRenderer;