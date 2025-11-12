import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import ExportModal from './ExportModal';

const Sidebar = ({ exercises, exportJSON, importJSON }) => {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importJSON(file);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">💾 Exercices</h2>
        <div className="flex gap-1">
          {exercises.length > 0 && (
            <button
              onClick={() => setShowExportModal(true)}
              className="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              title="Exporter"
            >
              <Download size={16} />
            </button>
          )}
          <label className="p-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                 title="Importer">
            <Upload size={16} />
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      {/* Liste des exercices... */}
      
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={exportJSON}
        exerciseCount={exercises.length}
      />
    </div>
  );
};