import React from 'react';

const SequenceEditor = ({ content, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium">Type de suite</label>
        <select
          className="w-full p-1 border rounded text-sm"
          value={content.type}
          onChange={(e) => onUpdate({ ...content, type: e.target.value })}
        >
          <option value="explicit">Explicite</option>
          <option value="recursive">Récurrente</option>
          <option value="arithmetic">Arithmétique</option>
          <option value="geometric">Géométrique</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-medium">Formule</label>
        <input
          type="text"
          className="w-full p-2 border rounded font-mono text-sm"
          value={content.formula}
          onChange={(e) => onUpdate({ ...content, formula: e.target.value })}
          placeholder="U_n = a*n + b"
        />
      </div>

      <div>
        <label className="text-xs font-medium">Premier terme (u₀)</label>
        <input
          type="text"
          className="w-full p-1 border rounded text-sm"
          value={content.u0}
          onChange={(e) => onUpdate({ ...content, u0: e.target.value })}
          placeholder="Valeur de u₀"
        />
      </div>

      {content.type === 'recursive' && (
        <div>
          <label className="text-xs font-medium">Relation de récurrence</label>
          <input
            type="text"
            className="w-full p-1 border rounded font-mono text-sm"
            value={content.relation}
            onChange={(e) => onUpdate({ ...content, relation: e.target.value })}
            placeholder="U_(n+1) = 2*U_n + 3"
          />
        </div>
      )}

      {(content.type === 'arithmetic' || content.type === 'geometric') && (
        <div>
          <label className="text-xs font-medium">
            {content.type === 'arithmetic' ? 'Raison' : 'Raison q'}
          </label>
          <input
            type="text"
            className="w-full p-1 border rounded text-sm"
            value={content.reason || ''}
            onChange={(e) => onUpdate({ ...content, reason: e.target.value })}
            placeholder={content.type === 'arithmetic' ? 'r = 2' : 'q = 3'}
          />
        </div>
      )}
    </div>
  );
};

export default SequenceEditor;