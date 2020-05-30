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
      <Route exact path='/' render={(routeProps)=> <PaletteList palettes={seedPalette} {...routeProps}/>}/>
      <Route 
      exact 
      path='/palette/:id' 
      render={routeProps=> (
      <Palette 
      palette={generatePalette(
        this.findPalette(routeProps.match.params.id))} />
      )}
      />
      <Route path='/palette/:paletteId/:colorId' render={() => <h1>Hi, sigle color page</h1>}/>
    </Switch>

    // <div className="App">
    //   <Palette palette={generatePalette(seedPalette[4])}/>
    // </div>
  );
}
}

export default App;
