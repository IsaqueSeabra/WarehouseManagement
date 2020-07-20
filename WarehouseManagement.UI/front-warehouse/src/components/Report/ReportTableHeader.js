import React, { Component } from 'react';
import { TableHead, TableRow, TableCell, Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class ReportTableHeader extends Component {
    constructor(props) {
        super(props);
        this.renderColumns = this.renderColumns.bind(this);
    }

    renderColumns(columns) {
        return columns.map(column => (
            <TableCell
                key={column.id}
                align={column.align}
                padding={column.disablePadding ? 'none' : 'default'}
                size={column.size}
                style={column.classes}
            >
                {column.label}
            </TableCell>
        ))
    }
    render() {
        const { columns } = this.props;
        return (
            <TableHead>
                <TableRow className="h-64">
                    {this.renderColumns(columns)}
                    {this.props.useInclude ?
                        <TableCell
                            key="control"
                            align="left"
                            padding="dafault"
                            size="small"                        
                        >
                            <Tooltip title="Incluir" enterDelay={300}>
                                <IconButton onClick={() => this.props.AddAction()}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        :
                        null
                    }
                </TableRow>
            </TableHead>
        )
    }
}

export default ReportTableHeader;