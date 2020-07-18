using System;
using System.Collections.Generic;
using System.Text;
using WarehouseManagement.Domain.Entities;
using WarehouseManagement.Domain.Interfaces;
using WarehouseManagement.Domain.Interfaces.Services;

namespace WarehouseManagement.Service
{
    public class ProdutoService : IProdutoService
    {
        public IProdutoRepository _repository { get; set; }
        public ProdutoService(IProdutoRepository repository)
        {
            _repository = repository;
        }

        public Guid? AdicionarNovoProduto(ProdutoEntity produto)
        {
            return _repository.Adicionar(produto);
        }

        public bool AtualizarProduto(ProdutoEntity produto)
        {
            return _repository.Atualizar(produto);
        }

        public bool ExcluirProduto(Guid Identificador)
        {
            return _repository.Excluir(Identificador);
        }

        public ProdutoEntity ObterProdutoPeloId(Guid Identificador)
        {
            return _repository.ObterProdutoPeloId(Identificador);
        }

        public IEnumerable<ProdutoEntity> ObterTodosProdutos()
        {
            return _repository.ObterTodosProdutos();
        }
    }
}
