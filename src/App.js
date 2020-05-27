import React, {Component} from 'react';
import Palette from './Palette.js';
import seedPalette from './seedPalette.js';
import { generatePallete } from './colorHelper.js';


class App extends Component {
  render(){
    console.log(generatePallete(seedPalette[1]))
  return (
    <div className="App">
      <Palette {...seedPalette[4]}/>
    </div>
  );
}
}

export default App;
