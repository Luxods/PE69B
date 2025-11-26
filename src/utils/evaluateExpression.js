export const evaluateExpression = (expression, variables = {}) => {
  // Gestion sûre des types
  if (expression === null || expression === undefined) {
    return '';
  }
  
  // Convertir en string
  let result = typeof expression === 'string' 
    ? expression 
    : expression.toString();
  
  // Remplacer les variables
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    
    let formattedValue;
    if (value === null || value === undefined) {
      formattedValue = '';
    } else if (typeof value === 'number') {
      formattedValue = Number.isInteger(value)
        ? value.toString()
        : parseFloat(value.toFixed(4)).toString();
    } else {
      formattedValue = value.toString();
    }
    
    result = result.replace(regex, formattedValue);
  });
  
  return result;
};