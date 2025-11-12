import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const SignTableRenderer = ({ content, generatedValues }) => {
  return (
    <div className="border-2 border-gray-800 rounded overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="border-r-2 border-gray-800 p-2 bg-yellow-50">x</th>
            {content.points.map((pt, i) => (
              <th key={i} className="p-2 bg-yellow-50">
                {evaluateExpression(pt.x, generatedValues)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r-2 border-gray-800 p-2 font-medium bg-yellow-50">signe</td>
            {content.points.map((pt, i) => (
              <td key={i} className="p-3 text-center text-2xl font-bold">
                {pt.sign === '+' && <span className="text-green-600">+</span>}
                {pt.sign === '-' && <span className="text-red-600">−</span>}
                {pt.sign === '0' && <span className="text-gray-600">0</span>}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SignTableRenderer;