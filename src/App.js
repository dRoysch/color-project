import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette.js';
import seedPalette from './seedPalette.js';
import { generatePalette } from './colorHelper.js';
import PaletteList from './PaletteList';

class App extends Component {

  findPalette(id){
    return seedPalette.find(function(palette){
      return palette.id === id;
    })
  }
  render(){
    console.log(generatePalette(seedPalette[1]))
  return (
    <Switch>
      <Route exact path='/' render={()=> <PaletteList palettes={seedPalette}/>}/>
      <Route 
      exact 
      path='/palette/:id' 
      render={routeProps=> (
      <Palette 
      palette={generatePalette(
        this.findPalette(routeProps.match.params.id))} />
      )}
      />
    </Switch>

    // <div className="App">
    //   <Palette palette={generatePalette(seedPalette[4])}/>
    // </div>
  );
}
}

export default App;
