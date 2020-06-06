import React, { Component } from 'react'
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button'
import DraggableColorBox from './DraggableColorBox.js'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default class NewColorForm extends Component {
    constructor(props) {
        super(props);
        this.state= {
            currentColor: 'teal',
            newName: '',
            colors: []
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
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


    updateCurrentColor(newColor) {
        // console.log(newColor);
        this.setState({
            currentColor: newColor.hex
        })
    }
    addNewColor(){
        const newColor = {color: this.state.currentColor, name: this.state.newName}
        this.setState({colors: [...this.state.colors, newColor], newName: ''})
    }

    handleChange(evt){
        this.setState( {newName: evt.target.value})
    }

    render() {
        return (
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
                    value={this.state.newName}
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
                {
                    this.state.colors.map(color=>(
                        <DraggableColorBox color={color.color} name={color.name}/>
                    ))
                }
            </div>
        )
    }
}
