import React from 'react';

const SignTableEditor = ({ content, onUpdate }) => {
  const updatePoint = (index, field, value) => {
    const newPoints = [...content.points];
    newPoints[index][field] = value;
    onUpdate({ ...content, points: newPoints });
  };

  const addPoint = () => {
    const newPoints = [...content.points, { x: '', sign: '+' }];
    onUpdate({ ...content, points: newPoints });
  };

  const removePoint = (index) => {
    const newPoints = content.points.filter((_, i) => i !== index);
    onUpdate({ ...content, points: newPoints });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">Points et signes</p>
        <button
          onClick={addPoint}
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          + Point
        </button>
      </div>
      {content.points.map((pt, i) => (
        <div key={i} className="flex gap-1 items-center">
          <input
            className="flex-1 p-1 border rounded text-sm"
            value={pt.x}
            onChange={(e) => updatePoint(i, 'x', e.target.value)}
            placeholder="Valeur de x"
          />
          <select
            className="w-20 p-1 border rounded text-sm"
            value={pt.sign}
            onChange={(e) => updatePoint(i, 'sign', e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="0">0</option>
          </select>
          {content.points.length > 2 && (
            <button
              onClick={() => removePoint(i)}
              className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SignTableEditor;