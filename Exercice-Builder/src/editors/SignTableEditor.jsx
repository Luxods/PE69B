import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const SignTableEditor = ({ content, onUpdate }) => {
  // Structure par défaut
  const ensureValidContent = () => {
    if (!content.points || content.points.length === 0) {
      return {
        ...content,
        points: [
          { x: '-∞', sign: '-' },
          { x: '0', isZero: true, sign: '+' },
          { x: '+∞' }
        ]
      };
    }
    return content;
  };

  const validContent = ensureValidContent();

  const updatePoint = (index, field, value) => {
    const newPoints = [...validContent.points];
    if (field === 'isZero' || field === 'isForbidden') {
      // Reset autres types si on change le type
      newPoints[index] = {
        ...newPoints[index],
        isZero: false,
        isForbidden: false,
        [field]: value
      };
    } else {
      newPoints[index][field] = value;
    }
    onUpdate({ ...validContent, points: newPoints });
  };

  const addPoint = () => {
    const newPoints = [...validContent.points];
    // Insérer avant le dernier point
    const insertIndex = newPoints.length - 1;
    newPoints.splice(insertIndex, 0, {
      x: '1',
      isZero: true,
      sign: newPoints[insertIndex - 1]?.sign === '+' ? '-' : '+'
    });
    onUpdate({ ...validContent, points: newPoints });
  };

  const removePoint = (index) => {
    if (validContent.points.length <= 2) return;
    
    const newPoints = validContent.points.filter((_, i) => i !== index);
    onUpdate({ ...validContent, points: newPoints });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Points et signes</p>
        <button
          onClick={addPoint}
          className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
        >
          <Plus size={14} />
          Point
        </button>
      </div>

      <div className="space-y-2">
        {validContent.points.map((point, i) => (
          <div key={i} className="p-2 border border-gray-200 rounded bg-gray-50">
            <div className="flex gap-2 items-center">
              <span className="text-sm">x =</span>
              <input
                className="w-20 p-1 border rounded text-sm"
                value={point.x}
                onChange={(e) => updatePoint(i, 'x', e.target.value)}
                placeholder="x"
              />
              
              {/* Type de point */}
              {i > 0 && i < validContent.points.length - 1 && (
                <select
                  className="p-1 border rounded text-sm"
                  value={
                    point.isZero ? 'zero' : 
                    point.isForbidden ? 'forbidden' : 
                    'normal'
                  }
                  onChange={(e) => {
                    if (e.target.value === 'zero') {
                      updatePoint(i, 'isZero', true);
                    } else if (e.target.value === 'forbidden') {
                      updatePoint(i, 'isForbidden', true);
                    } else {
                      updatePoint(i, 'isZero', false);
                      updatePoint(i, 'isForbidden', false);
                    }
                  }}
                >
                  <option value="normal">Point normal</option>
                  <option value="zero">Zéro (0)</option>
                  <option value="forbidden">Valeur interdite (||)</option>
                </select>
              )}
              
              {/* Signe APRÈS ce point */}
              {i < validContent.points.length - 1 && (
                <>
                  <span className="text-sm ml-2">→ signe :</span>
                  <select
                    className="p-1 border rounded text-sm"
                    value={point.sign || '+'}
                    onChange={(e) => updatePoint(i, 'sign', e.target.value)}
                  >
                    <option value="+">+ Positif</option>
                    <option value="-">− Négatif</option>
                  </select>
                </>
              )}
              
              {/* Supprimer */}
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

      <div className="text-xs text-gray-600 bg-yellow-50 p-2 rounded">
        💡 Conseil : Copiez ce texte pour infini ∞
      </div>
    </div>
  );
};

export default SignTableEditor;