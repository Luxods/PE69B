import React from 'react';

const FunctionEditor = ({ content, onUpdate }) => {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-xs font-medium">Expression</label>
        <input
          type="text"
          className="w-full p-2 border rounded font-mono"
          value={content.expression}
          onChange={(e) => onUpdate({ ...content, expression: e.target.value })}
          placeholder="a*sin(x)+b"
        />
      </div>
      <div>
        <label className="text-xs font-medium">Domaine</label>
        <input
          type="text"
          className="w-full p-1 border rounded text-sm"
          value={content.domain}
          onChange={(e) => onUpdate({ ...content, domain: e.target.value })}
        />
      </div>
    </div>
  );
};

export default FunctionEditor;