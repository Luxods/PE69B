// Charger les exercices
async function loadExercises() {
  const response = await fetch('/data/exercices.json');
  return await response.json();
}

// Générer des valeurs aléatoires
function generateValues(variables) {
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
}

// Remplacer les variables dans le texte
function replaceVariables(text, values) {
  let result = text;
  Object.keys(values).forEach(key => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), values[key]);
  });
  return result;
}

// Afficher un exercice
function renderExercise(exercise, containerId) {
  const container = document.getElementById(containerId);
  const values = generateValues(exercise.variables);
  
  let html = `
    <div class="exercise">
      <h2>${exercise.title}</h2>
      <div class="meta">
        <span class="badge">${exercise.chapter}</span>
        <span class="badge">${exercise.difficulty}</span>
      </div>
  `;
  
  exercise.elements.forEach(element => {
    html += renderElement(element, values);
  });
  
  html += `</div>`;
  container.innerHTML = html;
}

// Rendu par type d'élément
function renderElement(element, values) {
  switch(element.type) {
    case 'text':
      return `<p>${replaceVariables(element.content.text, values)}</p>`;
    
    case 'function':
      return `<div class="function-box">
        f(x) = ${replaceVariables(element.content.expression, values)}
      </div>`;
    
    case 'question':
      return `<div class="question">
        <p><strong>❓ ${replaceVariables(element.content.question, values)}</strong></p>
        <input type="text" placeholder="Votre réponse" class="answer-input">
      </div>`;
    
    // Ajouter d'autres types selon tes besoins
    
    default:
      return '';
  }
}