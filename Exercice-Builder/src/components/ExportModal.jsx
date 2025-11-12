import React, { useState } from 'react';
import { Download, X, FileJson, Users, GraduationCap } from 'lucide-react';

const ExportModal = ({ isOpen, onClose, onExport, exerciseCount }) => {
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [prettify, setPrettify] = useState(true);

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(includeAnswers, prettify);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            <FileJson className="inline mr-2" size={24} />
            Exporter les exercices
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              {exerciseCount} exercice{exerciseCount > 1 ? 's' : ''} à exporter
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="export-type"
                checked={includeAnswers}
                onChange={() => setIncludeAnswers(true)}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2 font-medium">
                  <GraduationCap size={18} />
                  Version professeur
                </div>
                <p className="text-sm text-gray-600">
                  Inclut toutes les réponses et corrections
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="export-type"
                checked={!includeAnswers}
                onChange={() => setIncludeAnswers(false)}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2 font-medium">
                  <Users size={18} />
                  Version élève
                </div>
                <p className="text-sm text-gray-600">
                  Sans les réponses (pour distribution)
                </p>
              </div>
            </label>
          </div>

          <div className="border-t pt-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={prettify}
                onChange={(e) => setPrettify(e.target.checked)}
              />
              Format lisible (JSON indenté)
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={handleExport}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Download size={18} />
              Exporter
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;