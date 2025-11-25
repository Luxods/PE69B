/**
 * Génère un nom de fichier unique pour un exercice
 */
const generateFileName = (exercise, index) => {
  // Nettoyer le titre pour l'utiliser dans le nom de fichier
  const sanitizeTitle = (str) => {
    return str
      .toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .substring(0, 30);
  };

  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const title = sanitizeTitle(exercise.title || 'exercice');
  const chapter = sanitizeTitle(exercise.chapter || 'general');
  
  return `${chapter}_${title}_${index + 1}_${random}.json`;
};

/**
 * Prépare un exercice pour l'export (enlève les réponses si nécessaire)
 */
const prepareExerciseForExport = (exercise, includeAnswers) => {
  if (includeAnswers) {
    return exercise;
  }

  // Copie profonde de l'exercice
  const cleanExercise = JSON.parse(JSON.stringify(exercise));
  
  // Parcourir tous les éléments et supprimer les réponses
  if (cleanExercise.elements) {
    cleanExercise.elements = cleanExercise.elements.map(element => {
      const cleanElement = { ...element };
      
      if (cleanElement.content) {
        // Pour les équations
        if (element.type === 'equation') {
          delete cleanElement.content.correctAnswer;
          delete cleanElement.content.solution;
          cleanElement.content.showSolution = false;
        }
        
        // Pour les QCM
        if (element.type === 'mcq') {
          delete cleanElement.content.correctAnswers;
          cleanElement.content.showCorrection = false;
        }
        
        // Pour les questions
        if (element.type === 'question') {
          delete cleanElement.content.answer;
          cleanElement.content.showAnswer = false;
        }
      }
      
      return cleanElement;
    });
  }
  
  return cleanExercise;
};

/**
 * Exporte UN SEUL exercice
 */
const exportSingleExercise = (exercise, filename, prettify = true) => {
  const dataStr = prettify 
    ? JSON.stringify(exercise, null, 2)
    : JSON.stringify(exercise);
  
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Exporte les exercices en JSON - UN FICHIER PAR EXERCICE
 * @param {Array} exercises - Liste des exercices
 * @param {boolean} includeAnswers - Inclure les réponses (version prof) ou non (version élève)
 * @param {boolean} prettify - Format indenté ou non
 */
export const exportToJSON = (exercises, includeAnswers = true, prettify = true) => {
  // Si un seul exercice, export simple
  if (!Array.isArray(exercises)) {
    exercises = [exercises];
  }

  // Exporter chaque exercice dans son propre fichier
  exercises.forEach((exercise, index) => {
    // Préparer l'exercice (avec ou sans réponses)
    const preparedExercise = prepareExerciseForExport(exercise, includeAnswers);
    
    // Générer un nom de fichier unique
    const filename = generateFileName(exercise, index);
    
    // Ajouter un petit délai entre chaque export pour éviter les problèmes de navigateur
    setTimeout(() => {
      exportSingleExercise(preparedExercise, filename, prettify);
    }, index * 100);
  });
};

/**
 * Exporte tous les exercices dans UN SEUL fichier (ancienne méthode si besoin)
 */
export const exportAllInOne = (exercises, filename = 'exercices.json', includeAnswers = true, prettify = true) => {
  const preparedExercises = exercises.map(ex => prepareExerciseForExport(ex, includeAnswers));
  const dataStr = prettify 
    ? JSON.stringify(preparedExercises, null, 2)
    : JSON.stringify(preparedExercises);
    
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Importe des exercices depuis un fichier JSON
 * @param {File} file - Fichier JSON
 * @returns {Promise<Array>} - Liste des exercices
 */
export const importFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        // Gérer si c'est un seul exercice ou un tableau
        const exercises = Array.isArray(data) ? data : [data];
        resolve(exercises);
      } catch (error) {
        reject(new Error('Fichier JSON invalide'));
      }
    };
    
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsText(file);
  });
};

/**
 * Valide la structure d'un exercice
 * @param {Object} exercise - Exercice à valider
 * @returns {Object} - {valid: boolean, errors: Array}
 */
export const validateExercise = (exercise) => {
  const errors = [];
  
  if (!exercise.title || exercise.title.trim() === '') {
    errors.push('Le titre est obligatoire');
  }
  
  if (!exercise.chapter) {
    errors.push('Le chapitre est obligatoire');
  }
  
  if (!exercise.elements || exercise.elements.length === 0) {
    errors.push('L\'exercice doit contenir au moins un élément');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};