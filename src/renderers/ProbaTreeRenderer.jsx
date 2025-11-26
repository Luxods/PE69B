import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const ProbaTreeRenderer = ({ content, generatedValues }) => {
  const evaluateProba = (proba) => evaluateExpression(proba, generatedValues);

  return (
    <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
      <svg width="600" height="350" className="bg-white rounded border border-gray-300">
        {/* Niveau 1 */}
        <line x1="50" y1="175" x2="150" y2="100" stroke="#3a7bd5" strokeWidth="2" />
        <line x1="50" y1="175" x2="150" y2="250" stroke="#3a7bd5" strokeWidth="2" />
        
        <circle cx="50" cy="175" r="5" fill="#3a7bd5" />
        <text x="35" y="180" fontSize="12" fontWeight="bold">Ω</text>
        
        {content.levels[0].branches.map((branch, i) => {
          const y = i === 0 ? 100 : 250;
          return (
            <g key={i}>
              <circle cx="150" cy={y} r="4" fill="#3a7bd5" />
              <text x="160" y={y + 5} fontSize="14" fontWeight="bold">
                {branch.label}
              </text>
              <text x="90" y={y - 10 + (i === 0 ? -10 : 20)} fontSize="12" fill="#666">
                {evaluateProba(branch.proba)}
              </text>
            </g>
          );
        })}

        {/* Niveau 2 */}
        {content.levels[1] && (
          <>
            {/* Branches depuis le premier noeud */}
            <line x1="150" y1="100" x2="280" y2="50" stroke="#3a7bd5" strokeWidth="2" />
            <line x1="150" y1="100" x2="280" y2="150" stroke="#3a7bd5" strokeWidth="2" />
            
            {/* Branches depuis le deuxième noeud */}
            <line x1="150" y1="250" x2="280" y2="200" stroke="#3a7bd5" strokeWidth="2" />
            <line x1="150" y1="250" x2="280" y2="300" stroke="#3a7bd5" strokeWidth="2" />

            {/* Labels et probabilités niveau 2 */}
            {content.levels[1].branches.map((branch, i) => {
              const positions = [
                { x: 280, y: 50 },   // A → B
                { x: 280, y: 150 },  // A → B̄
                { x: 280, y: 200 },  // Ā → B
                { x: 280, y: 300 }   // Ā → B̄
              ];
              const pos = positions[i];
              const probPos = [
                { x: 215, y: 40 },
                { x: 215, y: 125 },
                { x: 215, y: 225 },
                { x: 215, y: 290 }
              ];
              const pPos = probPos[i];
              
              return (
                <g key={i}>
                  <circle cx={pos.x} cy={pos.y} r="4" fill="#3a7bd5" />
                  <text x={pos.x + 10} y={pos.y + 5} fontSize="14" fontWeight="bold">
                    {branch.label}
                  </text>
                  <text x={pPos.x} y={pPos.y} fontSize="11" fill="#666">
                    {evaluateProba(branch.proba)}
                  </text>
                </g>
              );
            })}

            {/* Probabilités totales */}
            {content.showTotal && (
              <g>
                <text x={400} y={30} fontSize="12" fontWeight="bold" fill="#000">
                  Probabilités finales :
                </text>
                {content.levels[1].branches.map((branch, i) => {
                  const y = 50 + i * 25;
                  const parentProba = i < 2 ? 
                    content.levels[0].branches[0].proba : 
                    content.levels[0].branches[1].proba;
                  const total = (
                    parseFloat(evaluateProba(parentProba)) * 
                    parseFloat(evaluateProba(branch.proba))
                  ).toFixed(3);
                  
                  return (
                    <text key={i} x={410} y={y} fontSize="11" fill="#333">
                      P({content.levels[0].branches[Math.floor(i/2)].label} ∩ {branch.label}) = {total}
                    </text>
                  );
                })}
              </g>
            )}
          </>
        )}
      </svg>

      {/* Légende */}
      <div className="mt-3 p-2 bg-white rounded border border-green-300">
        <p className="text-xs text-gray-700">
          <strong>Lecture :</strong> Suivez les branches pour calculer les probabilités composées.
          Multipliez les probabilités le long d'un chemin.
        </p>
      </div>
    </div>
  );
};

export default ProbaTreeRenderer;