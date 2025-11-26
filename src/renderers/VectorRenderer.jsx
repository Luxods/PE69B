import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const VectorRenderer = ({ content, generatedValues }) => {
  const is3D = content.dimension === '3D';
  
  const evaluatedVectors = content.vectors.map(v => ({
    name: v.name,
    x: parseFloat(evaluateExpression(v.x, generatedValues)) || 0,
    y: parseFloat(evaluateExpression(v.y, generatedValues)) || 0,
    z: is3D ? (parseFloat(evaluateExpression(v.z, generatedValues)) || 0) : 0
  }));

  const calculateNorm = (v) => {
    return Math.sqrt(v.x * v.x + v.y * v.y + (is3D ? v.z * v.z : 0));
  };

  if (is3D) {
    // Rendu 3D simplifié (projection isométrique)
    const width = 400;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30;
    
    // Angles pour la projection isométrique
    const angleX = Math.PI / 6;
    const angleY = Math.PI / 6;
    
    const project3D = (x, y, z) => ({
      x: centerX + scale * (x - z * Math.cos(angleX)),
      y: centerY - scale * (y - z * Math.sin(angleY))
    });

    return (
      <svg width={width} height={height} className="border-2 border-gray-300 bg-white rounded">
        {/* Axes 3D */}
        <line 
          x1={centerX} y1={centerY} 
          x2={centerX + 100} y2={centerY} 
          stroke="#666" strokeWidth="2" 
        />
        <text x={centerX + 105} y={centerY + 5} fontSize="12">x</text>
        
        <line 
          x1={centerX} y1={centerY} 
          x2={centerX} y2={centerY - 100} 
          stroke="#666" strokeWidth="2" 
        />
        <text x={centerX + 5} y={centerY - 105} fontSize="12">y</text>
        
        <line 
          x1={centerX} y1={centerY} 
          x2={project3D(0, 0, 3.5).x} y2={project3D(0, 0, 3.5).y} 
          stroke="#666" strokeWidth="2" 
        />
        <text x={project3D(0, 0, 3.5).x - 10} y={project3D(0, 0, 3.5).y} fontSize="12">z</text>
        
        {/* Vecteurs */}
        {evaluatedVectors.map((v, i) => {
          const end = project3D(v.x, v.y, v.z);
          const norm = calculateNorm(v);
          
          return (
            <g key={i}>
              <line 
                x1={centerX} y1={centerY} 
                x2={end.x} y2={end.y} 
                stroke="#3a7bd5" strokeWidth="3" 
                markerEnd="url(#arrowhead)" 
              />
              <text x={end.x + 10} y={end.y} fontSize="14" fontWeight="bold" fill="#3a7bd5">
                {v.name}
              </text>
              {content.showCoordinates && (
                <text x={end.x + 10} y={end.y + 15} fontSize="11" fill="#666">
                  ({v.x.toFixed(1)}, {v.y.toFixed(1)}, {v.z.toFixed(1)})
                </text>
              )}
              {content.showNorm && (
                <text x={end.x + 10} y={end.y + 30} fontSize="11" fill="#666">
                  ‖{v.name}‖ = {norm.toFixed(2)}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Définir la pointe de flèche */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3a7bd5" />
          </marker>
        </defs>
      </svg>
    );
  } else {
    // Rendu 2D
    const width = 400;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 40;

    return (
      <svg width={width} height={height} className="border-2 border-gray-300 bg-white rounded">
        {/* Grille */}
        {Array.from({ length: 9 }).map((_, i) => {
          const offset = (i - 4) * scale;
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
        <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="#000" strokeWidth="2" />
        <line x1={centerX} y1="0" x2={centerX} y2={height} stroke="#000" strokeWidth="2" />
        
        {/* Vecteurs */}
        {evaluatedVectors.map((v, i) => {
          const endX = centerX + v.x * scale;
          const endY = centerY - v.y * scale;
          const norm = calculateNorm(v);
          
          return (
            <g key={i}>
              <line 
                x1={centerX} y1={centerY} 
                x2={endX} y2={endY} 
                stroke="#3a7bd5" strokeWidth="3" 
                markerEnd="url(#arrowhead2d)" 
              />
              <text x={endX + 10} y={endY} fontSize="14" fontWeight="bold" fill="#3a7bd5">
                {v.name}
              </text>
              {content.showCoordinates && (
                <text x={endX + 10} y={endY + 15} fontSize="11" fill="#666">
                  ({v.x.toFixed(1)}, {v.y.toFixed(1)})
                </text>
              )}
              {content.showNorm && (
                <text x={endX + 10} y={endY + 30} fontSize="11" fill="#666">
                  ‖{v.name}‖ = {norm.toFixed(2)}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Labels */}
        <text x={width - 20} y={centerY - 10} fontSize="14" fontWeight="bold">x</text>
        <text x={centerX + 10} y="20" fontSize="14" fontWeight="bold">y</text>
        
        <defs>
          <marker id="arrowhead2d" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3a7bd5" />
          </marker>
        </defs>
      </svg>
    );
  }
};

export default VectorRenderer;