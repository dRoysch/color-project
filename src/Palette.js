import React, {Component} from 'react';
import ColorBox from './ColorBox.js';
import Navbar from './Navbar.js';
import './Palette.css';


export default class Palette extends Component {
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
        const { colors } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color =>(
            <ColorBox background={color[format]} name={color.name}/>
        ))
        return(
            <div className='Palette'>
                {/* Navbar */}
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                {/* footer */}
            </div>
        )
    }
}