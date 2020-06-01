import React, {Component} from 'react';
import ColorBox from './ColorBox.js';
import Navbar from './Navbar.js';
import './Palette.css';
import PaletteFooter from './PaletteFooter.js';
import { withStyles } from '@material-ui/styles';


const styles = {
    palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    paletteColors: {
        height: '90%'
    }
}

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {level: 500, format: 'hex'}
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level){
        return this.setState({level});
    }

    changeFormat(val){
        this.setState({format: val});
    }

    render()
    {
        const { colors, paletteName, emoji, id} = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color =>(
            <ColorBox 
            background={color[format]} 
            name={color.name} 
            key={color.id}
            id={color.id}
            paletteId={id}
            showingFullPalette={true}
            />
        ))
        return(
            <div className={classes.palette}>
                
                <Navbar 
                level={level} 
                changeLevel={this.changeLevel} 
                handleChange={this.changeFormat}
                showingAllColors={true}
                />
                <div className={classes.paletteColors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(Palette);