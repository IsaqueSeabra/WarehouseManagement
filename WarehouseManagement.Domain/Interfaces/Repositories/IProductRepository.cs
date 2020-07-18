using System;
using System.Collections.Generic;
using System.Text;

namespace WarehouseManagement.Domain.Interfaces
{
    public interface IProductRepository
    {
        bool Adicionar();
        bool Excluir();
        bool ObterListaProdutos();
        bool ObterProdutoPeloId();
    }
}
