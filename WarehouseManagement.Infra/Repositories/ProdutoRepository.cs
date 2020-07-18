using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using WarehouseManagement.Domain.Entities;
using WarehouseManagement.Domain.Interfaces;

namespace WarehouseManagement.Infra.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly IDbConnection _connection;

        public ProdutoRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public Guid? Adicionar(ProdutoEntity produto)
        {
            DynamicParameters parametros = new DynamicParameters();

            VerificarConexao();

            string sql = @"INSERT INTO Produto (Id, Nome, Quantidade, Valor)
            VALUES 
            (
                :identificador,
                :nome,
                :quantidade,
                :valor           
            )";

            Guid novoIdentificador = Guid.NewGuid();

            parametros.Add(":identificador", novoIdentificador.ToString(), DbType.String);
            parametros.Add(":nome", produto.Nome, DbType.String);
            parametros.Add(":quantidade", produto.Quantidade, DbType.Int64);
            parametros.Add(":valor", produto.Valor, DbType.Decimal);

            if (_connection.Execute(sql, parametros, null, null, commandType: CommandType.Text) == 1)
                return novoIdentificador;
            else
                return null;
        }

        public bool Atualizar(ProdutoEntity produto)
        {
            DynamicParameters parametros = new DynamicParameters();
            VerificarConexao();

            var sql = @" UPDATE Produto 
            SET Nome = :nome,
                Quantidade = :quantidade,
                Valor = :valor            
            WHERE Id = :identificador";

            parametros.Add(":identificador", produto.Id, DbType.String);
            parametros.Add(":nome", produto.Nome, DbType.String);
            parametros.Add(":quantidade", produto.Quantidade, DbType.Int32);
            parametros.Add(":valor", produto.Valor, DbType.Decimal);

            if (_connection.Execute(sql, parametros, null, null, commandType: CommandType.Text) == 1)
                return true;
            else
                return false;
        }

        public bool Excluir(Guid identificador)
        {
            DynamicParameters parametros = new DynamicParameters();
            VerificarConexao();

            var sql = @" DELETE FROM Produto WHERE Id = :identificador";
            parametros.Add(":identificador", identificador.ToString(), DbType.String);

            if (_connection.Execute(sql, parametros, null, null, commandType: CommandType.Text) == 1)
                return true;
            else
                return false;
        }

        public IEnumerable<ProdutoEntity> ObterTodosProdutos()
        {
            VerificarConexao();
            var sql = @" SELECT Id, Nome, Quantidade, Valor FROM Produto";

            return _connection.Query<ProdutoEntity>(sql, commandType: CommandType.Text);
        }

        public ProdutoEntity ObterProdutoPeloId(Guid identificador)
        {
            VerificarConexao();
            DynamicParameters parametros = new DynamicParameters();

            var sql = @" SELECT * FROM Produto WHERE Id = :identificador";
            parametros.Add(":identificador", identificador.ToString(), DbType.String);

            return _connection.QueryFirstOrDefault<ProdutoEntity>(sql,param: parametros, commandType: CommandType.Text);
        }

        private void VerificarConexao()
        {
            if (_connection == null)
            {
                throw new NullReferenceException("Porfavor verifique a conexão com o banco de dados");
            }

            if (_connection.State != ConnectionState.Open)
                _connection.Open();
        }
    }
}
