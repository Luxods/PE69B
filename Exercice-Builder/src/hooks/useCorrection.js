import { useState, useCallback } from 'react';
import { evaluateExpression } from '../utils/evaluateExpression';

export const useCorrection = (exercise, generatedValues) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [corrections, setCorrections] = useState({});
  const [score, setScore] = useState(null);
  const [showCorrection, setShowCorrection] = useState(false);

  // Mettre à jour une réponse utilisateur
  const updateAnswer = useCallback((elementId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [elementId]: answer
    }));
  }, []);

  // Corriger une réponse numérique
  const correctNumericAnswer = (userAnswer, expectedAnswer, tolerance = 0.01) => {
    const user = parseFloat(userAnswer);
    const expected = parseFloat(evaluateExpression(expectedAnswer, generatedValues));
    
    if (isNaN(user) || isNaN(expected)) return false;
    
    return Math.abs(user - expected) <= tolerance;
  };

  // Corriger une expression mathématique
  const correctExpressionAnswer = (userAnswer, expectedAnswer) => {
    try {
      // Simplifier et comparer les expressions
      const user = userAnswer.replace(/\s/g, '').toLowerCase();
      const expected = evaluateExpression(expectedAnswer, generatedValues)
        .replace(/\s/g, '')
        .toLowerCase();
      
      return user === expected;
    } catch {
      return false;
    }
  };

  // Corriger un QCM
  const correctMCQAnswer = (selectedOptions, correctOptions) => {
    if (!Array.isArray(selectedOptions)) {
      selectedOptions = [selectedOptions];
    }
    
    return selectedOptions.every(opt => correctOptions.includes(opt)) &&
           correctOptions.every(opt => selectedOptions.includes(opt));
  };

  // Corriger un intervalle
  const correctIntervalAnswer = (userInterval, expectedMin, expectedMax, tolerance = 0.01) => {
    if (!userInterval || !userInterval.min || !userInterval.max) return false;
    
    const userMin = parseFloat(userInterval.min);
    const userMax = parseFloat(userInterval.max);
    const expMin = parseFloat(evaluateExpression(expectedMin, generatedValues));
    const expMax = parseFloat(evaluateExpression(expectedMax, generatedValues));
    
    return Math.abs(userMin - expMin) <= tolerance && 
           Math.abs(userMax - expMax) <= tolerance;
  };

  // Corriger tout l'exercice
  const submitExercise = useCallback(() => {
    if (!exercise || !exercise.elements) return;

    const newCorrections = {};
    let totalPoints = 0;
    let earnedPoints = 0;

    exercise.elements.forEach(element => {
      if (element.type === 'question') {
        const points = element.content.points || 1;
        totalPoints += points;

        const userAnswer = userAnswers[element.id];
        const expectedAnswer = element.content.answer;
        let isCorrect = false;
        let feedback = '';

        switch (element.content.answerType) {
          case 'numeric':
            isCorrect = correctNumericAnswer(
              userAnswer, 
              expectedAnswer, 
              element.content.tolerance
            );
            feedback = isCorrect ? 
              '✅ Correct !' : 
              `❌ Incorrect. La réponse attendue était ${evaluateExpression(expectedAnswer, generatedValues)}`;
            break;

          case 'expression':
            isCorrect = correctExpressionAnswer(userAnswer, expectedAnswer);
            feedback = isCorrect ? 
              '✅ Correct !' : 
              `❌ Incorrect. La réponse attendue était ${evaluateExpression(expectedAnswer, generatedValues)}`;
            break;

          case 'text':
            isCorrect = userAnswer?.toLowerCase().trim() === 
                       expectedAnswer?.toLowerCase().trim();
            feedback = isCorrect ? 
              '✅ Correct !' : 
              `❌ Incorrect. La réponse attendue était "${expectedAnswer}"`;
            break;

          case 'interval':
            isCorrect = correctIntervalAnswer(
              userAnswer,
              element.content.lowerBound,
              element.content.upperBound,
              element.content.tolerance
            );
            feedback = isCorrect ? 
              '✅ Correct !' : 
              `❌ Incorrect. L'intervalle attendu était [${evaluateExpression(element.content.lowerBound, generatedValues)}, ${evaluateExpression(element.content.upperBound, generatedValues)}]`;
            break;

          case 'multiple':
            // Pour les réponses multiples
            const answers = userAnswer ? userAnswer.split(',').map(a => a.trim()) : [];
            const expected = expectedAnswer.split(',').map(a => a.trim());
            isCorrect = answers.length === expected.length &&
                       answers.every(a => expected.includes(a));
            feedback = isCorrect ? 
              '✅ Correct !' : 
              `❌ Incorrect. Les réponses attendues étaient : ${expected.join(', ')}`;
            break;

          default:
            break;
        }

        if (isCorrect) {
          earnedPoints += points;
        }

        newCorrections[element.id] = {
          isCorrect,
          feedback,
          points,
          earnedPoints: isCorrect ? points : 0,
          userAnswer,
          expectedAnswer: evaluateExpression(expectedAnswer, generatedValues)
        };

      } else if (element.type === 'mcq') {
        const points = element.content.points || 1;
        totalPoints += points;

        const userAnswer = userAnswers[element.id];
        const correctIndices = element.content.options
          .map((opt, i) => opt.correct ? i : null)
          .filter(i => i !== null);

        const isCorrect = correctMCQAnswer(userAnswer, correctIndices);
        
        if (isCorrect) {
          earnedPoints += points;
        }

        const correctAnswers = element.content.options
          .filter(opt => opt.correct)
          .map(opt => opt.text);

        newCorrections[element.id] = {
          isCorrect,
          feedback: isCorrect ? 
            '✅ Bonne réponse !' : 
            `❌ Incorrect. La/les bonne(s) réponse(s) : ${correctAnswers.join(', ')}`,
          points,
          earnedPoints: isCorrect ? points : 0,
          userAnswer,
          expectedAnswer: correctIndices
        };
      }
    });

    setCorrections(newCorrections);
    setScore({
      earned: earnedPoints,
      total: totalPoints,
      percentage: totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
    });
    setIsSubmitted(true);
    setShowCorrection(true);
  }, [exercise, userAnswers, generatedValues]);

  // Réinitialiser
  const resetExercise = useCallback(() => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCorrections({});
    setScore(null);
    setShowCorrection(false);
  }, []);

  return {
    userAnswers,
    updateAnswer,
    submitExercise,
    resetExercise,
    corrections,
    score,
    isSubmitted,
    showCorrection,
    setShowCorrection
  };
};