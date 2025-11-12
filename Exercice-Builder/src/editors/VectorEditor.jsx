import React from 'react';

const VectorEditor = ({ content, onUpdate }) => {
  const updateVector = (index, field, value) => {
    const newVectors = [...content.vectors];
    newVectors[index][field] = value;
    onUpdate({ ...content, vectors: newVectors });
  };

  const addVector = () => {
    const newVectors = [...content.vectors, { 
      name: `v${content.vectors.length + 1}`, 
      x: '0', 
      y: '0', 
      z: content.dimension === '3D' ? '0' : '' 
    }];
    onUpdate({ ...content, vectors: newVectors });
  };

  const removeVector = (index) => {
    const newVectors = content.vectors.filter((_, i) => i !== index);
    onUpdate({ ...content, vectors: newVectors });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <label className="text-xs font-medium">Dimension</label>
        <select
          className="p-1 border rounded text-sm"
          value={content.dimension || '2D'}
          onChange={(e) => onUpdate({ ...content, dimension: e.target.value })}
        >
          <option value="2D">2D</option>
          <option value="3D">3D</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Vecteurs</p>
        <button
          onClick={addVector}
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          + Vecteur
        </button>
      </div>

      <div className="space-y-2">
        {content.vectors.map((v, i) => (
          <div key={i} className="border border-gray-200 rounded p-2 bg-gray-50">
            <div className="flex gap-1 items-center">
              <input
                className="w-14 p-1 border rounded text-sm font-bold"
                value={v.name}
                onChange={(e) => updateVector(i, 'name', e.target.value)}
                placeholder="u"
              />
              <span className="text-sm">=</span>
              <span className="text-sm">(</span>
              <input
                className="flex-1 p-1 border rounded text-sm"
                value={v.x}
                onChange={(e) => updateVector(i, 'x', e.target.value)}
                placeholder="x"
              />
              <span className="text-sm">;</span>
              <input
                className="flex-1 p-1 border rounded text-sm"
                value={v.y}
                onChange={(e) => updateVector(i, 'y', e.target.value)}
                placeholder="y"
              />
              {content.dimension === '3D' && (
                <>
                  <span className="text-sm">;</span>
                  <input
                    className="flex-1 p-1 border rounded text-sm"
                    value={v.z || '0'}
                    onChange={(e) => updateVector(i, 'z', e.target.value)}
                    placeholder="z"
                  />
                </>
              )}
              <span className="text-sm">)</span>
              {content.vectors.length > 1 && (
                <button
                  onClick={() => removeVector(i)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <label className="text-xs font-medium">Options</label>
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showNorm}
            onChange={(e) => onUpdate({ ...content, showNorm: e.target.checked })}
          />
          Afficher norme
        </label>
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showCoordinates}
            onChange={(e) => onUpdate({ ...content, showCoordinates: e.target.checked })}
          />
          Coordonnées
        </label>
      </div>
    </div>
  );
};

export default VectorEditor;