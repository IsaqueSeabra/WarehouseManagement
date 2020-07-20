using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WarehouseManagement.Domain.DTOs;
using WarehouseManagement.Domain.Entities;
using WarehouseManagement.Domain.Interfaces.Services;
using WarehouseManagement.WebAPI.Retornos;

namespace WarehouseManagement.WebAPI.Controllers
{
    [Route("api/Produto")]
    [ApiController]
    public class ProdutoController : Controller
    {
        private IProdutoService _produtoService;
        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet()]
        public IActionResult ObterTodosProdutos()
        {
            var response = new ListResponse<ProdutoDTO>();

            try
            {
                var produtos = _produtoService.ObterTodosProdutos();

                if (produtos.Count() > 0)
                { 
                    response.Data = MapearProdutos(produtos);
                    response.Success = true; 
                }
                else
                {
                    response.Success = false;
                    response.Message = "A lista de produtos não foi encontrada!";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Erro interno não identificado. Detalhes: {ex.Message}";
            }

            return response.ToHttpResponse();
        }

        [HttpGet("{identificador}")]
        public IActionResult ObterProdutoPeloId(string identificador)
        {
            var response = new SingleResponse<ProdutoDTO>();

            try
            {
                var produto = _produtoService.ObterProdutoPeloId(new Guid(identificador));

                if (produto != null)
                {
                    response.Data = MapearProdutoToDTO(produto);
                }
                else
                {
                    response.Success = false;
                    response.Message = $"O produto com o identificador: {identificador} não foi encontrado!";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Erro interno não identificado. Detalhes: {ex.Message}";
            }

            return response.ToHttpResponse();
        }

        [HttpDelete("{identificador}")]
        public IActionResult ExcluirProduto(string identificador)
        {
            var response = new SingleResponse<ProdutoDTO>();

            try
            {
                var produtoExcluido = _produtoService.ExcluirProduto(new Guid(identificador));

                if (produtoExcluido)
                {
                    response.Success = true;
                    response.Message = $"Produto excluido com sucesso!";
                }
                else
                {
                    response.Success = false;
                    response.Message = $"O produto com o identificador: {identificador} não foi encontrado!";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Erro interno não identificado. Detalhes: {ex.Message}";
            }

            return response.ToHttpResponse();
        }

        [HttpPut]
        public IActionResult AtualizarProduto([FromBody] ProdutoDTO produto)
        {
            var response = new SingleResponse<ProdutoDTO>();

            try
            {
                var produtoAtualizado = _produtoService.AtualizarProduto(MapearProdutoToEntity(produto)); 

                if (produtoAtualizado)
                {
                    response.Success = true;
                    response.Data = produto;
                    response.Message = $"O produto foi atualizado com sucesso!";
                }
                else
                {
                    response.Success = false;
                    response.Message = $"Ocorreu um erro ao atualizar o produto com o identificador: {produto.Id}";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Erro interno não identificado. Detalhes: {ex.Message}";
            }

            return response.ToHttpResponse();
        }

        [HttpPost]
        public IActionResult CriarNovoProduto([FromBody] ProdutoDTO produto)
        {
            var response = new SingleResponse<ProdutoDTO>();

            try
            {
                var identificador = _produtoService.AdicionarNovoProduto(MapearProdutoToEntity(produto));

                if (identificador != null)
                {
                    produto.Id = identificador.ToString();
                    response.Success = true;
                    response.Data = produto;
                    response.Message = $"O produto foi criado com sucesso!";
                }
                else
                {
                    response.Success = false;
                    response.Message = $"Ocorreu um erro ao criar o Produto";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Erro interno não identificado. Detalhes: {ex.Message}";
            }

            return response.ToHttpResponse();
        }


        private static List<ProdutoDTO> MapearProdutos(IEnumerable<ProdutoEntity> produtos)
        {
            var retornoProdutos = new List<ProdutoDTO>();

            foreach (var prod in produtos)
                retornoProdutos.Add(MapearProdutoToDTO(prod));

            return retornoProdutos;
        }

        private static ProdutoDTO MapearProdutoToDTO(ProdutoEntity prod)
        {
            return new ProdutoDTO()
            {
                Id = prod.Id,
                Nome = prod.Nome,
                Quantidade = prod.Quantidade.ToString(),
                Valor = prod.Valor.ToString()
            };
        }

        private static ProdutoEntity MapearProdutoToEntity(ProdutoDTO prod)
        {
            return new ProdutoEntity()
            {
                Id = prod.Id,
                Nome = prod.Nome,
                Quantidade = long.Parse(prod.Quantidade),
                Valor = decimal.Parse(prod.Valor.ToString())
            };
        }
    }
}
