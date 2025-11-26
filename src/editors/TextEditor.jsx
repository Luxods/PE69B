import React from 'react';

const TextEditor = ({ content, onUpdate }) => {
  return (
    <textarea
      className="w-full p-2 border-2 border-gray-300 rounded-lg font-mono text-sm"
      rows="2"
      value={content.text}
      onChange={(e) => onUpdate({ ...content, text: e.target.value })}
      placeholder="Énoncé de l'exercice. Utilisez {a}, {b}... pour les variables."
    />
  );
};

export default TextEditor;