using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseManagement.WebAPI.Retornos
{
    public interface IResponse
    {
        string Message { get; set; }

        bool Success { get; set; }
    }

    public class Response : IResponse
    {
        public string Message { get; set; }

        public bool Success { get; set; }
    }
}
