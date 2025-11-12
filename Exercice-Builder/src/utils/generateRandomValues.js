export const generateRandomValues = (variables) => {
  const values = {};
  variables.forEach(v => {
    if (v.type === 'integer') {
      values[v.name] = Math.floor(Math.random() * (v.max - v.min + 1)) + v.min;
    } else if (v.type === 'decimal') {
      values[v.name] = (Math.random() * (v.max - v.min) + v.min).toFixed(v.decimals || 2);
    } else if (v.type === 'choice') {
      values[v.name] = v.choices[Math.floor(Math.random() * v.choices.length)];
    }
  });
  return values;
};