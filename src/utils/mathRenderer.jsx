import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Formatte une valeur numérique en gérant les signes intelligemment
 */
const formatValue = (value, context = 'standalone') => {
  if (value === null || value === undefined) return '';
  
  const numValue = typeof value === 'number' ? value : parseFloat(value);
  
  if (isNaN(numValue)) return String(value);
  
  // Formater le nombre (enlever les .00 inutiles)
  let formatted = Number.isInteger(numValue) 
    ? numValue.toString() 
    : parseFloat(numValue.toFixed(4)).toString();
  
  // Si négatif et dans un contexte d'addition/soustraction, mettre entre parenthèses
  if (numValue < 0 && context === 'operation') {
    formatted = `(${formatted})`;
  }
  
  return formatted;
};

/**
 * Nettoie les expressions mathématiques après remplacement
 */
const cleanMathExpression = (expression) => {
  let cleaned = expression;
  
  // Remplacer + - par -
  cleaned = cleaned.replace(/\+\s*-/g, '-');
  
  // Remplacer - - par +
  cleaned = cleaned.replace(/-\s*-/g, '+');
  
  // Remplacer +- par -
  cleaned = cleaned.replace(/\+-/g, '-');
  
  // Remplacer --  par +
  cleaned = cleaned.replace(/--/g, '+');
  
  // Remplacer les parenthèses inutiles autour des nombres positifs
  cleaned = cleaned.replace(/\((\d+\.?\d*)\)/g, '$1');
  
  // Nettoyer les espaces multiples
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  return cleaned;
};

/**
 * Remplace les variables AVEC accolades {var} - Version intelligente
 */
export const replaceVariablesWithBraces = (text, variables = {}) => {
  if (typeof text !== 'string') {
    return String(text || '');
  }
  
  if (!variables || Object.keys(variables).length === 0) {
    return text;
  }
  
  let result = text;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    
    // Chercher le contexte autour de chaque occurrence
    let match;
    const tempRegex = new RegExp(`([+\\-]?)\\s*\\{${key}\\}`, 'g');
    const matches = [];
    
    while ((match = tempRegex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        precedingSign: match[1],
        fullMatch: match[0]
      });
    }
    
    // Remplacer en tenant compte du contexte
    matches.reverse().forEach(({ precedingSign, fullMatch }) => {
      const numValue = typeof value === 'number' ? value : parseFloat(value);
      let replacement = formatValue(value);
      
      if (precedingSign && !isNaN(numValue)) {
        if (precedingSign === '+' && numValue < 0) {
          // +{-5} devient -5 (on enlève le +)
          replacement = ` ${replacement}`;
        } else if (precedingSign === '-' && numValue < 0) {
          // -{-5} devient +5
          replacement = ` + ${Math.abs(numValue)}`;
        } else if (precedingSign === '-') {
          // -{5} reste -5
          replacement = ` - ${Math.abs(numValue)}`;
        } else if (precedingSign === '+') {
          // +{5} reste +5
          replacement = ` + ${Math.abs(numValue)}`;
        }
        
        result = result.replace(fullMatch, replacement);
      }
    });
    
    // Remplacer les occurrences restantes (sans signe devant)
    result = result.replace(regex, formatValue(value));
  });
  
  // Nettoyer l'expression finale
  result = cleanMathExpression(result);
  
  return result;
};

/**
 * Remplace les variables SANS accolades - Version intelligente
 */
export const replaceVariablesWithoutBraces = (text, variables = {}) => {
  if (typeof text !== 'string') {
    return String(text || '');
  }
  
  if (!variables || Object.keys(variables).length === 0) {
    return text;
  }
  
  let result = text;
  
  // Trier par longueur décroissante
  const sortedKeys = Object.keys(variables).sort((a, b) => b.length - a.length);
  
  sortedKeys.forEach(key => {
    const value = variables[key];
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    
    // Créer plusieurs patterns pour différents contextes
    const patterns = [
      // Variable précédée d'un opérateur
      {
        regex: new RegExp(`([+\\-*/])\\s*\\b${key}\\b`, 'g'),
        replace: (match, op) => {
          if (isNaN(numValue)) return match;
          
          if (op === '+' && numValue < 0) {
            return ` - ${Math.abs(numValue)}`;
          } else if (op === '-' && numValue < 0) {
            return ` + ${Math.abs(numValue)}`;
          } else if (op === '+') {
            return ` + ${Math.abs(numValue)}`;
          } else if (op === '-') {
            return ` - ${Math.abs(numValue)}`;
          } else {
            // Pour * et /, garder les parenthèses si négatif
            return `${op}${numValue < 0 ? `(${numValue})` : numValue}`;
          }
        }
      },
      // Variable au début ou isolée
      {
        regex: new RegExp(`\\b${key}\\b`, 'g'),
        replace: () => formatValue(value)
      }
    ];
    
    // Appliquer les patterns dans l'ordre
    patterns.forEach(({ regex, replace }) => {
      result = result.replace(regex, replace);
    });
  });
  
  // Nettoyer l'expression finale
  result = cleanMathExpression(result);
  
  return result;
};

/**
 * Fonction helper pour choisir automatiquement
 */
export const replaceVariables = (text, variables = {}, requireBraces = true) => {
  const replacedText = requireBraces 
    ? replaceVariablesWithBraces(text, variables)
    : replaceVariablesWithoutBraces(text, variables);
  
  // Nettoyer une dernière fois
  return cleanMathExpression(replacedText);
};

/**
 * Composant pour le rendu math avec gestion intelligente des signes
 */
export const MathText = ({ content, variables = {}, className = '', requireBraces = true }) => {
  const textContent = String(content || '');
  
  if (!textContent) {
    return null;
  }
  
  // Remplacer les variables selon le mode
  const processedContent = replaceVariables(textContent, variables, requireBraces);
  
  // Séparer le texte et les formules math
  const parts = [];
  const regex = /\$\$([\s\S]*?)\$\$|\$(.*?)\$/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  
  while ((match = regex.exec(processedContent)) !== null) {
    // Ajouter le texte avant la formule
    if (match.index > lastIndex) {
      const textBefore = processedContent.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(
          <span key={`text-${key++}`}>{textBefore}</span>
        );
      }
    }
    
    // Déterminer si c'est bloc ou inline
    const isBlock = !!match[1];
    const formula = match[1] || match[2];
    
    if (formula) {
      // Nettoyer la formule une dernière fois
      const cleanFormula = cleanMathExpression(formula);
      
      try {
        if (isBlock) {
          parts.push(
            <BlockMath key={`math-${key++}`} math={cleanFormula} />
          );
        } else {
          parts.push(
            <InlineMath key={`math-${key++}`} math={cleanFormula} />
          );
        }
      } catch (error) {
        console.error('Math rendering error:', error);
        parts.push(
          <span key={`error-${key++}`} style={{ color: 'red' }}>
            {match[0]}
          </span>
        );
      }
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Ajouter le texte restant
  if (lastIndex < processedContent.length) {
    parts.push(
      <span key={`text-${key++}`}>
        {processedContent.substring(lastIndex)}
      </span>
    );
  }
  
  // Si pas de formules, retourner le texte simple
  if (parts.length === 0) {
    return <span className={className}>{processedContent}</span>;
  }
  
  return <div className={className}>{parts}</div>;
};

/**
 * Fonction utilitaire pour formater les expressions mathématiques
 * Peut être utilisée dans les editors pour prévisualiser
 */
export const formatMathExpression = (expression, variables = {}) => {
  const replaced = replaceVariablesWithoutBraces(expression, variables);
  return cleanMathExpression(replaced);
};