import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Remplace les variables entre accolades
 */
export const replaceVariables = (text, variables = {}) => {
  // S'assurer que text est une chaîne
  if (typeof text !== 'string') {
    console.warn('replaceVariables: text is not a string:', text);
    return String(text || '');
  }
  
  if (!variables || Object.keys(variables).length === 0) {
    return text;
  }
  
  let result = text;
  
  // Remplacer les variables
  Object.entries(variables).forEach(([key, value]) => {
    // Créer une regex pour {key}
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    
    // Formater la valeur
    let formattedValue = '';
    if (value === null || value === undefined) {
      formattedValue = '';
    } else if (typeof value === 'number') {
      formattedValue = Number.isInteger(value) 
        ? value.toString() 
        : parseFloat(value.toFixed(4)).toString(); // Enlève les zéros inutiles
    } else {
      formattedValue = String(value);
    }
    
    result = result.replace(regex, formattedValue);
  });
  
  return result;
};

/**
 * Composant principal pour le rendu math
 */
export const MathText = ({ content, variables = {}, className = '' }) => {
  // S'assurer que content est une chaîne
  const textContent = String(content || '');
  
  if (!textContent) {
    return null;
  }
  
  // Remplacer les variables
  const processedContent = replaceVariables(textContent, variables);
  
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