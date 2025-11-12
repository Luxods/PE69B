import React from 'react';

const EquationEditor = ({ content, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium">Équation (LaTeX)</label>
        <input
          type="text"
          className="w-full p-2 border rounded font-mono text-sm"
          value={content.latex}
          onChange={(e) => onUpdate({ ...content, latex: e.target.value })}
          placeholder="a*x^2 + b*x + c = 0"
        />
      </div>

      <div>
        <label className="text-xs font-medium">Type d'équation</label>
        <select
          className="w-full p-1 border rounded text-sm"
          value={content.type || 'standard'}
          onChange={(e) => onUpdate({ ...content, type: e.target.value })}
        >
          <option value="standard">Standard</option>
          <option value="system">Système</option>
          <option value="differential">Différentielle</option>
          <option value="integral">Intégrale</option>
        </select>
      </div>

      {content.type === 'system' && (
        <div>
          <label className="text-xs font-medium">Équations du système</label>
          <textarea
            className="w-full p-2 border rounded font-mono text-sm"
            rows="3"
            value={content.system || ''}
            onChange={(e) => onUpdate({ ...content, system: e.target.value })}
            placeholder="x + y = a&#10;2x - y = b"
          />
        </div>
      )}

      <div className="flex gap-2">
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showSteps}
            onChange={(e) => onUpdate({ ...content, showSteps: e.target.checked })}
          />
          Afficher les étapes
        </label>
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={content.showSolution}
            onChange={(e) => onUpdate({ ...content, showSolution: e.target.checked })}
          />
          Afficher la solution
        </label>
      </div>
    </div>
  );
};

export default EquationEditor;