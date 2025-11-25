import { useState } from 'react';
import { getDefaultContent } from '../utils/defaultContent';
import { exportToJSON, exportAllInOne, importFromJSON } from '../utils/exportUtils';

export const useExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    title: '',
    difficulty: 'Facile',
    chapter: 'Analyse',
    competences: [],
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

  const moveElement = (fromIndex, toIndex) => {
    const newElements = [...currentExercise.elements];
    const [removed] = newElements.splice(fromIndex, 1);
    newElements.splice(toIndex, 0, removed);
    setCurrentExercise({
      ...currentExercise,
      elements: newElements
    });
  };
  
  const saveExercise = () => {
    if (currentExercise.title && currentExercise.elements.length > 0) {
      const exerciseToSave = {
        id: Date.now(),
        title: currentExercise.title,
        chapter: currentExercise.chapter,
        difficulty: currentExercise.difficulty,
        competences: currentExercise.competences || [],
        variables: currentExercise.variables || [],
        elements: currentExercise.elements || []
      };
      
      setExercises([...exercises, exerciseToSave]);
      
      // Réinitialiser pour un nouvel exercice
      setCurrentExercise({
        title: '',
        difficulty: 'Facile',
        chapter: 'Analyse',
        competences: [],
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

  const loadExercise = (exercise) => {
    setCurrentExercise({
      ...exercise,
      id: undefined // Retirer l'ID pour en créer un nouveau lors de la sauvegarde
    });
  };

  const deleteExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const duplicateExercise = (id) => {
    const exerciseToDuplicate = exercises.find(ex => ex.id === id);
    if (exerciseToDuplicate) {
      const duplicated = {
        ...exerciseToDuplicate,
        id: Date.now(),
        title: `${exerciseToDuplicate.title} (copie)`
      };
      setExercises([...exercises, duplicated]);
    }
  };

  const exportExercises = (includeAnswers = true, prettify = true, mode = 'multiple') => {
    if (exercises.length === 0) {
      alert('⚠️ Aucun exercice à exporter');
      return;
    }

    if (mode === 'multiple') {
      exportToJSON(exercises, includeAnswers, prettify);
      alert(`📥 Export de ${exercises.length} fichier(s) lancé !`);
    } else {
      const version = includeAnswers ? 'prof' : 'eleve';
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `exercices_${version}_${timestamp}.json`;
      exportAllInOne(exercises, filename, includeAnswers, prettify);
      alert(`📥 Exercices exportés dans ${filename}`);
    }
  };

  const importExercises = async (file) => {
    try {
      const imported = await importFromJSON(file);
      
      const hasAnswers = imported.some(ex => 
        ex.elements?.some(el => 
          (el.type === 'equation' && el.content?.correctAnswer) ||
          (el.type === 'question' && el.content?.answer) ||
          (el.type === 'mcq' && el.content?.correctAnswers)
        )
      );
      
      setExercises(prev => [...prev, ...imported]);
      
      alert(`✅ ${imported.length} exercice(s) importé(s) ${hasAnswers ? 'avec' : 'sans'} corrections !`);
    } catch (error) {
      alert('❌ Erreur lors de l\'import : ' + error.message);
    }
  };


  return {
    exercises,
    currentExercise,
    setCurrentExercise,
    addElement,
    updateElement,
    deleteElement,
    moveElement,
    saveExercise,
    loadExercise,
    deleteExercise,
    duplicateExercise,
    exportExercises,
    importExercises,
    exportJSON: exportExercises,
    importJSON: importExercises,
  };
};