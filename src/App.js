import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette.js';
import seedPalette from './seedPalette.js';
import { generatePalette } from './colorHelper.js';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette.js';
import NewPaletteForm from './NewPaletteForm.js';

class App extends Component {

  findPalette(id){
    return seedPalette.find(function(palette){
      return palette.id === id;
    })
  }
  render(){
  return (
    <Switch>
      <Route
      exact
      path='/palette/new'
      render={()=> <NewPaletteForm />}
      />
      <Route 
      exact 
      path='/' 
      render={(routeProps)=> 
      <PaletteList palettes={seedPalette} {...routeProps}/>}
      />
      <Route 
      exact 
      path='/palette/:id' 
      render={routeProps=> (
      <Palette 
      palette={generatePalette(
        this.findPalette(routeProps.match.params.id))} />
      )}
      />
      <Route 
      exact
      path='/palette/:paletteId/:colorId' 
      render={(routeProps) => 
      <SingleColorPalette
      colorId={routeProps.match.params.colorId}
      palette={generatePalette(
      this.findPalette(routeProps.match.params.paletteId)
      )}
      />}
      />
    </Switch>

    // <div className="App">
    //   <Palette palette={generatePalette(seedPalette[4])}/>
    // </div>
  );
}
}

export default App;
