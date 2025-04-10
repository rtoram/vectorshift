// script.js
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
  }
  // Adicionar mais estilos aqui
}

document.getElementById('export').addEventListener('click', function() {
  const svg = document.getElementById('preview').innerHTML;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'converted_vector.svg';
  link.click();
});
