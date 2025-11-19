import React from 'react';

const GraphEditor = ({ content, onUpdate }) => {
  return (
    <div className="space-y-2">
      <p>Fonction :</p>
      <input
        type="text"
        className="w-full p-2 border rounded font-mono"
        value={content.expression || ''}
        onChange={(e) => onUpdate({ ...content, expression: e.target.value })}
        placeholder="a*x^2+b"
      />
      
      {/* Fenêtrage X toujours visible */}
      <div className="grid grid-cols-2 gap-1">
        <div>
          <label className="text-xs text-gray-600">x Min</label>
          <input
            type="text"  // Changé de "number" à "text"
            className="w-full p-1 border rounded text-sm"
            value={content.xMin ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              // Permettre vide, le signe moins seul, ou un nombre valide
              if (value === '' || value === '-' || !isNaN(parseFloat(value))) {
                onUpdate({ 
                  ...content, 
                  xMin: value === '' || value === '-' ? value : parseFloat(value) 
                });
              }
            }}
            onBlur={(e) => {
              // Si vide ou juste un tiret, mettre la valeur par défaut
              const value = e.target.value;
              if (value === '' || value === '-') {
                onUpdate({ ...content, xMin: -10 });
              }
            }}
            placeholder="-10"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600">x Max</label>
          <input
            type="text"  // Changé de "number" à "text"
            className="w-full p-1 border rounded text-sm"
            value={content.xMax ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || value === '-' || !isNaN(parseFloat(value))) {
                onUpdate({ 
                  ...content, 
                  xMax: value === '' || value === '-' ? value : parseFloat(value) 
                });
              }
            }}
            onBlur={(e) => {
              const value = e.target.value;
              if (value === '' || value === '-') {
                onUpdate({ ...content, xMax: 10 });
              }
            }}
            placeholder="10"
          />
        </div>
      </div>

      {/* Fenêtrage Y - visible seulement si auto_window est désactivé */}
      {!content.auto_window && (
        <div className="grid grid-cols-2 gap-1">
          <div>
            <label className="text-xs text-gray-600">y Min</label>
            <input
              type="text"  // Changé de "number" à "text"
              className="w-full p-1 border rounded text-sm"
              value={content.yMin ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || value === '-' || !isNaN(parseFloat(value))) {
                  onUpdate({ 
                    ...content, 
                    yMin: value === '' || value === '-' ? value : parseFloat(value) 
                  });
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                if (value === '' || value === '-') {
                  onUpdate({ ...content, yMin: -10 });
                }
              }}
              placeholder="-10"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">y Max</label>
            <input
              type="text"  // Changé de "number" à "text"
              className="w-full p-1 border rounded text-sm"
              value={content.yMax ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || value === '-' || !isNaN(parseFloat(value))) {
                  onUpdate({ 
                    ...content, 
                    yMax: value === '' || value === '-' ? value : parseFloat(value) 
                  });
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                if (value === '' || value === '-') {
                  onUpdate({ ...content, yMax: 10 });
                }
              }}
              placeholder="10"
            />
          </div>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
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
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.auto_window || false}
            onChange={(e) => onUpdate({ ...content, auto_window: e.target.checked })}
          />
          Fenêtrage auto Y
        </label>
      </div>
      
      {content.auto_window && (
        <p className="text-xs text-gray-500 italic">
          Les limites Y seront calculées automatiquement selon la fonction
        </p>
      )}
    </div>
  );
};

export default GraphEditor;