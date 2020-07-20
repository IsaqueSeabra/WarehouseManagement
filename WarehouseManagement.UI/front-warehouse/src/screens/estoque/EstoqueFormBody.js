import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../components/Input';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class EstoqueFormBody extends Component {
    render() {
        const { classes, handleSubmit, onSubmit, disabled } = this.props;  
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-16 sm:p-24 max-w-2xl">
                    <Grid container className={classes.root} spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Field
                                Id="txtIdProduto"
                                name="id"
                                component={Input}
                                label="Identificador"
                                variant="outlined"
                                margin="dense"
                                maxLength="50"
                                shrink={true}
                                disabled={true}
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Field
                                Id="txtNome"
                                name="nome"
                                component={Input}
                                label="Nome"
                                variant="outlined"
                                margin="dense"
                                maxLength="50"
                                type="text"
                                required
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                                <Field
                                    Id="txtQuantidade"
                                    name="quantidade"
                                    component={Input}
                                    label="Quantidade"
                                    variant="outlined"
                                    margin="dense"
                                    maxLength="50"
                                    type="text"
                                    required
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Field
                                    Id="txtValor"
                                    name="valor"
                                    component={Input}
                                    label="Valor"
                                    variant="outlined"
                                    margin="dense"
                                    maxLength="50"
                                    type="number"
                                    required
                                    disabled={disabled}
                                />
                            </Grid>                       
                    </Grid>

                    <Button variant="contained" color="primary" type="submit">Salvar</Button>
                </div>                
            </form>
        )
    }
}

const mapStateToProps = state => ({
    produto: state
});

let result = connect(mapStateToProps, null)(EstoqueFormBody);

result = reduxForm({
    form: 'estoqueForm',
    //validate,
    destroyOnUnmount: false
})(result);

export default result;