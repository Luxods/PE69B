import React from 'react';
import { MathText } from '../../utils/mathRenderer';

const TextRenderer = ({ content, generatedValues }) => {
  // Gestion sûre du contenu
  const textContent = content?.text || content || '';
  
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <MathText 
        content={textContent} 
        variables={generatedValues}
        className="text-gray-800 leading-relaxed"
      />
    </div>
  );
};

export default TextRenderer;