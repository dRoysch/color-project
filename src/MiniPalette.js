import React from 'react';
import { withStyles } from '@material-ui/styles';


const styles = {
    main: {
        backgroundColor: 'purple',
        border: '3px solid teal'
    },
    secondary: {
        backgroundColor:'pink',
        '& h2': {
            color: 'white'
        }
    }
}

function MiniPalette(props){
    const { classes } = props;
    console.log(classes)
    return (
        <div className={classes.main}>
            <h1>Mini Palette</h1>
            <div className={classes.secondary}>
                <h2>HELLOOOO</h2>
            </div>
        </div>
    )
}
export default withStyles(styles)(MiniPalette);