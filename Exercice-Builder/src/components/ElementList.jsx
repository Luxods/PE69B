import React from 'react';
import { Trash2 } from 'lucide-react';
import { elementTypes } from '../constants';
import ElementEditor from '../editors/ElementEditor';

const ElementList = ({ currentExercise, updateElement, deleteElement, addElement }) => {
  const filteredElementTypes = elementTypes.filter(et => 
    et.chapters === 'all' || et.chapters.includes(currentExercise.chapter)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
          📝 Éléments de l'exercice
        </h2>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Ajouter un élément</label>
        <div className="flex flex-wrap gap-2">
          {filteredElementTypes.map(et => (
            <button
              key={et.type}
              onClick={() => addElement(et.type)}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition text-sm"
            >
              <span>{et.icon}</span>
              <span>{et.label}</span>
            </button>
          ))}
        </div>
      </div>

      {currentExercise.elements.length === 0 ? (
        <p className="text-gray-400 text-center py-8 bg-gray-50 rounded-lg">
          Ajoutez des éléments pour construire votre exercice
        </p>
      ) : (
        <div className="space-y-4">
          {currentExercise.elements.map((element, index) => (
            <div key={element.id} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-700">
                  {elementTypes.find(et => et.type === element.type)?.icon}{' '}
                  {elementTypes.find(et => et.type === element.type)?.label} #{index + 1}
                </span>
                <button
                  onClick={() => deleteElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <ElementEditor
                element={element}
                updateElement={updateElement}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElementList;