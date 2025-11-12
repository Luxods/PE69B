import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const GraphRenderer = ({ content, generatedValues }) => {
  const { xMin, xMax, yMin, yMax, expression } = content;
  const points = [];
  const steps = 200;
  
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (xMax - xMin) * i / steps;
    try {
      let expr = evaluateExpression(expression, generatedValues);
      expr = expr.replace(/x/g, `(${x})`).replace(/\^/g, '**');
      expr = expr.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos');
      expr = expr.replace(/exp/g, 'Math.exp').replace(/ln/g, 'Math.log');
      const y = eval(expr);
      if (!isNaN(y) && isFinite(y)) {
        points.push({ x, y });
      }
    } catch (e) {
      console.error('Erreur:', e);
    }
  }

  const width = 500;
  const height = 350;
  const padding = 50;
  
  const scaleX = (x) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const scaleY = (y) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  return (
    <svg width={width} height={height} className="border-2 border-gray-300 bg-white rounded">
      {/* Grille */}
      {content.showGrid && Array.from({ length: 11 }).map((_, i) => {
        const x = xMin + (xMax - xMin) * i / 10;
        return (
          <line
            key={`grid-v-${i}`}
            x1={scaleX(x)}
            y1={padding}
            x2={scaleX(x)}
            y2={height - padding}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        );
      })}
      
      {/* Axes */}
      <line x1={padding} y1={scaleY(0)} x2={width - padding} y2={scaleY(0)} 
            stroke="#000" strokeWidth="2" />
      <line x1={scaleX(0)} y1={padding} x2={scaleX(0)} y2={height - padding} 
            stroke="#000" strokeWidth="2" />
      
      {/* Courbe */}
      <polyline
        points={points.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')}
        fill="none"
        stroke="#3a7bd5"
        strokeWidth="3"
      />
      
      {/* Labels */}
      <text x={width - padding + 15} y={scaleY(0) + 5} fontSize="14" fontWeight="bold">x</text>
      <text x={scaleX(0) + 5} y={padding - 15} fontSize="14" fontWeight="bold">y</text>
      
      {/* Graduations */}
      <text x={scaleX(xMin)} y={height - 20} fontSize="12">{xMin}</text>
      <text x={scaleX(xMax) - 20} y={height - 20} fontSize="12">{xMax}</text>
    </svg>
  );
};

export default GraphRenderer;