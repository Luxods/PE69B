export const generateRandomValues = (variables) => {
  const values = {};
  
  variables.forEach(variable => {
    const range = variable.max - variable.min;
    
    if (variable.type === 'integer') {
      // Générer un entier
      values[variable.name] = Math.floor(Math.random() * (range + 1)) + variable.min;
    } else {
      // Générer un décimal
      const rawValue = Math.random() * range + variable.min;
      const decimals = variable.decimals || 2;
      values[variable.name] = Math.round(rawValue * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }
  });
  
  return values;
};