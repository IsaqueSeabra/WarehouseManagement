using System;
using System.Collections.Generic;
using System.Text;

namespace WarehouseManagement.Domain.DTOs
{
    public class ProdutoDTO
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public long Quantidade { get; set; }
        public decimal Valor { get; set; }
    }
}
