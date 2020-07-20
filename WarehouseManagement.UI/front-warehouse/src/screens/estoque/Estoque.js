import React, { Component } from 'react';
import ReportTable from '../../components/Report/ReportTable';
import { Redirect } from 'react-router-dom'; 
import { styles } from './EstoqueStyle';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { ListarProdutos,ExcluirProduto,BuscarProdutoParaEditar,NovoProduto } from '../../redux/estoque/estoqueActions';
import CssBaseline from '@material-ui/core/CssBaseline'; 
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import {IconButton } from '@material-ui/core';

class Estoque extends Component {
    constructor(props){
        super(props);        
        this.state = {
            columns: [
                {
                    id: 'Identificador',
                    align: 'left',
                    disablePadding: false,
                    label: 'Identificador',
                    sort: false,
                    size: 'medium',
                    classes: { width: '20%' }
                },
                {
                    id: 'nome',
                    align: 'left',
                    disablePadding: false,
                    label: 'Nome',
                    sort: false,
                    size: 'medium',
                    classes: { width: '20%' }
                },
                {
                    id: 'quantidade',
                    align: 'left',
                    disablePadding: false,
                    label: 'Quantidade',
                    sort: false,
                    size: 'medium',
                    classes: { width: '10%' }
                },
                {
                    id: 'valor',
                    align: 'left',
                    disablePadding: false,
                    label: 'Valor',
                    sort: false,
                    size: 'medium',
                    classes: { width: '10%' }
                },
                {
                    id: 'control',
                    align: 'left',
                    disablePadding: false,
                    label: '',
                    sort: false,
                    size: 'medium',
                    classes: { width: '20%' }
                }
            ]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    handleOpen(value, type) {
        if (value === null || value === undefined)
            return;

        if (type === 'EDITAR_PRODUTO') 
            this.props.BuscarProdutoParaEditar(value, type);     

        if (type === 'EXCLUIR_PRODUTO') 
            this.props.ExcluirProduto(value);          
    }
 
    handleSubmit() {
        this.props.ListarProdutos();
    }
    componentWillMount(){
        this.props.ListarProdutos();
    }

    render() {
        if (this.props.estoque.forminitialize === 'EDITAR_PRODUTO' || this.props.estoque.forminitialize === 'NOVO_PRODUTO' )
            return <Redirect to="/EstoqueForm" />

        return (
            <>               
                <h1>Lista de produtos Estoque</h1>  
                <IconButton aria-label="Adicionar" onClick={() => this.props.NovoProduto()}>
                     <h5>Adicionar Produto</h5>  
                    <AddIcon fontSize="large" />
                </IconButton>     
                <CssBaseline />
                <Container maxWidth="lg">
                    <ReportTable
                        classes={this.props.classes}
                        columns={this.state.columns}
                        keyColumn={"idProduto"}
                        itens={this.props.estoque.listaProdutos.map(item => ({
                            idProduto: item.id,
                            nome: item.nome,
                            quantidade: item.quantidade,
                            valor: item.valor
                        }))}
                        handleSubmit={this.handleSubmit}
                        useDelete={true}
                        useEdit={true}
                        EditAction={value => this.handleOpen(value, 'EDITAR_PRODUTO')}
                        DeleteAction={value => this.handleOpen(value, 'EXCLUIR_PRODUTO')}
                    />
                </Container>
            </>
        )
    }
}
const mapStateToProps = state => ({
    estoque: state.estoque
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ListarProdutos,
    ExcluirProduto,
    BuscarProdutoParaEditar,
    NovoProduto
}, dispatch);

const result = connect(mapStateToProps, mapDispatchToProps)(Estoque);

export default withStyles(styles, { withTheme: true })(result);