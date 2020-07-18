using System;
using System.Collections.Generic;
using System.Text;

namespace WarehouseManagement.Domain.Entities
{
    public class ProdutoEntity : BaseEntity
    {
        /// <summary>
        /// Nome do produto
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// Quantidade de itens do produto
        /// </summary>
        public long Quantidade { get; set; }

        /// <summary>
        /// Valor unitário do produto
        /// </summary>
        public decimal Valor { get; set; }
    }
}
