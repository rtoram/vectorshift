// script.js (versão corrigida)
document.getElementById('upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const svgContent = event.target.result;
    const draw = SVG('#preview').size('100%', '100%');
    draw.svg(svgContent);
  };
  reader.readAsText(file);
});

document.querySelectorAll('.style-btn').forEach(button => {
  button.addEventListener('click', function() {
    const style = this.dataset.style;
    applyStyle(style);
  });
});

function applyStyle(style) {
  const svg = SVG('#preview').first();
  if (!svg) return;

  // Exemplo básico de transformação
  if (style === 'flat') {
    svg.fill('#ff007a').stroke({ width: 0 });
  } else if (style === 'cartoon') {
    svg.fill('#ffcc00').stroke({ width: 2, color: '#000' });
  } else if (style === 'isometric') {
    svg.fill('#00d4ff').stroke({ width: 1, color: '#fff' }).transform({ rotate: 30, scale: 0.8 });
  } else if (style === 'retro') {
    svg.fill('#8b4513').stroke({ width: 1, color: '#ffd700' });
  }
}

document.getElementById('export').addEventListener('click', function() {
  const svgElement = SVG('#preview').first();
  if (!svgElement) {
    alert('Por favor, carregue um SVG e aplique um estilo antes de exportar!');
    return;
  }

  // Obtém o SVG como string com a estrutura completa
  const svgData = svgElement.svg(); // Método do SVG.js que gera o SVG completo
  const svgString = `<?xml version="1.0" encoding="UTF-8"?>\n${svgData}`;

  // Cria o Blob com o conteúdo SVG
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  // Cria e dispara o download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'converted_vector.svg'; // Nome do arquivo
  document.body.appendChild(link); // Adiciona ao DOM temporariamente
  link.click();
  document.body.removeChild(link); // Remove após o clique
  URL.revokeObjectURL(url); // Libera a memória
});
