using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using WarehouseManagement.Domain.Interfaces;
using WarehouseManagement.Domain.Interfaces.Services;
using WarehouseManagement.Infra.Repositories;
using WarehouseManagement.Infra.Repositories.Base.ConnectionManager;
using WarehouseManagement.Infra.Repositories.Base.ConnectionManager.Interface;
using WarehouseManagement.Service;

namespace WarehouseManagement.CrossCutting.Ioc
{
    public class InjecaoDependencia
    {
        public static void RegisterServices(IServiceCollection services)
        {
            try
            {
                services.AddScoped<IConnectionManager, ConnectionManager>();

                //Mapper

                services.AddScoped<IProdutoService, ProdutoService>();
                services.AddScoped<IProdutoRepository, ProdutoRepository>(); 
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
