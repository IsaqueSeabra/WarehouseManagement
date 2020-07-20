import {LISTAR_PRODUTOS,EDITAR_PRODUTO,ADICIONAR_PRODUTO,EXCLUIR_PRODUTO} from './estoqueType';
import wmsApi from '../../api/wmsAPI';
import { initialize } from 'redux-form';

export const ListarProdutos = () =>
    dispatch => {        
        wmsApi.get("/api/Produto")
            .then(response => dispatch({ type: LISTAR_PRODUTOS, payload: response.data }))
            .catch(erro => {                
                console.log(erro.response);
            });
};

export const BuscarProdutoParaEditar =  value =>
    dispatch => {        
        wmsApi.get("/api/Produto/" + value)
            .then(response => dispatch({ type: EDITAR_PRODUTO, payload: response.data }))
            .catch(erro => {                
                console.log(erro.response);
            });
};

export const ExcluirProduto = value =>
    dispatch => {        
        wmsApi.delete("/api/Produto/" + value)
        .then(response => dispatch({ type: EXCLUIR_PRODUTO, payload: response.data }))
            .catch(erro => {                
                console.log(erro.response);
            });
};


export const SalvarNovoProduto = value =>
    dispatch => {        
        wmsApi.post("/api/Produto",value)
            .then(response => dispatch({ type: ADICIONAR_PRODUTO, payload: response.data }))
            .catch(erro => {                
                console.log(erro.response);
            });
};

export const SalvarEdicaoProduto = value =>
    dispatch => {        
        wmsApi.put("/api/Produto",value)
            .then(response => dispatch({ type: EDITAR_PRODUTO, payload: response.data }))
            .catch(erro => {                
                console.log(erro.response);
            });
};

export const EditarProduto = value => {
    return initialize('estoqueForm', value);
}; 

export const NovoProduto = () => {
    return [
        initialize('estoqueForm', null),
        ActionNovoProduto()
    ]
}
const ActionNovoProduto = () =>
    dispatch => dispatch({ type: 'NOVO_PRODUTO' });