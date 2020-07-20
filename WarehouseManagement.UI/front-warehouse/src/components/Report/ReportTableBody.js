import React, { Component } from 'react';
import { TableBody, TableRow, TableCell, Tooltip, IconButton, Grid} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class ReportTableBody extends Component {
    constructor(props) {
        super(props);
        this.renderRows = this.renderRows.bind(this);
    }
    renderRows(rows,keyColumn) {
        return rows.map(row => (            
            <TableRow
                className="h-64"
                hover
                tabIndex={-1}
                key={row[keyColumn]}
            >
                {Object.values(row).map((item, index) =>
                    <TableCell key={index} style={{ fontSize: 'small' }}>
                        {item}
                    </TableCell>
                )}
                <TableCell>
                    <Grid container spacing={1}>
                        {this.props.useEdit ?
                        <Grid item sm={6}>
                                <Tooltip title="Alterar" enterDelay={300}>
                                    <IconButton onClick={() => this.props.EditAction(Object.values(row)[0])}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            :
                            null
                        }

                        {this.props.useDelete ?
                            <Tooltip title="Excluir" enterDelay={300}>
                                <IconButton onClick={() => this.props.DeleteAction(Object.values(row)[0])}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            :
                            null
                        }
                    </Grid>
                </TableCell>
            </TableRow>
        ))
    }
    render() {        
        return (
            <TableBody>
                {this.renderRows(this.props.itens,this.props.keyColumn)}
            </TableBody>
        )
    }
}

export default ReportTableBody;