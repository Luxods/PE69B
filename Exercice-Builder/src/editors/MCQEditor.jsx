import React from 'react';

const MCQEditor = ({ content, onUpdate }) => {
  const updateOption = (index, field, value) => {
    const newOpts = [...content.options];
    newOpts[index][field] = value;
    onUpdate({ ...content, options: newOpts });
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={content.question}
        onChange={(e) => onUpdate({ ...content, question: e.target.value })}
        placeholder="Question"
      />
      <div className="text-xs">
        {content.options.map((opt, i) => (
          <div key={i} className="flex gap-1 mb-1">
            <input
              type="checkbox"
              checked={opt.correct}
              onChange={(e) => updateOption(i, 'correct', e.target.checked)}
            />
            <input
              className="flex-1 p-1 border rounded"
              value={opt.text}
              onChange={(e) => updateOption(i, 'text', e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQEditor;