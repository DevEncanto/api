const calcularDatas = (dataInicial, dias, dias_reducao = 0) => {
  // Converte a data inicial do formato DD/MM/YYYY para um objeto Date
  const startDate = parseDate(dataInicial);

  // Verifica se startDate é uma instância válida de Date
  if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
      throw new Error('A data inicial deve estar no formato DD/MM/YYYY.');
  }

  // Verifica se days é um número válido
  // if (typeof days !== 'number' || isNaN(dias)) {
  //     throw new Error('O prazo deve ser um número válido.');
  // }

  // Cria uma nova data para evitar modificar a data original
  const dueDate = new Date(startDate);

  // Adiciona o prazo em dias à data inicial
  dueDate.setDate(dueDate.getDate() + dias - dias_reducao);

  // Retorna a data de vencimento no formato DD/MM/YYYY
  return formatDate(dueDate);
}

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); // Meses são zero-indexados em JavaScript
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são zero-indexados
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const diasSemanaAnterior = (dataStr) => {
  // Converte a string da data para um objeto Date
  const [dia, mes, ano] = dataStr.split('/').map(Number);
  const data = new Date(ano, mes - 1, dia);

  // Retrocede a data até encontrar a quarta-feira mais próxima antes da data fornecida
  let quartaAnterior = new Date(data);
  
  // Se a data fornecida for uma quarta-feira, devemos retroceder mais uma semana
  if (quartaAnterior.getDay() === 3) { // 3 representa quarta-feira
      quartaAnterior.setDate(quartaAnterior.getDate() - 7);
  }
  
  // Retrocede até encontrar a quarta-feira
  while (quartaAnterior.getDay() !== 3) { // 3 representa quarta-feira
      quartaAnterior.setDate(quartaAnterior.getDate() - 1);
  }
  
  // Formata a data no padrão DD/MM/YYYY
  const diaFormatado = String(quartaAnterior.getDate()).padStart(2, '0');
  const mesFormatado = String(quartaAnterior.getMonth() + 1).padStart(2, '0');
  const anoFormatado = quartaAnterior.getFullYear();
  
  return `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
}

const converterDateParaString = (dateString) => {
  // Cria um objeto Date a partir da string fornecida
  const date = new Date(dateString);

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
      throw new Error('Data inválida');
  }

  // Extrai o dia, mês e ano
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses são zero-indexados
  const year = date.getUTCFullYear();

  // Retorna a data formatada
  return `${day}/${month}/${year}`;
}


module.exports ={calcularDatas, diasSemanaAnterior, converterDateParaString}
