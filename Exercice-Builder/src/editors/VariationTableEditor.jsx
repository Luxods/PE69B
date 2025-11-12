import React from 'react';

const VariationTableEditor = ({ content, onUpdate }) => {
  const updatePoint = (index, field, value) => {
    const newPoints = [...content.points];
    newPoints[index][field] = value;
    onUpdate({ ...content, points: newPoints });
  };

  return (
    <div className="text-xs">
      <p className="mb-2">Points de variation (x, valeur, variation)</p>
      {content.points.map((pt, i) => (
        <div key={i} className="flex gap-1 mb-1">
          <input
            className="flex-1 p-1 border rounded"
            value={pt.x}
            onChange={(e) => updatePoint(i, 'x', e.target.value)}
            placeholder="x"
          />
          <input
            className="flex-1 p-1 border rounded"
            value={pt.value}
            onChange={(e) => updatePoint(i, 'value', e.target.value)}
            placeholder="f(x)"
          />
          <select
            className="flex-1 p-1 border rounded"
            value={pt.variation}
            onChange={(e) => updatePoint(i, 'variation', e.target.value)}
          >
            <option value="">-</option>
            <option value="croissante">↗</option>
            <option value="décroissante">↘</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default VariationTableEditor;