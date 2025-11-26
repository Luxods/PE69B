import React, { useState } from 'react';
import { chapters, difficulties, COMPETENCES_BY_CHAPTER } from '../constants';
import { ChevronDown, ChevronRight, Check, X } from 'lucide-react';

const ExerciseInfo = ({ currentExercise, setCurrentExercise }) => {
  const [showCompetences, setShowCompetences] = useState(false);
  
  // Obtenir les compétences du chapitre sélectionné
  const availableCompetences = COMPETENCES_BY_CHAPTER[currentExercise.chapter] || [];
  
  // Gérer la sélection des compétences
  const toggleCompetence = (competence) => {
    const currentCompetences = currentExercise.competences || [];
    
    if (currentCompetences.includes(competence)) {
      // Retirer la compétence
      setCurrentExercise({
        ...currentExercise,
        competences: currentCompetences.filter(c => c !== competence)
      });
    } else {
      // Ajouter la compétence
      setCurrentExercise({
        ...currentExercise,
        competences: [...currentCompetences, competence]
      });
    }
  };
  
  // Supprimer toutes les compétences
  const clearCompetences = () => {
    setCurrentExercise({
      ...currentExercise,
      competences: []
    });
  };

  // Quand on change de chapitre, réinitialiser les compétences
  const handleChapterChange = (newChapter) => {
    setCurrentExercise({
      ...currentExercise,
      chapter: newChapter,
      competences: [] // Réinitialiser car les compétences changent
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">📋 Informations</h2>
      
      {/* Titre */}
      <div>
        <label className="block text-sm font-medium mb-1">Titre</label>
        <input
          type="text"
          className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
          value={currentExercise.title}
          onChange={(e) => setCurrentExercise({...currentExercise, title: e.target.value})}
          placeholder="Ex: Étude de fonction avec paramètre"
        />
      </div>

      {/* Chapitre, Difficulté */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Chapitre</label>
          <select
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            value={currentExercise.chapter}
            onChange={(e) => handleChapterChange(e.target.value)}
          >
            {chapters.map(ch => <option key={ch}>{ch}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Difficulté</label>
          <select
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            value={currentExercise.difficulty}
            onChange={(e) => setCurrentExercise({...currentExercise, difficulty: e.target.value})}
          >
            {difficulties.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>


      {/* Compétences */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">
            Compétences ({currentExercise.competences?.length || 0})
          </label>
          <button
            type="button"
            onClick={() => setShowCompetences(!showCompetences)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {showCompetences ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Compétences sélectionnées */}
        {currentExercise.competences && currentExercise.competences.length > 0 && (
          <div className="p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-700">
                Compétences sélectionnées:
              </span>
              <button
                onClick={clearCompetences}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Tout effacer
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {currentExercise.competences.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs flex items-center gap-1"
                >
                  {comp}
                  <button
                    onClick={() => toggleCompetence(comp)}
                    className="hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Liste des compétences disponibles */}
        {showCompetences && (
          <div className="border-2 border-gray-200 rounded-lg p-2 max-h-60 overflow-y-auto">
            {availableCompetences.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-2">
                Sélectionnez un chapitre pour voir les compétences
              </p>
            ) : (
              <div className="space-y-1">
                {availableCompetences.map((competence, idx) => {
                  const isSelected = currentExercise.competences?.includes(competence);
                  
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-50 ${
                        isSelected ? 'bg-blue-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCompetence(competence)}
                        className="rounded"
                      />
                      <span className="text-sm">{competence}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseInfo;