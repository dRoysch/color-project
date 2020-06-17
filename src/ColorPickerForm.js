import React, { Component } from 'react'
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';



class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: 'teal',
            newColorName: ''
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        // Name unique
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase() 
                )
        );
        //Color unique
        ValidatorForm.addValidationRule('isColorUnique', value =>
        this.props.colors.every(
            ({color}) => color !== this.state.currentColor
            )
    );
    }
    updateCurrentColor(newColor) {
        // console.log(newColor);
        this.setState({
            currentColor: newColor.hex
        })
    }
    handleChange(evt){
        this.setState( {
            [evt.target.name]: evt.target.value})
    }
    handleSubmit(){
        const newColor = {color: this.state.currentColor, name: this.state.newColorName}
        this.props.addNewColor(newColor);
        this.setState({newColorName: ''});
    }

    render() {
        const {paletteIsFull, classes} = this.props;
        const {currentColor, newColorName}= this.state;
        return (
            <div className={classes.container}>
                <ChromePicker
                color={currentColor}
                onChangeComplete={this.updateCurrentColor} // Si aqui no hago this.setState(...), el ChromePicker no funciona, ni idea
                className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator 
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    className={classes.inputText}
                    margin='normal'
                    variant='filled'
                    placeholder='Color Name'
                    value={newColorName}
                    name='newColorName'
                    onChange={this.handleChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a color name', 'This name is already used', 'Color already used']}
                    />
                    <Button 
                    variant='contained' 
                    color='primary' 
                    style={{backgroundColor: this.state.currentColor}}
                    className={classes.addColor}
                    // onClick={this.addNewColor}
                    type='submit'
                    disabled={paletteIsFull}
                    >
                        {paletteIsFull ? 'Palette Full':'Add Color'}
                    </Button> 
                </ValidatorForm> 
            </div>
        )
    }
}
export default withStyles(styles)(ColorPickerForm);