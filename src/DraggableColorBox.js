import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
    '&:hover svg': {
        color: 'white',
        transform: 'scale(1.3)'
    }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color:' rgba(0, 0, 0, 0.5)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '1.2rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
} 
class DraggableColorBox extends Component {
    render() {
        const {classes} =this.props;
        return (
            <div 
            style={{backgroundColor: this.props.color}}
            className={classes.root}>
                <div className={classes.boxContent}>
                    <span>{this.props.name}</span>
                    <DeleteIcon className={classes.deleteIcon}/>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(DraggableColorBox);