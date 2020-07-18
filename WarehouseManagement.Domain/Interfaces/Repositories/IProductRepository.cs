using System;
using System.Collections.Generic;
using System.Text;
using WarehouseManagement.Domain.Entities;

namespace WarehouseManagement.Domain.Interfaces
{
    public interface IProdutoRepository
    {
        Guid? Adicionar(ProdutoEntity produto);
        bool Atualizar(ProdutoEntity produto);
        bool Excluir(Guid Identificador);
        IEnumerable<ProdutoEntity> ObterTodosProdutos();
        ProdutoEntity ObterProdutoPeloId(Guid Identificador);
    }
}
