import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const ComplexPlaneRenderer = ({ content, generatedValues }) => {
  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 30;

  const evaluatedPoints = content.points.map(pt => ({
    name: pt.name,
    re: parseFloat(evaluateExpression(pt.re, generatedValues)) || 0,
    im: parseFloat(evaluateExpression(pt.im, generatedValues)) || 0
  }));

  return (
    <svg width={width} height={height} className="border-2 border-gray-300 bg-white rounded">
      {/* Grille */}
      {content.showGrid !== false && Array.from({ length: 13 }).map((_, i) => {
        const offset = (i - 6) * scale;
        return (
          <g key={i}>
            <line 
              x1={centerX + offset} y1="0" 
              x2={centerX + offset} y2={height} 
              stroke="#e0e0e0" strokeWidth="1" 
            />
            <line 
              x1="0" y1={centerY + offset} 
              x2={width} y2={centerY + offset} 
              stroke="#e0e0e0" strokeWidth="1" 
            />
          </g>
        );
      })}

      {/* Axes */}
      <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="#666" strokeWidth="2" />
      <line x1={centerX} y1="0" x2={centerX} y2={height} stroke="#666" strokeWidth="2" />
      
      {/* Graduations */}
      {Array.from({ length: 13 }).map((_, i) => {
        const value = i - 6;
        if (value !== 0) {
          return (
            <g key={`grad-${i}`}>
              <text 
                x={centerX + value * scale} 
                y={centerY + 15} 
                fontSize="10" 
                textAnchor="middle"
                fill="#666"
              >
                {value}
              </text>
              <text 
                x={centerX - 15} 
                y={centerY - value * scale + 3} 
                fontSize="10" 
                textAnchor="middle"
                fill="#666"
              >
                {value}i
              </text>
            </g>
          );
        }
        return null;
      })}
      
      {/* Points et vecteurs */}
      {evaluatedPoints.map((pt, i) => {
        const x = centerX + pt.re * scale;
        const y = centerY - pt.im * scale;
        const modulus = Math.sqrt(pt.re * pt.re + pt.im * pt.im);
        const angle = Math.atan2(pt.im, pt.re) * 180 / Math.PI;
        
        return (
          <g key={i}>
            {/* Vecteur depuis l'origine */}
            <line 
              x1={centerX} y1={centerY} 
              x2={x} y2={y} 
              stroke="#3a7bd5" strokeWidth="2" 
              strokeDasharray="5,5" 
            />
            
            {/* Point */}
            <circle cx={x} cy={y} r="5" fill="#3a7bd5" />
            
            {/* Label du point */}
            {content.showLabels !== false && (
              <text 
                x={x + 10} y={y - 10} 
                fontSize="14" fontWeight="bold" 
                fill="#3a7bd5"
              >
                {pt.name}
              </text>
            )}
            
            {/* Module et argument */}
            {content.showModulus && (
              <text 
                x={x + 10} y={y + 20} 
                fontSize="11" fill="#666"
              >
                |{pt.name}| = {modulus.toFixed(2)}
              </text>
            )}
            
            {content.showArgument && (
              <text 
                x={x + 10} y={y + 35} 
                fontSize="11" fill="#666"
              >
                arg({pt.name}) = {angle.toFixed(0)}°
              </text>
            )}
          </g>
        );
      })}
      
      {/* Labels des axes */}
      <text x={width - 30} y={centerY - 10} fontSize="14" fontWeight="bold">Re</text>
      <text x={centerX + 10} y="20" fontSize="14" fontWeight="bold">Im</text>
      
      {/* Origine */}
      <circle cx={centerX} cy={centerY} r="3" fill="#000" />
      <text x={centerX - 10} y={centerY + 15} fontSize="10">O</text>
    </svg>
  );
};

export default ComplexPlaneRenderer;