const QueryFluxoCaixa = `
SELECT 
	fc.idLancamento as idLancamento,
    fc.desc as descricao,
    r.valor as entrada,
    r.updatedAt as dataEntrada,
    s.createdAt as dataSaida,
    s.valor as saida
FROM fluxocaixas as fc 
    left join recebimentos as r on r.idRecebimento = fc.identrada
    left join saques as s on s.idsaque = fc.idsaida; 
`
const QueryMediaBaixa = `SELECT email, nome from usuarios where totalDesafios 
<= (SELECT AVG(totalDesafios) from usuarios where totalDesafios > 0) 
and tipousuario = "USER"`

const QuerySaldoUsuarios = `select sum(saldo) as valor from usuarios where saldo > 4`

module.exports = { QueryFluxoCaixa, QueryMediaBaixa, QuerySaldoUsuarios}