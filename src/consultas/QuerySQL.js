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

const ListaItensEstoquesInsumos = `SELECT 
    ins.id_insumo AS id_insumo,
    ins.nome AS nome,
    ca.nome AS categoria,
    ins.unidade AS unidade,
    SUM(ee.qtde) AS entradas
FROM entradas_estoques ee
INNER JOIN itens i ON i.id_item = ee.id_item
INNER JOIN insumos ins ON ins.id_item = i.id_item
INNER JOIN categorias_insumos ca ON ca.id_categoria_insumo = ins.id_categoria_insumo
INNER JOIN estoques es ON es.id_estoque = ee.id_estoque
WHERE es.tipo_estoque = 'insumos'
GROUP BY ins.id_insumo, ins.nome, ca.nome, ins.unidade;
`
const ListarEntradasEstoqueInsumos =`SELECT 
    ins.nome AS insumo,
    es.id_estoque AS id_estoque,
    c.id_compra AS id_compra,
    c.documento AS documento,
    ee.qtde AS qtde,
    et.id_etiqueta AS id_etiqueta,
    et.etiqueta AS etiqueta,
    f.fantasia AS fornecedor,
    ins.unidade AS unidade,
    ee.data_entrada AS data_entrada,
    c.valor AS valor,
    ci.nome AS categoria
FROM entradas_estoques ee
INNER JOIN itens i ON i.id_item = ee.id_item
INNER JOIN insumos ins ON ins.id_item = i.id_item
INNER JOIN estoques es ON es.id_estoque = ee.id_estoque
INNER JOIN fornecedores f ON f.id_fornecedor = ee.id_fornecedor
INNER JOIN etiquetas et ON et.id_etiqueta = ee.id_etiqueta
LEFT JOIN compras c ON c.id_compra = ee.id_compra
INNER JOIN categorias_insumos ci ON ci.id_categoria_insumo = ins.id_categoria_insumo
WHERE es.tipo_estoque = 'insumos';
`


const ListarEstoques = `select e.id_estoque as id_estoque, e.nome as nome, l.nome as lote from estoques as e inner join lotes as l on l.id_lote = e.id_lote;`



module.exports = { ListarEntradasEstoqueInsumos, ListaItensEstoquesInsumos, ListarEstoques, QueryFluxoCaixa, QueryMediaBaixa, QuerySaldoUsuarios, ListarPermissoes }