using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using WarehouseManagement.Infra.Repositories.Base.ConnectionManager.Interface;

namespace WarehouseManagement.Infra.Repositories.Base.ConnectionManager
{
    public class ConnectionManager : IConnectionManager
    {
        private readonly IDbConnection _connection;

        public ConnectionManager(IDbConnection connection)
        {
            _connection = connection;
        }
        public IDbConnection DbConnectionFactory()
        {
            return _connection;
        }
    }
}
