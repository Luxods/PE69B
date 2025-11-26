import React from 'react';
import { MathText } from '../utils/mathRenderer';

const TextRenderer = ({ content, generatedValues }) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <MathText 
        content={content?.text || ''} 
        variables={generatedValues}
        className="text-gray-800 leading-relaxed"
        requireBraces={true}  // Nécessite {}
      />
    </div>
  );
};

export default TextRenderer;