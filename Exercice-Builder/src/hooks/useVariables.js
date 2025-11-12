import { useState, useEffect } from 'react';
import { generateRandomValues } from '../utils/generateRandomValues';

export const useVariables = (currentExercise, setCurrentExercise) => {
  const [generatedValues, setGeneratedValues] = useState({});

  const addVariable = () => {
    setCurrentExercise({
      ...currentExercise,
      variables: [...currentExercise.variables, {
        id: Date.now(),
        name: 'a',
        type: 'integer',
        min: 1,
        max: 10,
        decimals: 2,
        choices: []
      }]
    });
  };

  const updateVariable = (id, updates) => {
    setCurrentExercise({
      ...currentExercise,
      variables: currentExercise.variables.map(v => 
        v.id === id ? { ...v, ...updates } : v
      )
    });
  };

  const deleteVariable = (id) => {
    setCurrentExercise({
      ...currentExercise,
      variables: currentExercise.variables.filter(v => v.id !== id)
    });
  };

  const regenerateValues = () => {
    const newValues = generateRandomValues(currentExercise.variables);
    setGeneratedValues(newValues);
  };

  useEffect(() => {
    if (currentExercise.variables.length > 0) {
      regenerateValues();
    }
  }, [currentExercise.variables.length]);

  return {
    generatedValues,
    addVariable,
    updateVariable,
    deleteVariable,
    regenerateValues
  };
};