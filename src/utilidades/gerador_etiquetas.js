const gerarEtiqueta = async (qtdeLetras = 5, qtdeNumeros = 5) =>{
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  
  let etiqueta = '';

  // Gera 5 letras
  for (let i = 0; i < qtdeLetras; i++) {
      etiqueta += letras.charAt(Math.floor(Math.random() * letras.length));
  }

  // Gera 5 números
  for (let i = 0; i < qtdeNumeros; i++) {
      etiqueta += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }

  return etiqueta;
}

module.exports = gerarEtiqueta