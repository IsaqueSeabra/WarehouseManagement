using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WarehouseManagement.CrossCutting.Ioc;
using System.Data;
using System.Data.SQLite;
using System.IO;
using Dapper;

namespace WarehouseManagement.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();

            var dbFilePath = "./WmsDb.sqlite";
            var sqlite = new SQLiteConnection($"Data Source={dbFilePath};Version=3;");

            if (!File.Exists(dbFilePath))
            {
                SQLiteConnection.CreateFile(dbFilePath);
                CreateDatabase(sqlite);
            }

            services.AddSingleton<IDbConnection>(s => sqlite);
            RegisterServices(services);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Warehouse Management API",
                    Version = "v1",
                    Description = "API para controle de Amazenagem e Estoque"
                });
            });
        }

        private static void CreateDatabase(SQLiteConnection sqlite)
        {
            sqlite.Open();
            sqlite.Execute(
                @"CREATE TABLE Produto
                (
                    Id varchar(36) primary key,
                    Nome varchar(200) null,
                    Quantidade integer null,
                    Valor real null
                )");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Warehouse Management API V1");

                c.DocumentTitle = "Warehouse Management Documentation";
                c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            });

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private static void RegisterServices(IServiceCollection services)
        {
            InjecaoDependencia.RegisterServices(services);
        }
    }
}
