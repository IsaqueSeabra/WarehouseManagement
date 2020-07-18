using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace WarehouseManagement.Infra.Repositories.Base.ConnectionManager.Interface
{
    public interface IConnectionManager
    {
        IDbConnection DbConnectionFactory();
    }
}
