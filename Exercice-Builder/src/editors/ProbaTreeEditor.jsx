//PAS

export const ProbaTreeEditor = ({ content, onChange }) => {
  const updateNode = (nodeId, field, value) => {
    const newNodes = content.nodes.map(node =>
      node.id === nodeId ? { ...node, [field]: value } : node
    );
    onChange({ ...content, nodes: newNodes });
  };
  
  const addBranch = () => {
    // Trouver un nœud parent disponible
    const lastLevel = Math.max(...content.nodes.map(n => n.parent || 0));
    const parentNode = content.nodes.find(n => (n.parent || 0) === lastLevel);
    
    if (parentNode) {
      const newNode = {
        id: Math.max(...content.nodes.map(n => n.id)) + 1,
        label: 'Nouveau',
        x: parentNode.x + 150,
        y: parentNode.y + 50,
        parent: parentNode.id,
        proba: '0.5'
      };
      onChange({ ...content, nodes: [...content.nodes, newNode] });
    }
  };
  
  return (
    <div className="proba-tree-editor">
      <label className="editor-label">
        Configuration de l'arbre
        <span className="label-hint">Arbre prédéfini à 2 niveaux</span>
      </label>
      
      <div className="tree-nodes-list">
        {content.nodes.filter(n => !n.isRoot).map((node) => (
          <div key={node.id} className="tree-node-item">
            <div className="node-row">
              <span className="node-id">#{node.id}</span>
              <input
                className="node-input"
                placeholder="Label"
                value={node.label}
                onChange={(e) => updateNode(node.id, 'label', e.target.value)}
              />
              <input
                className="node-input small"
                placeholder="Proba"
                value={node.proba}
                onChange={(e) => updateNode(node.id, 'proba', e.target.value)}
              />
            </div>
            <div className="node-hint">
              Parent: {content.nodes.find(n => n.id === node.parent)?.label || 'Départ'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="editor-hint">
        💡 Modifiez les labels et probabilités. Pour des arbres complexes, éditez le JSON exporté.
      </div>
    </div>
  );
};