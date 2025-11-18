import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ExportModal from './ExportModal';

const Sidebar = ({ exercises, exportJSON }) => {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">💾 Exercices</h2>
        {exercises.length > 0 && (
          <button
            onClick={() => setShowExportModal(true)}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-1"
            title="Exporter les exercices"
          >
            <Download size={14} />
            Export
          </button>
        )}
      </div>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {exercises.length === 0 ? (
          <p className="text-gray-400 text-center py-8 text-sm">
            Aucun exercice sauvegardé
          </p>
        ) : (
          exercises.map((ex) => (
            <div key={ex.id} className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition">
              <h4 className="font-medium text-gray-800 text-sm">{ex.title}</h4>
              <div className="flex flex-wrap gap-1 mt-2 text-xs">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                  {ex.chapter}
                </span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">
                  {ex.difficulty}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {ex.variables.length > 0 && (
                  <span className="mr-2">🎲 {ex.variables.length} var.</span>
                )}
                <span>📝 {ex.elements.length} élém.</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-900 text-sm mb-2">💡 Guide rapide</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Créez des variables (a, b, c...)</li>
          <li>• Utilisez {'{a}'}, {'{b}'} dans les textes</li>
          <li>• Glissez les éléments pour réorganiser</li>
          <li>• Exportez en JSON (prof ou élève)</li>
        </ul>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-900 text-sm mb-2">💡 Guide Latex</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Fractions: \frac{'{a}'}{'{b}'}</li>
          <li>• Racines: \sqrt{'{x}'} ou \sqrt[n]{'{x}'}</li>
          <li>• Puissances: x^{'{2}'} ou x^{'{n}'}</li>
          <li>• Indices: x_{'{i}'} ou x_{'{n}'}</li>
          <li>• Somme: \sum_{'{i=1}'}^{'{n}'}</li>
          <li>• Intégrale: \int_{'{a}'}^{'{b}'}</li>
          <li>• Limites: \lim_{'{x \to \infty}'}</li>
          <li>• Dérivée: \frac{'{d}'}{'{dx}'}</li>
          <li>• Vecteurs: \vec{'{v}'}</li>
          <li>• Ensembles: \mathbb{'{R}'}, \mathbb{'{N}'}, \mathbb{'{Z}'}</li>
          <li>• Grec: \alpha, \beta, \gamma, \pi, \Delta</li>
          <li>• Symboles: \leq, \geq, \neq, \approx, \pm, \infty</li> 
        </ul>
      </div>
      
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={exportJSON}
        exerciseCount={exercises.length}
      />
    </div>
  );
};

export default Sidebar;