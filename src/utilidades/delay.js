// Função que gera uma pausa no código de 2200ms por padrão
// Para mudar o tempo de pausa é só passar o tempo em ms por parâmetro.
// Exemplo: delay (5000) => 5000 ms ou 5s, delay (1000) => 1000 ms ou 1s

const delay = (amout = 2200) => new Promise(resolve => setTimeout(resolve, amout))

//Exportação

module.exports = delay