import React, {Component} from 'react';
import Palette from './Palette.js';
import seedPalette from './seedPalette.js';
import { generatePalette } from './colorHelper.js';


class App extends Component {
  render(){
    console.log(generatePalette(seedPalette[1]))
  return (
    <div className="App">
      <Palette palette={generatePalette(seedPalette[4])}/>
    </div>
  );
}
}

export default App;
