import React from 'react';
import TextEditor from './TextEditor';
import FunctionEditor from './FunctionEditor';
import GraphEditor from './GraphEditor';
import VariationTableEditor from './VariationTableEditor';
import SignTableEditor from './SignTableEditor';
import SequenceEditor from './SequenceEditor';
import ComplexPlaneEditor from './ComplexPlaneEditor';
import VectorEditor from './VectorEditor';
import StatsTableEditor from './StatsTableEditor';
import EquationEditor from './EquationEditor';
import QuestionEditor from './QuestionEditor';
import MCQEditor from './MCQEditor';

const ElementEditor = ({ element, updateElement }) => {
  const { type, content, id } = element;

  const handleUpdate = (updatedContent) => {
    updateElement(id, updatedContent);
  };

  switch(type) {
    case 'text':
      return <TextEditor content={content} onUpdate={handleUpdate} />;
    case 'function':
      return <FunctionEditor content={content} onUpdate={handleUpdate} />;
    case 'graph':
      return <GraphEditor content={content} onUpdate={handleUpdate} />;
    case 'variation_table':
      return <VariationTableEditor content={content} onUpdate={handleUpdate} />;
    case 'sign_table':
      return <SignTableEditor content={content} onUpdate={handleUpdate} />;
    case 'proba_tree':
      return (
        <div className="text-xs">
          <p className="text-gray-600">Arbre 2 niveaux configuré par défaut</p>
          <p className="text-gray-500 mt-1">Modifiez les probabilités dans le code JSON exporté</p>
        </div>
      );
    case 'sequence':
      return <SequenceEditor content={content} onUpdate={handleUpdate} />;
    case 'complex_plane':
      return <ComplexPlaneEditor content={content} onUpdate={handleUpdate} />;
    case 'vector':
      return <VectorEditor content={content} onUpdate={handleUpdate} />;
    case 'stats_table':
      return <StatsTableEditor content={content} onUpdate={handleUpdate} />;
    case 'equation':
      return <EquationEditor content={content} onUpdate={handleUpdate} />;
    case 'question':
      return <QuestionEditor content={content} onUpdate={handleUpdate} />;
    case 'mcq':
      return <MCQEditor content={content} onUpdate={handleUpdate} />;
    default:
      return <p className="text-gray-400">Éditeur non disponible</p>;
  }
};

export default ElementEditor;