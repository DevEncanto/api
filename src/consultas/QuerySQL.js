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

const ListarPermissoes = `SELECT p.nome FROM permissoes_usuarios as pu 
	inner join permissoes as p on pu.id_permissao = p.id_permissao
    inner join usuarios as u on u.id_usuario = pu.id_usuario
where u.id_usuario = `

const ListarEstoques = `select e.id_estoque as id_estoque, e.nome as nome, l.nome as lote from estoques as e inner join lotes as l on l.id_lote = e.id_lote;`



module.exports = { ListarEstoques, QueryFluxoCaixa, QueryMediaBaixa, QuerySaldoUsuarios, ListarPermissoes }