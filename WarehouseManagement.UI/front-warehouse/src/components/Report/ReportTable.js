import React, { Component } from 'react';
import { Grid, Table, Paper } from '@material-ui/core';
import ReportTableHeader from './ReportTableHeader';
import ReportaTableBody from './ReportTableBody';

class ReportTable extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.tableWrapper}>
                            <Table aria-label="sticky table">
                                <ReportTableHeader
                                    handleSubmit={this.props.handleSubmit}
                                    columns={this.props.columns}
                                    useInclude={this.props.useInclude}
                                    AddAction={() => this.props.AddAction()}
                                    request={this.props.request}
                                />
                                <ReportaTableBody
                                    keyColumn={this.props.keyColumn}
                                    itens={this.props.itens}
                                    useEdit={this.props.useEdit}
                                    useDelete={this.props.useDelete}
                                    EditAction={value => this.props.EditAction(value)}
                                    DeleteAction={value => this.props.DeleteAction(value)}
                                />
                            </Table>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default ReportTable;