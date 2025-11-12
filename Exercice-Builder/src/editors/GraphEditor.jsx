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
          <input
            key={field}
            type="number"
            placeholder={field}
            className="p-1 border rounded text-sm"
            value={content[field]}
            onChange={(e) => onUpdate({ ...content, [field]: parseFloat(e.target.value) })}
          />
        ))}
      </div>
    </div>
  );
};

export default GraphEditor;