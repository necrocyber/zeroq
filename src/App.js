import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

import Sucursales from './components/sucursales';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <nav>
          <img src={logo} className="logo" alt="Logo" />
        </nav>
        <Sucursales/>
      </div>
      
    );
  }
}

export default App;
