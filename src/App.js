import React from 'react';
import Palette from './Palette.js';
import seedPalette from './seedPalette.js';

function App() {
  return (
    <div className="App">
      <Palette {...seedPalette[4]}/>
    </div>
  );
}

export default App;
