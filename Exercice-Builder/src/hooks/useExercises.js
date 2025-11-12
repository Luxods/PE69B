import { useState } from 'react';
import { getDefaultContent } from '../utils/defaultContent';

export const useExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    title: '',
    difficulty: 'Facile',
    chapter: 'Analyse',
    variables: [],
    elements: []
  });

  // ... autres fonctions

  const exportJSON = (includeAnswers = true, prettify = true) => {
    const dataToExport = exercises.map(ex => {
      if (!includeAnswers) {
        // Version sans réponses (pour les élèves)
        return {
          ...ex,
          elements: ex.elements.map(el => {
            if (el.type === 'question') {
              const { answer, lowerBound, upperBound, explanation, ...rest } = el.content;
              return { ...el, content: rest };
            }
            if (el.type === 'mcq') {
              return {
                ...el,
                content: {
                  ...el.content,
                  options: el.content.options.map(opt => ({
                    text: opt.text,
                    correct: false // Masquer les bonnes réponses
                  })),
                  explanation: undefined
                }
              };
            }
            return el;
          })
        };
      }
      return ex;
    });

    const jsonString = prettify 
      ? JSON.stringify(dataToExport, null, 2)
      : JSON.stringify(dataToExport);
      
    const dataBlob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    
    const filename = includeAnswers 
      ? 'exercices-avec-corrections.json'
      : 'exercices-eleves.json';
    
    link.download = filename;
    link.click();
    
    alert(`📥 Exercices exportés ${includeAnswers ? 'avec' : 'sans'} les réponses !`);
  };

  const importJSON = (file) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        
        // Validation basique
        if (!Array.isArray(imported)) {
          throw new Error('Format invalide');
        }
        
        // Vérifier si les exercices ont des réponses
        const hasAnswers = imported.some(ex => 
          ex.elements?.some(el => 
            (el.type === 'question' && el.content?.answer) ||
            (el.type === 'mcq' && el.content?.options?.some(o => o.correct))
          )
        );
        
        setExercises(imported);
        
        alert(`✅ ${imported.length} exercice(s) importé(s) ${hasAnswers ? 'avec' : 'sans'} corrections !`);
      } catch (error) {
        alert('❌ Erreur lors de l\'import : ' + error.message);
      }
    };
    
    reader.readAsText(file);
  };

  return {
    exercises,
    currentExercise,
    setCurrentExercise,
    addElement,
    updateElement,
    deleteElement,
    saveExercise,
    exportJSON,
    importJSON
  };
};