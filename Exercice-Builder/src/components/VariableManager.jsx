import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const VariableManager = ({ currentExercise, generatedValues, addVariable, updateVariable, deleteVariable }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">🎲 Variables aléatoires</h2>
        <button
          onClick={addVariable}
          className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm"
        >
          <Plus size={16} />
          Variable
        </button>
      </div>

      {currentExercise.variables.length === 0 ? (
        <p className="text-gray-400 text-center py-4 bg-gray-50 rounded-lg">
          Ajoutez des variables pour créer des exercices infinis (a, b, c...)
        </p>
      ) : (
        <div className="space-y-3">
          {currentExercise.variables.map((variable) => (
            <div key={variable.id} className="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="text"
                  className="w-20 p-1 border rounded"
                  value={variable.name}
                  onChange={(e) => updateVariable(variable.id, { name: e.target.value })}
                  placeholder="a"
                />
                <select
                  className="p-1 border rounded"
                  value={variable.type}
                  onChange={(e) => updateVariable(variable.id, { type: e.target.value })}
                >
                  <option value="integer">Entier</option>
                  <option value="decimal">Décimal</option>
                  <option value="choice">Choix</option>
                </select>
                <button
                  onClick={() => deleteVariable(variable.id)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {variable.type === 'integer' || variable.type === 'decimal' ? (
                <div className="flex gap-2">
                  <p>Min :</p>
                  <input
                    type="number"
                    className="flex-1 p-1 border rounded"
                    placeholder="Min"
                    value={variable.min}
                    onChange={(e) => updateVariable(variable.id, { min: parseFloat(e.target.value) })}
                  />
                  <p>Max :</p>
                  <input
                    type="number"
                    className="flex-1 p-1 border rounded"
                    placeholder="Max"
                    value={variable.max}
                    onChange={(e) => updateVariable(variable.id, { max: parseFloat(e.target.value) })}
                  />
                  {variable.type === 'decimal' && (
                    <input
                      type="number"
                      className="w-20 p-1 border rounded"
                      placeholder="Déc."
                      value={variable.decimals}
                      onChange={(e) => updateVariable(variable.id, { decimals: parseInt(e.target.value) })}
                    />
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  placeholder="Valeurs séparées par des virgules: sin,cos,tan"
                  value={variable.choices.join(',')}
                  onChange={(e) => updateVariable(variable.id, { 
                    choices: e.target.value.split(',').map(s => s.trim()) 
                  })}
                />
              )}
              
              {generatedValues[variable.name] !== undefined && (
                <div className="mt-2 text-sm text-purple-700 font-medium">
                  Valeur actuelle: {generatedValues[variable.name]}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariableManager;