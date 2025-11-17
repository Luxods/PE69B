import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Remplace les variables AVEC accolades {var}
 * Pour : text, question, mcq
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
    // Remplace {key} uniquement
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    
    let formattedValue = '';
    if (value === null || value === undefined) {
      formattedValue = '';
    } else if (typeof value === 'number') {
      formattedValue = Number.isInteger(value) 
        ? value.toString() 
        : parseFloat(value.toFixed(4)).toString();
    } else {
      formattedValue = String(value);
    }
    
    result = result.replace(regex, formattedValue);
  });
  
  return result;
};

/**
 * Remplace les variables SANS accolades
 * Pour : equation, function, graph, etc.
 */
export const replaceVariablesWithoutBraces = (text, variables = {}) => {
  if (typeof text !== 'string') {
    return String(text || '');
  }
  
  if (!variables || Object.keys(variables).length === 0) {
    return text;
  }
  
  let result = text;
  
  // Trier par longueur décroissante pour éviter les remplacements partiels
  // Ex: remplacer "abc" avant "ab" avant "a"
  const sortedKeys = Object.keys(variables).sort((a, b) => b.length - a.length);
  
  sortedKeys.forEach(key => {
    const value = variables[key];
    
    // Remplace la variable entourée de caractères non-alphanumériques
    // ou en début/fin de chaîne
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    
    let formattedValue = '';
    if (value === null || value === undefined) {
      formattedValue = '';
    } else if (typeof value === 'number') {
      // Mettre entre parenthèses si négatif pour éviter les problèmes
      if (value < 0) {
        formattedValue = `(${value})`;
      } else {
        formattedValue = Number.isInteger(value) 
          ? value.toString() 
          : parseFloat(value.toFixed(4)).toString();
      }
    } else {
      formattedValue = String(value);
    }
    
    result = result.replace(regex, formattedValue);
  });
  
  return result;
};

/**
 * Fonction helper pour choisir automatiquement
 */
export const replaceVariables = (text, variables = {}, requireBraces = true) => {
  return requireBraces 
    ? replaceVariablesWithBraces(text, variables)
    : replaceVariablesWithoutBraces(text, variables);
};

/**
 * Composant pour le rendu math avec choix du mode
 */
export const MathText = ({ content, variables = {}, className = '', requireBraces = true }) => {
  const textContent = String(content || '');
  
  if (!textContent) {
    return null;
  }
  
  // Remplacer les variables selon le mode
  const processedContent = requireBraces 
    ? replaceVariablesWithBraces(textContent, variables)
    : replaceVariablesWithoutBraces(textContent, variables);
  
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
      try {
        if (isBlock) {
          parts.push(
            <BlockMath key={`math-${key++}`} math={formula} />
          );
        } else {
          parts.push(
            <InlineMath key={`math-${key++}`} math={formula} />
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