import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js'
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles.js';
import ColorBox from './ColorBox';


class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {format: 'hex'};
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeFormat(val){
        this.setState({format: val});
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    }
    render() {
        const { format } = this.state;
        const { paletteName, emoji, id} = this.props.palette;
        const { classes } = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
            key={color.name}
            name={color.name}
            background={color[format]}
            showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.SingleColorPalette}>
                <Navbar 
                handleChange={this.changeFormat}
                showingAllColors={false}
                />
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>
                        GO BACK
                        </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);