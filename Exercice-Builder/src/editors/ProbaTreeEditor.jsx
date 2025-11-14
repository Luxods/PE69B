export const ProbaTreeEditor = ({ content, onChange }) => {
  const updateNode = (nodeId, field, value) => {
    const newNodes = content.nodes.map(node =>
      node.id === nodeId ? { ...node, [field]: value } : node
    );
    onChange({ ...content, nodes: newNodes });
  };
  
  const deleteNode = (nodeId) => {
    // Supprimer le nœud et tous ses enfants récursivement
    const nodesToDelete = new Set([nodeId]);
    let hasChanges = true;
    
    while (hasChanges) {
      hasChanges = false;
      content.nodes.forEach(node => {
        if (node.parent && nodesToDelete.has(node.parent) && !nodesToDelete.has(node.id)) {
          nodesToDelete.add(node.id);
          hasChanges = true;
        }
      });
    }
    
    const newNodes = content.nodes.filter(node => !nodesToDelete.has(node.id));
    onChange({ ...content, nodes: newNodes });
  };
  
  const addChild = (parentId) => {
    const parent = content.nodes.find(n => n.id === parentId);
    if (!parent) return;
    
    // Compter les enfants existants pour positionner le nouveau
    const siblings = content.nodes.filter(n => n.parent === parentId);
    const newId = Math.max(...content.nodes.map(n => n.id), 0) + 1;
    
    const newNode = {
      id: newId,
      label: 'Nouveau',
      x: parent.x + 150,
      y: parent.y + (siblings.length * 80) - 40,
      parent: parentId,
      proba: '0.5'
    };
    
    onChange({ ...content, nodes: [...content.nodes, newNode] });
  };
  
  const resetTree = () => {
    const defaultTree = {
      nodes: [
        { id: 0, label: 'Départ', x: 50, y: 150, isRoot: true }
      ]
    };
    onChange(defaultTree);
  };
  
  // Organiser les nœuds par niveau
  const nodesByLevel = {};
  content.nodes.forEach(node => {
    let level = 0;
    let current = node;
    while (current.parent !== undefined) {
      level++;
      current = content.nodes.find(n => n.id === current.parent);
      if (!current) break;
    }
    if (!nodesByLevel[level]) nodesByLevel[level] = [];
    nodesByLevel[level].push(node);
  });
  
  return (
    <div className="proba-tree-editor">
      <div className="flex items-center justify-between mb-3">
        <label className="editor-label">
          Configuration de l'arbre
          <span className="label-hint">Construisez votre arbre niveau par niveau</span>
        </label>
        <button
          onClick={resetTree}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Réinitialiser
        </button>
      </div>
      
      <div className="tree-levels-container space-y-4">
        {Object.keys(nodesByLevel).sort((a, b) => parseInt(a) - parseInt(b)).map(level => (
          <div key={level} className="tree-level">
            <div className="level-header">
              <span className="font-bold text-purple-700">
                {level === '0' ? '🌳 Racine' : `Niveau ${level}`}
              </span>
              <span className="text-sm text-gray-500">
                {nodesByLevel[level].length} nœud(s)
              </span>
            </div>
            
            <div className="tree-nodes-list space-y-2">
              {nodesByLevel[level].map((node) => (
                <div key={node.id} className="tree-node-item border-2 border-purple-200 rounded-lg p-3 bg-white">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono bg-purple-100 px-2 py-1 rounded">
                          #{node.id}
                        </span>
                        <input
                          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-purple-300"
                          placeholder="Label du nœud"
                          value={node.label}
                          onChange={(e) => updateNode(node.id, 'label', e.target.value)}
                          disabled={node.isRoot}
                        />
                        {!node.isRoot && (
                          <input
                            className="w-24 p-2 border rounded focus:ring-2 focus:ring-purple-300"
                            placeholder="Proba"
                            value={node.proba}
                            onChange={(e) => updateNode(node.id, 'proba', e.target.value)}
                          />
                        )}
                      </div>
                      
                      {node.parent !== undefined && (
                        <div className="text-xs text-gray-500 ml-2">
                          ↳ Parent: <span className="font-medium">
                            {content.nodes.find(n => n.id === node.parent)?.label || '?'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => addChild(node.id)}
                        className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs font-medium"
                        title="Ajouter un enfant"
                      >
                        + Enfant
                      </button>
                      {!node.isRoot && (
                        <button
                          onClick={() => deleteNode(node.id)}
                          className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-medium"
                          title="Supprimer ce nœud"
                        >
                          🗑️ Suppr.
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {content.nodes.length === 1 && (
        <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
          <p className="text-blue-800 font-medium">
            🌱 Commencez par ajouter des enfants au nœud racine "Départ"
          </p>
        </div>
      )}
      
      <div className="editor-hint mt-4">
        💡 Cliquez sur "+ Enfant" pour créer une branche. Les nœuds enfants héritent automatiquement de leur position.
      </div>
    </div>
  );
};