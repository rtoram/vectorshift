document.getElementById('export').addEventListener('click', function() {
  const svgElement = SVG('#preview').first();
  if (!svgElement) {
    alert('Por favor, carregue um SVG e aplique um estilo antes de exportar!');
    return;
  }

  // Obtém o SVG como string com estrutura completa
  const svgData = svgElement.svg();
  const svgString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">${svgData}</svg>`;

  // Cria o Blob com o conteúdo SVG
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);

  // Cria e configura o link de download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'converted_vector.svg'; // Nome do arquivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  // Confirmação para o usuário
  alert('Download iniciado! Verifique sua pasta de downloads ou área de trabalho.');
});
