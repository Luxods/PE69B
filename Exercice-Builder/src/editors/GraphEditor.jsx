import React from 'react';

const GraphEditor = ({ content, onUpdate }) => {
  return (
    <div className="space-y-2">
      <p>Fonction :</p>
      <input
        type="text"
        className="w-full p-2 border rounded font-mono"
        value={content.expression}
        onChange={(e) => onUpdate({ ...content, expression: e.target.value })}
        placeholder="a*x^2+b"
      />
      <div className="grid grid-cols-4 gap-1">
        {['xMin', 'xMax', 'yMin', 'yMax'].map(field => (
          <div key={field}>
            <label className="text-xs text-gray-600">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="number"
              step="any"  // Permet les décimales
              className="w-full p-1 border rounded text-sm"
              value={content[field] ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                onUpdate({ 
                  ...content, 
                  [field]: value === '' ? '' : parseFloat(value) 
                });
              }}
              placeholder={field === 'xMin' || field === 'yMin' ? '-10' : '10'}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showGrid !== false}
            onChange={(e) => onUpdate({ ...content, showGrid: e.target.checked })}
          />
          Afficher grille
        </label>
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showAxes !== false}
            onChange={(e) => onUpdate({ ...content, showAxes: e.target.checked })}
          />
          Afficher axes
        </label>
      </div>
    </div>
  );
};

export default GraphEditor;