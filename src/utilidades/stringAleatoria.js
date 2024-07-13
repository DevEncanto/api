// Função que gera tokens para confirmação de tarefas
// A função gera tokens com 8 caracteres por padrão
// Para mudar o tamanho dos tokens basta passar o tamanho por parâmetro.
// Exemplo: geradorTokenConfirmacao(10) => Token com 10 Caracteres

const geradorCodigo = async (tamanho = 8) => {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}

//Exportação

module.exports = geradorCodigo