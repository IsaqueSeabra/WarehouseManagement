import {LISTAR_PRODUTOS,EXCLUIR_PRODUTO,EDITAR_PRODUTO,NOVO_PRODUTO} from './estoqueType';

const initialState = {
    forminitialize:null,
    listaProdutos:[],
    produto:null
}

export default (state = initialState,action) =>{
    switch (action.type) {
        case LISTAR_PRODUTOS:
            return {...state, listaProdutos: action.payload.data};
        case EDITAR_PRODUTO:
                return {...state, produto: action.payload.data,forminitialize:EDITAR_PRODUTO};
        case EXCLUIR_PRODUTO:
            return {...state, listaProdutos:[],forminitialize:null };
        case NOVO_PRODUTO:
                return { ...state, forminitialize: NOVO_PRODUTO }
        default:
            return state;
    }
} 