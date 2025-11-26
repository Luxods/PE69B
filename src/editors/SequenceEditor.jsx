import React from 'react';

const SequenceEditor = ({ content, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium">Type de suite</label>
        <select
          className="w-full p-1 border rounded text-sm"
          value={content.type || 'explicit'}
          onChange={(e) => onUpdate({ ...content, type: e.target.value })}
        >
          <option value="explicit">Explicite (formule directe)</option>
          <option value="recursive">Récurrente (U_n+1 = f(U_n))</option>
          <option value="arithmetic">Arithmétique (raison r)</option>
          <option value="geometric">Géométrique (raison q)</option>
        </select>
      </div>

      {/* FORMULE EXPLICITE - seulement si type = explicit */}
      {content.type === 'explicit' && (
        <div>
          <label className="text-xs font-medium">Formule explicite</label>
          <input
            type="text"
            className="w-full p-2 border rounded font-mono text-sm"
            value={content.formula || ''}
            onChange={(e) => onUpdate({ ...content, formula: e.target.value })}
            placeholder="Ex: U_n = 2*n + 1"
          />
        </div>
      )}

      {/* RELATION DE RÉCURRENCE - seulement si type = recursive */}
      {content.type === 'recursive' && (
        <div>
          <label className="text-xs font-medium">Relation de récurrence</label>
          <input
            type="text"
            className="w-full p-2 border rounded font-mono text-sm"
            value={content.relation || ''}
            onChange={(e) => onUpdate({ ...content, relation: e.target.value })}
            placeholder="Ex: U_n+1 = 2*U_n + 3"
          />
        </div>
      )}

      {/* RAISON - pour arithmétique et géométrique */}
      {(content.type === 'arithmetic' || content.type === 'geometric') && (
        <div>
          <label className="text-xs font-medium">
            {content.type === 'arithmetic' ? 'Raison r' : 'Raison q'}
          </label>
          <input
            type="text"
            className="w-full p-1 border rounded text-sm"
            value={content.reason || ''}
            onChange={(e) => onUpdate({ ...content, reason: e.target.value })}
            placeholder={content.type === 'arithmetic' ? 'Ex: 3' : 'Ex: 2'}
          />
          <p className="text-xs text-gray-600 mt-1">
            {content.type === 'arithmetic' 
              ? `Formule : U_n = U_0 + n × r`
              : `Formule : U_n = U_0 × q^n`
            }
          </p>
        </div>
      )}

      {/* PREMIER TERME U₀ - toujours affiché */}
      <div>
        <label className="text-xs font-medium">Premier terme U₀</label>
        <input
          type="text"
          className="w-full p-1 border rounded text-sm"
          value={content.u0 || ''}
          onChange={(e) => onUpdate({ ...content, u0: e.target.value })}
          placeholder="Ex: 1"
        />
      </div>

      {/* Option pour afficher les premiers termes */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showTerms"
          checked={content.showTerms || false}
          onChange={(e) => onUpdate({ ...content, showTerms: e.target.checked })}
        />
        <label htmlFor="showTerms" className="text-xs">
          Afficher les premiers termes calculés
        </label>
      </div>

      {/* Nombre de termes à afficher */}
      {content.showTerms && (
        <div>
          <label className="text-xs font-medium">Nombre de termes à afficher</label>
          <input
            type="number"
            className="w-20 p-1 border rounded text-sm"
            value={content.termsCount || 5}
            min="2"
            max="10"
            onChange={(e) => onUpdate({ ...content, termsCount: parseInt(e.target.value) })}
          />
        </div>
      )}
    </div>
  );
};

export default SequenceEditor;