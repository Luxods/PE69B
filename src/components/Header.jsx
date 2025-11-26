import React from 'react';
import { Eye, Code, RefreshCw } from 'lucide-react';

const Header = ({ previewMode, setPreviewMode, hasVariables, onRegenerate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            🎓 Moteur d'Exercices - NovLearn
          </h1>
          <p className="text-gray-600">
            Créez des exercices avec des variables aléatoires pour un contenu illimité !
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {previewMode ? <Code size={18} /> : <Eye size={18} />}
            {previewMode ? 'Éditer' : 'Aperçu'}
          </button>
          {previewMode && hasVariables && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <RefreshCw size={18} />
              Régénérer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;