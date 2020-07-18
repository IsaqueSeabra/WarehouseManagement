using System;
using System.Collections.Generic;
using System.Text;

namespace WarehouseManagement.Domain.DTOs.Request
{
    public class ProdutoRequest
    {
        public string Nome { get; set; }
        public string Quantidade { get; set; }
        public decimal Valor { get; set; }
    }
}
