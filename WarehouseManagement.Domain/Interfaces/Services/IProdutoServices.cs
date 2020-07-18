using System;
using System.Collections.Generic;
using System.Text;
using WarehouseManagement.Domain.Entities;

namespace WarehouseManagement.Domain.Interfaces.Services
{
    public interface IProdutoService
    {
        Guid? AdicionarNovoProduto(ProdutoEntity produto);
        bool AtualizarProduto(ProdutoEntity produto);
        bool ExcluirProduto(Guid Identificador);
        IEnumerable<ProdutoEntity> ObterTodosProdutos();
        ProdutoEntity ObterProdutoPeloId(Guid Identificador);
    }
}
