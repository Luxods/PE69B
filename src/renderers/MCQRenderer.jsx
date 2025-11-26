import React, { useState } from 'react';
import { MathText } from '../utils/mathRenderer';

const MCQRenderer = ({ content, generatedValues, element }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerToggle = (index) => {
    if (content.multipleAnswers) {
      setSelectedAnswers(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setSelectedAnswers([index]);
    }
  };

  return (
    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
      <div className="mb-4">
        <MathText 
          content={content.question}
          variables={generatedValues}
          className="font-medium text-gray-800"
        />
      </div>

      <div className="space-y-2">
        {content.options?.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 rounded cursor-pointer transition-colors
              ${selectedAnswers.includes(index) 
                ? 'bg-green-100 border-green-400' 
                : 'bg-white hover:bg-gray-50'
              } border`}
          >
            <input
              type={content.multipleAnswers ? "checkbox" : "radio"}
              name={`mcq-${element?.id}`}
              checked={selectedAnswers.includes(index)}
              onChange={() => handleAnswerToggle(index)}
              className="mr-3"
            />
            <MathText 
              content={option}
              variables={generatedValues}
              className="text-gray-700"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default MCQRenderer;