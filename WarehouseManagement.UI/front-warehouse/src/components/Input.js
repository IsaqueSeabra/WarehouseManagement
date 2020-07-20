import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root: {
        width: 'auto',
        //padding: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center !important'
    },
    textField: {
        width: '100%'
    }
});

class Input extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleKeyPress(event) {
        const AllowNumbers = /[0-9]+/;
        if (this.props.numbersOnly) {
            if (!AllowNumbers.test(event.key))
                event.preventDefault();
        }
    }
    render() {
        const { classes } = this.props;
        const { touched, invalid, error } = this.props.meta;
        return (
            <div className={classes.root}>
                <TextField
                    required={this.props.required}
                    disabled={this.props.disabled}
                    error={touched && invalid}
                    helperText={touched && error}
                    label={this.props.label}
                    className={classes.textField}
                    variant={this.props.variant}
                    margin={this.props.margin}
                    multiline={this.props.multiline}
                    rows={this.props.rows}
                    defaultValue={this.props.defaultValue}
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: this.props.shrink,
                    }}
                    {...this.props.input}
                    // InputProps={{
                    //     ...this.props.InputProps
                    // }}
                    inputProps={{
                        maxLength: this.props.maxLength
                    }}
                    type={this.props.type}
                    onKeyPress={this.handleKeyPress}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Input);