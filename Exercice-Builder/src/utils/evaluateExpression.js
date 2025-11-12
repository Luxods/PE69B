export const evaluateExpression = (expr, values) => {
  try {
    let evaluated = expr;
    Object.keys(values).forEach(key => {
      evaluated = evaluated.replace(new RegExp(`\\b${key}\\b`, 'g'), values[key]);
    });
    return evaluated;
  } catch (e) {
    return expr;
  }
};