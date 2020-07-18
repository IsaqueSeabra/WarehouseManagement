using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseManagement.WebAPI.Retornos
{
    public interface ISingleResponse<TModel> : IResponse
    {
        TModel Data { get; set; }

    }
    public class SingleResponse<TModel> : ISingleResponse<TModel>
    {
        public SingleResponse()
        {
            Success = true;
        }
        public string Message { get; set; }

        public bool Success { get; set; }

        public TModel Data { get; set; }
    }
}
