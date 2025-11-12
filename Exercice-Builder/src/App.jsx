import React, { useState } from 'react';
import { Save } from 'lucide-react';
import Header from './components/Header';
import ExerciseInfo from './components/ExerciseInfo';
import VariableManager from './components/VariableManager';
import ElementList from './components/ElementList';
import ExercisePreview from './components/ExercisePreview';
import Sidebar from './components/Sidebar';
import { useExercises } from './hooks/useExercises';
import { useVariables } from './hooks/useVariables';
import './styles/style.css';

const App = () => {
  const [previewMode, setPreviewMode] = useState(false);
  
  const {
    exercises,
    currentExercise,
    setCurrentExercise,
    addElement,
    updateElement,
    deleteElement,
    saveExercise,
    exportJSON
  } = useExercises();

  const {
    generatedValues,
    addVariable,
    updateVariable,
    deleteVariable,
    regenerateValues
  } = useVariables(currentExercise, setCurrentExercise);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          hasVariables={currentExercise.variables.length > 0}
          onRegenerate={regenerateValues}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
            {!previewMode ? (
              <div className="space-y-6">
                <ExerciseInfo
                  currentExercise={currentExercise}
                  setCurrentExercise={setCurrentExercise}
                />
                
                <VariableManager
                  currentExercise={currentExercise}
                  generatedValues={generatedValues}
                  addVariable={addVariable}
                  updateVariable={updateVariable}
                  deleteVariable={deleteVariable}
                />
                
                <ElementList
                  currentExercise={currentExercise}
                  updateElement={updateElement}
                  deleteElement={deleteElement}
                  addElement={addElement}
                />
                
                <button
                  onClick={saveExercise}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition font-medium text-lg"
                >
                  <Save size={20} />
                  Sauvegarder l'exercice
                </button>
              </div>
            ) : (
              <ExercisePreview
                currentExercise={currentExercise}
                generatedValues={generatedValues}
              />
            )}
          </div>
          
          <Sidebar exercises={exercises} exportJSON={exportJSON} />
        </div>
      </div>
    </div>
  );
};

export default App;