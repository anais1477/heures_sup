import React, { Component } from 'react';
import './App.css';
import MenuWrap from './Nav';
import MainArea from './MainArea';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuWrap />
        <MainArea />
      </div>
    );
  }
}

export default App;
