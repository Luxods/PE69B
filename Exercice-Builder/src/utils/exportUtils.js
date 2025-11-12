/**
 * Exporte les exercices en JSON
 * @param {Array} exercises - Liste des exercices
 * @param {string} filename - Nom du fichier
 */
export const exportToJSON = (exercises, filename = 'exercices.json') => {
  const dataStr = JSON.stringify(exercises, null, 2);
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
        const exercises = JSON.parse(e.target.result);
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