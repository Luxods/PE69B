import React from 'react';

const StatsTableEditor = ({ content, onUpdate }) => {
  const updateHeader = (index, value) => {
    const newHeaders = [...content.headers];
    newHeaders[index] = value;
    onUpdate({ ...content, headers: newHeaders });
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const newRows = [...content.rows];
    newRows[rowIndex][colIndex] = value;
    onUpdate({ ...content, rows: newRows });
  };

  const addRow = () => {
    const newRows = [...content.rows, new Array(content.headers.length).fill('')];
    onUpdate({ ...content, rows: newRows });
  };

  const addColumn = () => {
    const newHeaders = [...content.headers, `Col ${content.headers.length + 1}`];
    const newRows = content.rows.map(row => [...row, '']);
    onUpdate({ ...content, headers: newHeaders, rows: newRows });
  };

  const removeRow = (index) => {
    const newRows = content.rows.filter((_, i) => i !== index);
    onUpdate({ ...content, rows: newRows });
  };

  const removeColumn = (index) => {
    const newHeaders = content.headers.filter((_, i) => i !== index);
    const newRows = content.rows.map(row => row.filter((_, i) => i !== index));
    onUpdate({ ...content, headers: newHeaders, rows: newRows });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          onClick={addRow}
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          + Ligne
        </button>
        <button
          onClick={addColumn}
          className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
        >
          + Colonne
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              {content.headers.map((header, i) => (
                <th key={i} className="p-1">
                  <input
                    className="w-full p-1 border rounded text-center font-bold"
                    value={header}
                    onChange={(e) => updateHeader(i, e.target.value)}
                  />
                  {content.headers.length > 1 && (
                    <button
                      onClick={() => removeColumn(i)}
                      className="ml-1 px-1 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="p-1">
                    <input
                      className="w-full p-1 border rounded text-center"
                      value={cell}
                      onChange={(e) => updateCell(i, j, e.target.value)}
                    />
                  </td>
                ))}
                <td>
                  {content.rows.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      className="px-1 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTableEditor;