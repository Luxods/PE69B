import React from 'react';
import TextRenderer from './TextRenderer';
import FunctionRenderer from './FunctionRenderer';
import GraphRenderer from './GraphRenderer';
import VariationTableRenderer from './VariationTableRenderer';
import SignTableRenderer from './SignTableRenderer';
import ProbaTreeRenderer from './ProbaTreeRenderer';
import SequenceRenderer from './SequenceRenderer';
import ComplexPlaneRenderer from './ComplexPlaneRenderer';
import VectorRenderer from './VectorRenderer';
import StatsTableRenderer from './StatsTableRenderer';
import EquationRenderer from './EquationRenderer';
import QuestionRenderer from './QuestionRenderer';
import MCQRenderer from './MCQRenderer';
import DiscreteGraphRenderer from './DiscreteGraphRenderer';


const ElementRenderer = ({ element, generatedValues }) => {
  const { type, content } = element;

  switch(type) {
    case 'text':
      return <TextRenderer content={content} generatedValues={generatedValues} />;
    case 'function':
      return <FunctionRenderer content={content} generatedValues={generatedValues} />;
    case 'graph':
      return <GraphRenderer content={content} generatedValues={generatedValues} />;
    case 'variation_table':
      return <VariationTableRenderer content={content} generatedValues={generatedValues} />;
    case 'sign_table':
      return <SignTableRenderer content={content} generatedValues={generatedValues} />;
    case 'proba_tree':
      return <ProbaTreeRenderer content={content} generatedValues={generatedValues} />;
    case 'sequence':
      return <SequenceRenderer content={content} generatedValues={generatedValues} />;
    case 'discrete_graph':
      return <DiscreteGraphRenderer content={content} generatedValues={generatedValues} />;
    case 'complex_plane':
      return <ComplexPlaneRenderer content={content} generatedValues={generatedValues} />;
    case 'vector':
      return <VectorRenderer content={content} generatedValues={generatedValues} />;
    case 'stats_table':
      return <StatsTableRenderer content={content} generatedValues={generatedValues} />;
    case 'equation':
      return <EquationRenderer content={content} generatedValues={generatedValues} />;
    case 'question':
      return <QuestionRenderer content={content} generatedValues={generatedValues} />;
    case 'mcq':
      return <MCQRenderer content={content} generatedValues={generatedValues} element={element} />;
    default:
      return null;
  }
};

export default ElementRenderer;