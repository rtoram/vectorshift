document.getElementById('export').addEventListener('click', function() {
  const svgElement = SVG('#preview').first();
  if (!svgElement) {
    alert('Por favor, carregue um SVG e aplique um estilo antes de exportar!');
    return;
  }

  // Obtém o SVG como string com a estrutura completa
  const svgData = svgElement.svg();
  const svgString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg xmlns="http://www.w3.org/2000/svg">${svgData}</svg>`;

  // Cria o Blob com o conteúdo SVG
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);

  // Cria e configura o link de download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'converted_vector.svg'; // Nome fixo para o arquivo
  document.body.appendChild(link);
  link.click(); // Dispara o download
  document.body.removeChild(link); // Remove o link do DOM
  window.URL.revokeObjectURL(url); // Libera a memória
});
