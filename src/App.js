import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Palette from './Palette.js';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette.js';
import NewPaletteForm from './NewPaletteForm.js';
import Page from './Page.js';
import seedPalette from './seedPalette.js';
import { generatePalette } from './colorHelper.js';

class App extends Component {

  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedPalette };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    })
  }
  deletePalette(id){
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    );
  }
  savePalette(newPalette){
    this.setState(
      {palettes: [...this.state.palettes, newPalette]}, 
      this.syncLocalStorage
      );
    // Si aqui llamo this.syncLocalStorage() estara bien, pero no hay garantias de que la
    // linea de arriba <<this.setState({palettes: [...this.state.palettes, newPalette]});>> se realice completa antes de guardar en localStorage, es por eso que usamos un callback o un async
    }
  syncLocalStorage(){
    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes));
  }
  render(){
  return (
    <Route render={({location})=>
      <TransitionGroup>
        <CSSTransition 
        key={location.key} 
        classNames='page' 
        timeout={300}>
          <Switch location={location}>
            <Route
            exact
            path='/palette/new'
            render={(routeProps)=>
            (<Page className='page'>
            <NewPaletteForm 
            savePalette={this.savePalette} 
            palettes={this.state.palettes}
            {...routeProps}/>
            </Page>)}
            />
            <Route 
            exact 
            path='/' 
            render={(routeProps)=> 
            (<Page className='page'>
            <PaletteList 
            palettes={this.state.palettes}
            deletePalette={this.deletePalette}
            {...routeProps}/>
            </Page>)}
            />
            <Route 
            exact 
            path='/palette/:id' 
            render={routeProps=> (
            <Page className='page'>
            <Palette 
            palette={generatePalette(
              this.findPalette(routeProps.match.params.id))} />
            
            </Page>)}
            />
            <Route 
            exact
            path='/palette/:paletteId/:colorId' 
            render={(routeProps) => 
            (<Page className='page'>
            <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
            this.findPalette(routeProps.match.params.paletteId)
            )}
            />
            </Page>)}
            />
            <Route 
            render={(routeProps)=> 
            (<Page className='page'>
            <PaletteList 
            palettes={this.state.palettes}
            deletePalette={this.deletePalette}
            {...routeProps}/>
            </Page>)}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    }/>
  );
}
}

export default App;
