import React, { useMemo } from 'react';
import { replaceVariablesWithoutBraces } from '../utils/mathRenderer';

const GraphRenderer = ({ content, generatedValues }) => {
  // Valeurs par défaut
  const xMin = content.xMin ?? -10;
  const xMax = content.xMax ?? 10;
  
  // Calculer les points et trouver les limites Y si auto_window est activé
  const { points, autoYMin, autoYMax } = useMemo(() => {
    const calculatedPoints = [];
    const steps = 200;
    let minY = Infinity;
    let maxY = -Infinity;
    
    // Remplacer les variables dans l'expression
    let processedExpression = content.expression || '';
    if (generatedValues) {
      processedExpression = replaceVariablesWithoutBraces(processedExpression, generatedValues);
    }
    
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (xMax - xMin) * i / steps;
      try {
        // Préparer l'expression pour l'évaluation
        let expr = processedExpression;
        
        // Remplacer x par sa valeur
        expr = expr.replace(/\bx\b/g, `(${x})`);
        
        // Remplacer les opérateurs et fonctions
        expr = expr.replace(/\^/g, '**');
        expr = expr.replace(/\bsin\b/g, 'Math.sin');
        expr = expr.replace(/\bcos\b/g, 'Math.cos');
        expr = expr.replace(/\btan\b/g, 'Math.tan');
        expr = expr.replace(/\bexp\b/g, 'Math.exp');
        expr = expr.replace(/\bln\b/g, 'Math.log');
        expr = expr.replace(/\blog\b/g, 'Math.log10');
        expr = expr.replace(/\bsqrt\b/g, 'Math.sqrt');
        expr = expr.replace(/\babs\b/g, 'Math.abs');
        expr = expr.replace(/\bpi\b/g, 'Math.PI');
        expr = expr.replace(/\be\b/g, 'Math.E');
        
        // Évaluer l'expression
        const y = new Function('Math', `return ${expr}`)(Math);
        
        if (!isNaN(y) && isFinite(y)) {
          calculatedPoints.push({ x, y });
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      } catch (e) {
        // Ignorer les erreurs pour les points individuels
      }
    }
    
    // Ajouter une marge de 10% si on a trouvé des points valides
    if (minY !== Infinity && maxY !== -Infinity) {
      const range = maxY - minY;
      const margin = range * 0.1 || 1; // Au moins 1 unité de marge
      minY -= margin;
      maxY += margin;
      
      // S'assurer que 0 est visible si proche
      if (minY > -1 && minY < 0) minY = -1;
      if (maxY < 1 && maxY > 0) maxY = 1;
    } else {
      // Valeurs par défaut si aucun point valide
      minY = -10;
      maxY = 10;
    }
    
    return { 
      points: calculatedPoints, 
      autoYMin: minY, 
      autoYMax: maxY 
    };
  }, [content.expression, generatedValues, xMin, xMax]);
  
  // Utiliser les limites automatiques si auto_window est activé
  const yMin = content.auto_window ? autoYMin : (content.yMin ?? -10);
  const yMax = content.auto_window ? autoYMax : (content.yMax ?? 10);
  
  // Dimensions du SVG
  const width = 500;
  const height = 350;
  const padding = 50;
  
  // Fonctions de mise à l'échelle
  const scaleX = (x) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const scaleY = (y) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);
  
  // Générer les graduations
  const generateTicks = (min, max, count = 10) => {
    const ticks = [];
    const range = max - min;
    const step = Math.pow(10, Math.floor(Math.log10(range))) / 2; // Step adaptatif
    const start = Math.ceil(min / step) * step;
    
    for (let value = start; value <= max; value += step) {
      ticks.push(value);
    }
    return ticks;
  };
  
  const xTicks = generateTicks(xMin, xMax);
  const yTicks = generateTicks(yMin, yMax);

  return (
    <div className="relative">
      <svg width={width} height={height} className="border-2 border-gray-300 bg-white rounded">
        {/* Grille */}
        {content.showGrid !== false && (
          <>
            {/* Grille verticale */}
            {xTicks.map((x, i) => (
              <line
                key={`grid-v-${i}`}
                x1={scaleX(x)}
                y1={padding}
                x2={scaleX(x)}
                y2={height - padding}
                stroke="#e0e0e0"
                strokeWidth="1"
              />
            ))}
            {/* Grille horizontale */}
            {yTicks.map((y, i) => (
              <line
                key={`grid-h-${i}`}
                x1={padding}
                y1={scaleY(y)}
                x2={width - padding}
                y2={scaleY(y)}
                stroke="#e0e0e0"
                strokeWidth="1"
              />
            ))}
          </>
        )}
        
        {/* Axes */}
        {content.showAxes !== false && (
          <>
            {/* Axe X */}
            {yMin <= 0 && yMax >= 0 && (
              <line 
                x1={padding} 
                y1={scaleY(0)} 
                x2={width - padding} 
                y2={scaleY(0)} 
                stroke="#000" 
                strokeWidth="2" 
              />
            )}
            {/* Axe Y */}
            {xMin <= 0 && xMax >= 0 && (
              <line 
                x1={scaleX(0)} 
                y1={padding} 
                x2={scaleX(0)} 
                y2={height - padding} 
                stroke="#000" 
                strokeWidth="2" 
              />
            )}
          </>
        )}
        
        {/* Courbe */}
        {points.length > 1 && (
          <polyline
            points={points.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')}
            fill="none"
            stroke="#3a7bd5"
            strokeWidth="3"
          />
        )}
        
        {/* Labels des axes */}
        {content.showAxes !== false && (
          <>
            <text x={width - padding + 15} y={scaleY(Math.max(0, yMin)) + 5} fontSize="14" fontWeight="bold">x</text>
            <text x={scaleX(Math.max(0, xMin)) + 5} y={padding - 15} fontSize="14" fontWeight="bold">y</text>
          </>
        )}
        
        {/* Graduations */}
        <text x={scaleX(xMin)} y={height - padding + 20} fontSize="10" textAnchor="start">
          {xMin.toFixed(xMin % 1 === 0 ? 0 : 1)}
        </text>
        <text x={scaleX(xMax)} y={height - padding + 20} fontSize="10" textAnchor="end">
          {xMax.toFixed(xMax % 1 === 0 ? 0 : 1)}
        </text>
        <text x={padding - 10} y={scaleY(yMin)} fontSize="10" textAnchor="end">
          {yMin.toFixed(yMin % 1 === 0 ? 0 : 1)}
        </text>
        <text x={padding - 10} y={scaleY(yMax)} fontSize="10" textAnchor="end">
          {yMax.toFixed(yMax % 1 === 0 ? 0 : 1)}
        </text>
      </svg>
      
      {/* Affichage des limites Y automatiques */}
      {content.auto_window && (
        <div className="text-xs text-gray-500 mt-1">
          Fenêtre Y auto: [{autoYMin.toFixed(2)}, {autoYMax.toFixed(2)}]
        </div>
      )}
    </div>
  );
};

export default GraphRenderer;