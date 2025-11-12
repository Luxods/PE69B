import React from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

const TextRenderer = ({ content, generatedValues }) => {
  const evaluatedText = evaluateExpression(content.text, generatedValues);

  return (
    <div className="text-gray-700 leading-relaxed">
      <p>{evaluatedText}</p>
    </div>
  );
};

export default TextRenderer;