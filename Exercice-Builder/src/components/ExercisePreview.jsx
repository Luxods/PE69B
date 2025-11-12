import React from 'react';
import ElementRenderer from '../renderers/ElementRenderer';

const ExercisePreview = ({ currentExercise, generatedValues }) => {
  return (
    <div className="space-y-6">
      <div className="border-b-2 pb-4">
        <h3 className="text-2xl font-bold text-gray-800">{currentExercise.title}</h3>
        <div className="flex gap-4 mt-2 text-sm">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            📚 {currentExercise.chapter}
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
            ⭐ {currentExercise.difficulty}
          </span>
        </div>
        
        {currentExercise.variables.length > 0 && (
          <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm font-medium text-purple-900 mb-1">
              🎲 Valeurs générées :
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(generatedValues).map(([key, value]) => (
                <span key={key} className="px-2 py-1 bg-white rounded border border-purple-300 text-sm">
                  <strong>{key}</strong> = {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {currentExercise.elements.map((element) => (
        <ElementRenderer
          key={element.id}
          element={element}
          generatedValues={generatedValues}
        />
      ))}
    </div>
  );
};

export default ExercisePreview;