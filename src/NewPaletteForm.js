import React from 'react'
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList.js';
import PaletteFormNav from './PaletteFormNav.js'


import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {arrayMove} from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    height: '100vh',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {
  static defaultProps = {
    maxColors: 20
  };
    constructor(props) {
        super(props);
        this.state= {
            currentColor: 'teal',
            newColorName: '',
            colors: this.props.palettes[0].colors
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
    componentDidMount() {
        // Name unique
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.state.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase() 
                )
        );
        //Color unique
        ValidatorForm.addValidationRule('isColorUnique', value =>
        this.state.colors.every(
            ({color}) => color !== this.state.currentColor
            )
    );
    }

    handleSubmit(newPaletteName) {
      const newPalette = {
        paletteName: newPaletteName,
        id: newPaletteName.toLowerCase().replace(/ /g, '-'), 
        colors: this.state.colors
      }
        this.props.savePalette(newPalette);
        this.props.history.push('/')
    }

    updateCurrentColor(newColor) {
        // console.log(newColor);
        this.setState({
            currentColor: newColor.hex
        })
    }
    addNewColor(){
        const newColor = {color: this.state.currentColor, name: this.state.newColorName}
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
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
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
      classes={classes} 
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

{/*  

 PORQUE DESABILITE EL NEWCOLORFORM, YA QUE QUE EN LA VERSION ANTERIOR NEWPALETTEFORM ERA UNA FUNCION, 
 AHORA ES UNA CLASE, DE TODAS FORMAS MAS ADELANTA UTILIZARE NEWCOLORFORM CUANDO REESTRUCTURE

*/}
{/* <NewColorForm /> // en vez de todo el div de abajo*/}
          <div>
                <Typography variant='h4'>Design Your Palette</Typography>
                <div>
                <Button 
                variant='contained' 
                color='primary' 
                onClick={this.clearColors}>
                    Clear Palette
                </Button>
                <Button 
                variant='contained' 
                color='primary' 
                onClick={this.addRandomColor}
                disabled={paletteIsFull}>
                    {paletteIsFull ? 'Palette Full':'Random Color'}
                </Button>
                </div>
                <ChromePicker
                color={this.state.currentColor}
                onChangeComplete={this.updateCurrentColor} // Si aqui no hago this.setState(...), el ChromePicker no funciona, ni idea
                />
                <ValidatorForm onSubmit={this.addNewColor}>
                    <TextValidator 
                    value={this.state.newColorName}
                    name='newColorName'
                    onChange={this.handleChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a color name', 'This name is already used', 'Color already used']}
                    />
                    <Button 
                    variant='contained' 
                    color='primary' 
                    style={{backgroundColor: this.state.currentColor}}
                    // onClick={this.addNewColor}
                    type='submit'
                    disabled={paletteIsFull}
                    >
                        {paletteIsFull ? 'Palette Full':'Add Color'}
                    </Button> 
                </ValidatorForm> 
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