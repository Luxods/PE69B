import React from 'react';
import { chapters, difficulties } from '../constants';

const ExerciseInfo = ({ currentExercise, setCurrentExercise }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">📋 Informations</h2>
      
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Chapitre</label>
          <select
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            value={currentExercise.chapter}
            onChange={(e) => setCurrentExercise({...currentExercise, chapter: e.target.value})}
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
{/*}
        <div>
          <label className="block text-sm font-medium mb-1">Compétence</label>
          <select
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            value={currentExercise.ability}
            onChange={(e) => setCurrentExercise({...currentExercise, ability: e.target.value})}
          >
            {ability.map(ch => <option key={ch}>{ch}</option>)}
          </select>
        </div>
        */}
      </div>
    </div>
  );
};

export default ExerciseInfo;