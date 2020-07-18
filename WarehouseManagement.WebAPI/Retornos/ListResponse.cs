using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseManagement.WebAPI.Retornos
{
    public interface IListResponse<TModel> : IResponse
    {
        IEnumerable<TModel> Data { get; set; }
    }

    public class ListResponse<TModel> : IListResponse<TModel>
    {
        public ListResponse()
        {
            Success = true;
        }

        public string Message { get; set; }

        public bool Success { get; set; }

        public IEnumerable<TModel> Data { get; set; }
    }
}
