document.getElementById('export').addEventListener('click', function() {
  const svgElement = SVG('#preview').first();
  if (!svgElement) {
    alert('Por favor, carregue um SVG e aplique um estilo antes de exportar!');
    return;
  }

  // Obtém o SVG como string completa
  const svgData = svgElement.svg();
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg">${svgData}</svg>`;

  // Cria um Blob com o SVG
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);

  // Força o download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'converted_vector.svg');
  link.style.display = 'none'; // Esconde o link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  // Feedback ao usuário
  console.log('Download disparado para converted_vector.svg');
});
