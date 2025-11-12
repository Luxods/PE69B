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

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      content: getDefaultContent(type)
    };
    setCurrentExercise({
      ...currentExercise,
      elements: [...currentExercise.elements, newElement]
    });
  };

  const updateElement = (id, content) => {
    setCurrentExercise({
      ...currentExercise,
      elements: currentExercise.elements.map(el => 
        el.id === id ? { ...el, content } : el
      )
    });
  };

  const deleteElement = (id) => {
    setCurrentExercise({
      ...currentExercise,
      elements: currentExercise.elements.filter(el => el.id !== id)
    });
  };

  const saveExercise = () => {
    if (currentExercise.title && currentExercise.elements.length > 0) {
      setExercises([...exercises, { ...currentExercise, id: Date.now() }]);
      setCurrentExercise({
        title: '',
        difficulty: 'Facile',
        chapter: 'Analyse',
        variables: [],
        elements: []
      });
      alert('✅ Exercice sauvegardé !');
      return true;
    } else {
      alert('⚠️ Veuillez ajouter un titre et au moins un élément');
      return false;
    }
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(exercises, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'exercices-terminale.json';
    link.click();
    alert('📥 Exercices exportés en JSON !');
  };

  return {
    exercises,
    currentExercise,
    setCurrentExercise,
    addElement,
    updateElement,
    deleteElement,
    saveExercise,
    exportJSON
  };
};