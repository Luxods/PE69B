import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const VariationTableEditor = ({ content, onUpdate }) => {
  // Structure par défaut
  const ensureValidContent = () => {
    if (!content.points || content.points.length === 0) {
      return {
        ...content,
        points: [
          { x: '-∞', value: '', variation: 'croissante' },
          { x: '0', value: 'a', variation: 'décroissante' },
          { x: '+∞', value: '' }
        ]
      };
    }
    return content;
  };

  const validContent = ensureValidContent();

  const updatePoint = (index, field, value) => {
    const newPoints = [...validContent.points];
    newPoints[index][field] = value;
    onUpdate({ ...validContent, points: newPoints });
  };

  const addPoint = () => {
    const newPoints = [...validContent.points];
    // Insérer avant le dernier point (+∞)
    const insertIndex = newPoints.length - 1;
    newPoints.splice(insertIndex, 0, {
      x: '1',
      value: '',
      variation: 'croissante'
    });
    onUpdate({ ...validContent, points: newPoints });
  };

  const removePoint = (index) => {
    // Garder au minimum 2 points (début et fin)
    if (validContent.points.length <= 2) return;
    
    const newPoints = validContent.points.filter((_, i) => i !== index);
    onUpdate({ ...validContent, points: newPoints });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Points et variations</p>
        <button
          onClick={addPoint}
          className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          <Plus size={14} />
          Point
        </button>
      </div>

      <div className="space-y-2">
        {validContent.points.map((point, i) => (
          <div key={i} className="p-2 border border-gray-200 rounded bg-gray-50">
            <div className="flex gap-2 items-center mb-2">
              <input
                className="w-20 p-1 border rounded text-sm"
                value={point.x}
                onChange={(e) => updatePoint(i, 'x', e.target.value)}
                placeholder="x"
              />
              <span className="text-sm">=</span>
              <input
                className="w-20 p-1 border rounded text-sm"
                value={point.value}
                onChange={(e) => updatePoint(i, 'value', e.target.value)}
                placeholder="f(x)"
              />
              
              {/* Variation APRÈS ce point (sauf pour le dernier) */}
              {i < validContent.points.length - 1 && (
                <>
                  <span className="text-sm ml-2">→</span>
                  <select
                    className="p-1 border rounded text-sm"
                    value={point.variation}
                    onChange={(e) => updatePoint(i, 'variation', e.target.value)}
                  >
                    <option value="">Sans variation</option>
                    <option value="croissante">↗ Croissante</option>
                    <option value="décroissante">↘ Décroissante</option>
                    <option value="constante">→ Constante</option>
                  </select>
                </>
              )}
              
              {/* Bouton supprimer (sauf pour premier et dernier) */}
              {i > 0 && i < validContent.points.length - 1 && (
                <button
                  onClick={() => removePoint(i)}
                  className="ml-auto px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
        💡 Conseil : Copiez ce texte pour infini ∞
      </div>
    </div>
  );
};

export default VariationTableEditor;