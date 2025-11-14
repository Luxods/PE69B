import React, { useState, useRef } from 'react';
import { Trash2, GripVertical } from 'lucide-react';
import { elementTypes } from '../constants';
import ElementEditor from '../editors/ElementEditor';

const ElementList = ({ currentExercise, setCurrentExercise, updateElement, deleteElement, addElement }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const filteredElementTypes = elementTypes.filter(et => 
    et.chapters === 'all' || et.chapters.includes(currentExercise.chapter)
  );

  const handleDragStart = (e, index) => {
    dragItem.current = index;
    setDraggedIndex(index);
    setIsDragging(true);
    
    // Créer une image de drag personnalisée
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    // Réorganiser les éléments
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const draggedElement = currentExercise.elements[dragItem.current];
      const newElements = [...currentExercise.elements];
      
      // Supprimer l'élément de sa position actuelle
      newElements.splice(dragItem.current, 1);
      
      // L'insérer à la nouvelle position
      newElements.splice(dragOverItem.current, 0, draggedElement);
      
      setCurrentExercise({
        ...currentExercise,
        elements: newElements
      });
    }
    
    // Réinitialiser
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
            <div
              key={element.id}
              draggable={isDragging && draggedIndex === index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              className={`
                border-2 rounded-lg p-4 bg-gray-50 transition-all
                ${dragOverIndex === index && draggedIndex !== index ? 'border-blue-400 bg-blue-50 translate-y-1' : 'border-gray-200'}
                ${draggedIndex === index ? 'opacity-50' : 'opacity-100'}
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-700 select-none">
                  {elementTypes.find(et => et.type === element.type)?.icon}{' '}
                  {elementTypes.find(et => et.type === element.type)?.label} #{index + 1}
                </span>
                
                <div className="flex items-center gap-2">
                  {/* Bouton pour glisser */}
                  {currentExercise.elements.length > 1 && (
                    <div
                      onMouseDown={() => {
                        setDraggedIndex(index);
                        setIsDragging(true);
                      }}
                      onMouseUp={() => {
                        setIsDragging(false);
                        setDraggedIndex(null);
                      }}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded cursor-move"
                      title="Glisser pour réorganiser"
                    >
                      <GripVertical size={18} />
                    </div>
                  )}
                  
                  {/* Bouton supprimer */}
                  <button
                    onClick={() => deleteElement(element.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
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