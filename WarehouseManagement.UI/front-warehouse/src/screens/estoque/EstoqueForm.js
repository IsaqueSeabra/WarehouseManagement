import React, { Component } from 'react';
import { styles } from './EstoqueStyle';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SalvarNovoProduto, SalvarEdicaoProduto, EditarProduto } from '../../redux/estoque/estoqueActions';
import { Redirect } from 'react-router-dom'; 
import Container from '@material-ui/core/Container';
import EstoqueFormBody from './EstoqueFormBody';

class EstoqueForm extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.estoque.forminitialize !== "EDITAR_PRODUTO") 
            return;
        
        this.props.EditarProduto(this.props.estoque.produto);
    }
    onSubmit(values) {  
        switch (this.props.estoque.forminitialize) {
            case 'NOVO_PRODUTO':
                this.props.SalvarNovoProduto(values);
                break;
            case 'EDITAR_PRODUTO':
                this.props.SalvarEdicaoProduto(values);
                break;
            default:
                return;
        }
    }    
    render() {
        const { classes } = this.props;

        if (this.props.estoque.forminitialize === null)
            return <Redirect to="/" />

        return (
            <> 
                <Container maxWidth="md">
                    <h1>Produto</h1>  
                    <EstoqueFormBody
                            classes={classes}
                            onSubmit={this.onSubmit}
                            ref={form => this.formReference = form}
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
    SalvarNovoProduto, SalvarEdicaoProduto, EditarProduto 
}, dispatch);

const result = connect(mapStateToProps, mapDispatchToProps)(EstoqueForm);
export default withStyles(styles, { withTheme: true })(result);