export const generateRandomValues = (variables) => {
  const values = {};
  
  variables.forEach(variable => {
    if (!variable.name) return;
    
    switch (variable.type) {
      case 'integer': {
        const min = variable.min ?? 1;
        const max = variable.max ?? 10;
        values[variable.name] = Math.floor(Math.random() * (max - min + 1)) + min;
        break;
      }
      
      case 'decimal': {
        const min = variable.min ?? 0;
        const max = variable.max ?? 10;
        const decimals = variable.decimals ?? 2;
        const rawValue = Math.random() * (max - min) + min;
        values[variable.name] = parseFloat(rawValue.toFixed(decimals));
        break;
      }
      
      case 'choice':
      case 'math': {
        // Pour les choix, on sélectionne aléatoirement une valeur
        const choices = variable.choices || [];
        if (choices.length > 0) {
          const randomIndex = Math.floor(Math.random() * choices.length);
          values[variable.name] = choices[randomIndex];
        } else {
          values[variable.name] = ''; // Valeur par défaut si pas de choix
        }
        break;
      }
      
      default:
        values[variable.name] = '';
    }
  });
  
  return values;
};