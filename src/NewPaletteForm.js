import React from 'react'
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList.js';


import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
    constructor(props) {
        super(props);
        this.state= {
            currentColor: 'teal',
            newColorName: '',
            colors: [],
            newPaletteName: ''
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
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
    //
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
    this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
);
    }

    handleSubmit() {
      let newName = this.state.newPaletteName;
      const newPalette = {
        paletteName: newName,
        id: newName.toLowerCase().replace(/ /g, '-'), 
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

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="inherit"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>

            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator 
              label='Palette Name' 
              name='newPaletteName'
              value={this.state.newPaletteName}
              onChange={this.handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['All palettes need a name', 'Name already used']}
              />
              <Button
              variant='contained'
              color='secondary'
              type='submit'
              >
              Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Divider />
{/*  

 PORQUE DESABILITE EL NEWCOLORFORM, YA QUE QUE EN LA VERSION ANTERIOR NEWPALETTEFORM ERA UNA FUNCION, 
 AHORA ES UNA CLASE, DE TODAS FORMAS MAS ADELANTA UTILIZARE NEWCOLORFORM CUANDO REESTRUCTURE

*/}
{/* <NewColorForm /> // en vez de todo el div de abajo*/}
          <div>
                <h1>HELLLOOOOO</h1>
                <div>
                <Button variant='contained' color='primary'>
                    Clear Palette
                </Button>
                <Button variant='contained' color='primary'>
                    Random Color
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
                    >
                        Add Color
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

// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


// const drawerWidth = 400;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//   },
//   content: {
//     flexGrow: 1,
//     height: 'calc(100vh - 64px)',
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
// }));

// export default function PersistentDrawerLeft() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         className={clsx(classes.appBar, {
//           [classes.appBarShift]: open,
//         })}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             className={clsx(classes.menuButton, open && classes.hide)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Persistent drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={classes.drawer}
//         variant="persistent"
//         anchor="left"
//         open={open}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <div className={classes.drawerHeader}>
//           <IconButton onClick={handleDrawerClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </div>
//         <Divider />
//         <Typography variante='h4'>Design Your Palette</Typography>
//         <NewColorForm />
//       </Drawer>
//       <main
//         className={clsx(classes.content, {
//           [classes.contentShift]: open,
//         })}
//       >
//         <div className={classes.drawerHeader} />
//         <h1>HOLAAAA</h1>
//       </main>
//     </div>
//   );
// }