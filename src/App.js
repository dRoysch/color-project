import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette.js';
import seedPalette from './seedPalette.js';
import { generatePalette } from './colorHelper.js';


class App extends Component {
  render(){
    console.log(generatePalette(seedPalette[1]))
  return (
    <Switch>
      <Route exact path='/' render={()=> <h1>Landing Page</h1>}/>
      <Route exact path='/palette/:id' render={()=> <h2>Other page</h2>}/>
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedPalette[4])}/>
    // </div>
  );
}
}

export default App;
