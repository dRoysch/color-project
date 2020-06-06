import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
    width: '20%',
    height: props => (props.showingFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
    '&:hover button': {
        opacity: '1'
    }
}
} 
class DraggableColorBox extends Component {
    render() {
        return (
            <div 
            style={{backgroundColor: this.props.color}}
            className={this.props.classes.root}>
                {this.props.name}
            </div>
        )
    }
}

export default withStyles(styles)(DraggableColorBox);