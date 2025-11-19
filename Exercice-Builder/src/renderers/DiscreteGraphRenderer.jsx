import React, { useMemo } from 'react';
import { replaceVariablesWithoutBraces } from '../utils/mathRenderer';

const DiscreteGraphRenderer = ({ content, generatedValues }) => {
  // Calculer les termes de la suite
  const calculateTerms = useMemo(() => {
    const terms = [];
    const { formula, recursiveFormula, firstTerm, numberOfTerms = 20, type } = content;
    
    try {
      if (type === 'explicit' && formula) {
        // Suite explicite
        const processedFormula = replaceVariablesWithoutBraces(formula, generatedValues);
        
        for (let n = 0; n <= numberOfTerms; n++) {
          try {
            const expression = processedFormula.replace(/\bn\b/g, n);
            const value = new Function('Math', `return ${expression}`)(Math);
            
            if (!isNaN(value) && isFinite(value)) {
              terms.push({ n, value });
            }
          } catch (e) {
            console.error(`Erreur calcul n=${n}:`, e);
          }
        }
      } else if (type === 'recursive' && recursiveFormula && firstTerm !== undefined) {
        // Suite récurrente
        const processedFormula = replaceVariablesWithoutBraces(recursiveFormula, generatedValues);
        const u0 = parseFloat(replaceVariablesWithoutBraces(String(firstTerm), generatedValues));
        
        if (!isNaN(u0)) {
          terms.push({ n: 0, value: u0 });
          
          let currentValue = u0;
          for (let n = 1; n <= numberOfTerms; n++) {
            try {
              const expression = processedFormula
                .replace(/\bu_n\b/g, currentValue)
                .replace(/\bu\b/g, currentValue);
              
              const nextValue = new Function('Math', `return ${expression}`)(Math);
              
              if (!isNaN(nextValue) && isFinite(nextValue)) {
                terms.push({ n, value: nextValue });
                currentValue = nextValue;
              } else {
                break;
              }
            } catch (e) {
              console.error(`Erreur récurrence n=${n}:`, e);
              break;
            }
          }
        }
      } else if (type === 'manual' && content.manualTerms) {
        // Termes manuels
        content.manualTerms.forEach((value, index) => {
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            terms.push({ n: index, value: numValue });
          }
        });
      }
    } catch (error) {
      console.error('Erreur calcul suite:', error);
    }
    
    return terms;
  }, [content, generatedValues]);

  // Calculer les dimensions
  const graphDimensions = useMemo(() => {
    if (calculateTerms.length === 0) {
      return { minX: 0, maxX: 10, minY: -5, maxY: 5 };
    }

    const values = calculateTerms.map(t => t.value);
    const indices = calculateTerms.map(t => t.n);
    
    let minY = Math.min(...values);
    let maxY = Math.max(...values);
    
    const rangeY = maxY - minY || 1;
    minY = minY - rangeY * 0.1;
    maxY = maxY + rangeY * 0.1;
    
    if (content.limit !== undefined && !isNaN(content.limit)) {
      const limitValue = parseFloat(content.limit);
      minY = Math.min(minY, limitValue - rangeY * 0.1);
      maxY = Math.max(maxY, limitValue + rangeY * 0.1);
    }
    
    return {
      minX: content.minX ?? 0,
      maxX: content.maxX ?? Math.max(...indices, 10),
      minY: content.minY ?? minY,
      maxY: content.maxY ?? maxY
    };
  }, [calculateTerms, content]);

  const svgWidth = 600;
  const svgHeight = 400;
  const padding = 40;
  
  const xScale = (n) => {
    const { minX, maxX } = graphDimensions;
    return padding + ((n - minX) / (maxX - minX)) * (svgWidth - 2 * padding);
  };
  
  const yScale = (value) => {
    const { minY, maxY } = graphDimensions;
    return svgHeight - padding - ((value - minY) / (maxY - minY)) * (svgHeight - 2 * padding);
  };

  const generateTicks = (min, max, count = 5) => {
    const ticks = [];
    const step = (max - min) / count;
    for (let i = 0; i <= count; i++) {
      ticks.push(min + i * step);
    }
    return ticks;
  };

  const xTicks = generateTicks(graphDimensions.minX, graphDimensions.maxX, 10);
  const yTicks = generateTicks(graphDimensions.minY, graphDimensions.maxY, 5);

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <svg 
        width={svgWidth} 
        height={svgHeight} 
        className="border border-gray-300 rounded"
        style={{ backgroundColor: '#fafafa' }}
      >
        {/* Grille */}
        {content.showGrid !== false && (
          <g>
            {xTicks.map(x => (
              <line
                key={`vgrid-${x}`}
                x1={xScale(x)}
                y1={padding}
                x2={xScale(x)}
                y2={svgHeight - padding}
                stroke="#e5e5e5"
                strokeWidth="1"
              />
            ))}
            {yTicks.map(y => (
              <line
                key={`hgrid-${y}`}
                x1={padding}
                y1={yScale(y)}
                x2={svgWidth - padding}
                y2={yScale(y)}
                stroke="#e5e5e5"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Axes */}
        <g>
          <line
            x1={padding}
            y1={yScale(0)}
            x2={svgWidth - padding}
            y2={yScale(0)}
            stroke="#4a5568"
            strokeWidth="2"
          />
          <line
            x1={xScale(0)}
            y1={padding}
            x2={xScale(0)}
            y2={svgHeight - padding}
            stroke="#4a5568"
            strokeWidth="2"
          />
          
          <polygon
            points={`${svgWidth - padding},${yScale(0)} ${svgWidth - padding - 8},${yScale(0) - 4} ${svgWidth - padding - 8},${yScale(0) + 4}`}
            fill="#4a5568"
          />
          <polygon
            points={`${xScale(0)},${padding} ${xScale(0) - 4},${padding + 8} ${xScale(0) + 4},${padding + 8}`}
            fill="#4a5568"
          />
        </g>

        {/* Graduations */}
        <g>
          {xTicks.filter(x => Number.isInteger(x) && x >= 0).map(x => (
            <g key={`xtick-${x}`}>
              <line
                x1={xScale(x)}
                y1={yScale(0) - 3}
                x2={xScale(x)}
                y2={yScale(0) + 3}
                stroke="#4a5568"
              />
              <text
                x={xScale(x)}
                y={yScale(0) + 15}
                textAnchor="middle"
                fontSize="12"
                fill="#4a5568"
              >
                {x}
              </text>
            </g>
          ))}
          
          {yTicks.filter(y => Math.abs(y) > 0.001).map(y => (
            <g key={`ytick-${y}`}>
              <line
                x1={xScale(0) - 3}
                y1={yScale(y)}
                x2={xScale(0) + 3}
                y2={yScale(y)}
                stroke="#4a5568"
              />
              <text
                x={xScale(0) - 10}
                y={yScale(y) + 4}
                textAnchor="end"
                fontSize="12"
                fill="#4a5568"
              >
                {y.toFixed(1)}
              </text>
            </g>
          ))}
        </g>

        {/* Limite */}
        {content.showLimit && content.limit !== undefined && !isNaN(content.limit) && (
          <g>
            <line
              x1={padding}
              y1={yScale(parseFloat(content.limit))}
              x2={svgWidth - padding}
              y2={yScale(parseFloat(content.limit))}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text
              x={svgWidth - padding - 50}
              y={yScale(parseFloat(content.limit)) - 5}
              fill="#ef4444"
              fontSize="12"
              fontWeight="bold"
            >
              L = {content.limit}
            </text>
          </g>
        )}

        {/* Relier les points */}
        {content.connectPoints && calculateTerms.length > 1 && (
          <polyline
            points={calculateTerms.map(t => `${xScale(t.n)},${yScale(t.value)}`).join(' ')}
            fill="none"
            stroke="#cbd5e0"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        )}

        {/* Points */}
        <g>
          {calculateTerms.map((term, index) => (
            <g key={`point-${term.n}`}>
              <circle
                cx={xScale(term.n)}
                cy={yScale(term.value)}
                r="4"
                fill="#667eea"
                stroke="#4c51bf"
                strokeWidth="2"
              />
              {content.showValues && index < 10 && (
                <text
                  x={xScale(term.n)}
                  y={yScale(term.value) - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#4c51bf"
                >
                  {term.value.toFixed(2)}
                </text>
              )}
            </g>
          ))}
        </g>

        {/* Labels axes */}
        <g>
          <text
            x={svgWidth - padding}
            y={yScale(0) - 10}
            textAnchor="end"
            fontSize="14"
            fill="#2d3748"
            fontWeight="bold"
          >
            n
          </text>
          <text
            x={xScale(0) + 10}
            y={padding + 15}
            textAnchor="start"
            fontSize="14"
            fill="#2d3748"
            fontWeight="bold"
          >
            uₙ
          </text>
        </g>
      </svg>
    </div>
  );
};

export default DiscreteGraphRenderer;