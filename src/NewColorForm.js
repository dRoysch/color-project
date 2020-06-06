import React, { Component } from 'react'
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button'

export default class NewColorForm extends Component {
    constructor(props) {
        super(props);
        this.state= {
            currentColor: 'teal',
            colors: ['purple', '#3456']
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
    }

    updateCurrentColor(newColor) {
        // console.log(newColor);
        this.setState({
            currentColor: newColor.hex
        })
    }
    addNewColor(){
        this.setState({colors: [...this.state.colors, this.state.currentColor]})
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
                <Button 
                variant='contained' 
                color='primary' 
                style={{backgroundColor: this.state.currentColor}}
                onClick={this.addNewColor}
                >
                    Add Color
                </Button>
                <ul>
                    {this.state.colors.map(color => (
                    <li style={{backgroundColor: color}}>{color}</li>
                ))}
                </ul>
            </div>
        )
    }
}
