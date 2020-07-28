import React from 'react'
import Button from '@material-ui/core/Button'
import DraggableColorList from './DraggableColorList.js';
import PaletteFormNav from './PaletteFormNav.js'
import ColorPickerForm from './ColorPickerForm.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {arrayMove} from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles';
import seedPalette from './seedPalette';

class PersistentDrawerLeft extends React.Component {
  static defaultProps = {
    maxColors: 20
  };
    constructor(props) {
        super(props);
        this.state= {
            newColorName: '',
            colors: seedPalette[0].colors
        }
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
    //Este componentDidMount esta asociado al ForValidator de ColorPickerFor.js, sin embargo,
    //al colocar el componentDidMount en ese archivo da error porque no reconoce this.state.colors,
    //por eso lo dejo acá
  

    handleSubmit(newPalette) {
      newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
      newPalette.colors = this.state.colors;
      this.props.savePalette(newPalette);
      this.props.history.push('/')
    }

    addNewColor(newColor){
        this.setState({colors: [...this.state.colors, newColor], newColorName: ''})
    }

    handleChange(evt){
        this.setState( {
          [evt.target.name]: evt.target.value})
    }



  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // Esta funcion es para pasarsela a DraggableColorBox
  removeColor(colorName){
    this.setState({
      colors: this.state.colors.filter(color => color.name  !== colorName)
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearColors(){
    return this.setState({colors: []});
  }

  addRandomColor() {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicatedColor = true;
    let a = 0;
    while(isDuplicatedColor) {
      a = a + 1;
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicatedColor = this.state.colors.some(
        color => color.name === randomColor.name
      );
      if (a >= 10){
        isDuplicatedColor = false;
      }
    }
    this.setState({colors: [...this.state.colors, randomColor]});
    }


  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;


    return (
      <div className={classes.root}>  
      <PaletteFormNav 
      open={open} 
      palettes={palettes} 
      handleSubmit={this.handleSubmit}
      handleDrawerOpen={this.handleDrawerOpen}
      />

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <div className={classes.container}>
                <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                <div className={classes.buttons}>
                <Button 
                className={classes.button}
                variant='contained' 
                color='primary' 
                onClick={this.clearColors}>
                    Clear Palette
                </Button>
                <Button 
                className={classes.button}
                variant='contained' 
                color='primary' 
                onClick={this.addRandomColor}
                disabled={paletteIsFull}>
                    {paletteIsFull ? 'Palette Full':'Random Color'}
                </Button>
                </div>
                <ColorPickerForm 
                paletteIsFull={paletteIsFull}
                addNewColor={this.addNewColor}
                colors={colors}
                />
            </div>
{/* 



*/}
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
          // pressDelay={100} // pressDalay y distance no pueden estar activos al mismo tiempo https://github.com/clauderic/react-sortable-hoc
          distance={2}
          colors={this.state.colors}
          removeColor={this.removeColor}
          axis='xy'
          onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);