import React from 'react';

const ComplexPlaneEditor = ({ content, onUpdate }) => {
  const updatePoint = (index, field, value) => {
    const newPoints = [...content.points];
    newPoints[index][field] = value;
    onUpdate({ ...content, points: newPoints });
  };

  const addPoint = () => {
    const newPoints = [...content.points, { 
      name: `z${content.points.length + 1}`, 
      re: '0', 
      im: '0' 
    }];
    onUpdate({ ...content, points: newPoints });
  };

  const removePoint = (index) => {
    const newPoints = content.points.filter((_, i) => i !== index);
    onUpdate({ ...content, points: newPoints });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">Points complexes</p>
        <button
          onClick={addPoint}
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          + Point
        </button>
      </div>
      
      <div className="space-y-2">
        {content.points.map((pt, i) => (
          <div key={i} className="border border-gray-200 rounded p-2 bg-gray-50">
            <div className="flex gap-1 items-center mb-1">
              <input
                className="w-16 p-1 border rounded text-sm font-bold"
                value={pt.name}
                onChange={(e) => updatePoint(i, 'name', e.target.value)}
                placeholder="z1"
              />
              <span className="text-sm">=</span>
              <input
                className="flex-1 p-1 border rounded text-sm"
                value={pt.re}
                onChange={(e) => updatePoint(i, 're', e.target.value)}
                placeholder="Partie réelle"
              />
              <span className="text-sm">+</span>
              <input
                className="flex-1 p-1 border rounded text-sm"
                value={pt.im}
                onChange={(e) => updatePoint(i, 'im', e.target.value)}
                placeholder="Partie imaginaire"
              />
              <span className="text-sm">i</span>
              {content.points.length > 1 && (
                <button
                  onClick={() => removePoint(i)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium">Afficher</label>
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showGrid !== false}
            onChange={(e) => onUpdate({ ...content, showGrid: e.target.checked })}
          />
          Grille
        </label>
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showLabels !== false}
            onChange={(e) => onUpdate({ ...content, showLabels: e.target.checked })}
          />
          Labels
        </label>
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showModulus}
            onChange={(e) => onUpdate({ ...content, showModulus: e.target.checked })}
          />
          Module
        </label>
      </div>
    </div>
  );
};

export default ComplexPlaneEditor;